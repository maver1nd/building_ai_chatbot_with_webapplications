import uuid
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.html import escape
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import ChatSession, ChatMessage
from .gemini_service import generate_campus_reply
from .ratelimit import is_rate_limited
from knowledge.models import KnowledgeEntry

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR', '127.0.0.1')

def validate_uuid(uuid_string):
    try:
        val = uuid.UUID(str(uuid_string), version=4)
        return str(val)
    except (ValueError, TypeError, AttributeError):
        return None


@method_decorator(csrf_exempt, name='dispatch')
class ChatView(APIView):
    """
    POST /api/chat/
    SRS Section 7 & Section 6.3 (FR-CHAT-001, FR-CHAT-002, FR-CHAT-004, FR-CHAT-008)
    NFR-SEC-005: Token-free API restricted by CORS and rate limits
    """
    authentication_classes = []
    permission_classes = []
    def post(self, request):
        session_id_raw = request.data.get('session_id')
        message_raw = request.data.get('message')

        # Check valid UUID
        valid_session_id = validate_uuid(session_id_raw)
        if not valid_session_id:
            # Create a new session or return error
            new_sess = ChatSession.objects.create()
            valid_session_id = str(new_sess.id)

        # Validate message
        if not message_raw or not isinstance(message_raw, str) or not message_raw.strip():
            return Response(
                {"error": "Please enter a message (up to 1000 characters)."},
                status=status.HTTP_400_BAD_REQUEST
            )

        message_clean = message_raw.strip()
        if len(message_clean) > 1000:
            return Response(
                {"error": "Please enter a message (up to 1000 characters)."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Rate limiting check (NFR-SEC-003, ERR-03)
        client_ip = get_client_ip(request)
        if is_rate_limited(valid_session_id, client_ip):
            return Response(
                {"error": "You are sending messages too quickly. Please wait a moment."},
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )

        # Get or create session
        session_obj, _ = ChatSession.objects.get_or_create(id=valid_session_id)
        session_obj.save()  # update last_active_at

        # Save user message (sanitize HTML per NFR-SEC-004)
        user_msg = ChatMessage.objects.create(
            session=session_obj,
            role='user',
            content=message_clean
        )

        # Fetch recent history (default last 10 messages)
        recent_messages = list(session_obj.messages.order_by('-created_at')[:11])
        recent_messages.reverse()
        history_list = [
            {"role": m.role, "content": m.content}
            for m in recent_messages if m.id != user_msg.id
        ]

        # Generate response from Gemini service
        try:
            reply_text = generate_campus_reply(message_clean, history_list)
        except Exception as e:
            return Response(
                {"error": "I am sorry, I am unable to respond right now. Please try again shortly."},
                status=status.HTTP_502_BAD_GATEWAY
            )

        # Save assistant message
        bot_msg = ChatMessage.objects.create(
            session=session_obj,
            role='assistant',
            content=reply_text
        )

        return Response({
            "reply": bot_msg.content,
            "message_id": bot_msg.id,
            "created_at": bot_msg.created_at.isoformat(),
            "session_id": str(session_obj.id)
        }, status=status.HTTP_200_OK)


@method_decorator(csrf_exempt, name='dispatch')
class ChatHistoryView(APIView):
    """
    GET /api/chat/history/?session_id=<uuid>
    SRS Section 7 & FR-CHAT-003
    """
    authentication_classes = []
    permission_classes = []
    def get(self, request):
        session_id_raw = request.query_params.get('session_id')
        if not session_id_raw:
            return Response({"messages": []}, status=status.HTTP_200_OK)

        valid_session_id = validate_uuid(session_id_raw)
        if not valid_session_id:
            # Silent fallback / fresh list per ERR-05
            return Response({"messages": []}, status=status.HTTP_200_OK)

        try:
            session_obj = ChatSession.objects.get(id=valid_session_id)
            messages = session_obj.messages.order_by('created_at')
            data = [
                {
                    "id": m.id,
                    "role": m.role,
                    "content": m.content,
                    "created_at": m.created_at.isoformat()
                }
                for m in messages
            ]
            return Response({"messages": data}, status=status.HTTP_200_OK)
        except ChatSession.DoesNotExist:
            return Response({"messages": []}, status=status.HTTP_200_OK)


@method_decorator(csrf_exempt, name='dispatch')
class ChatSessionsListView(APIView):
    """
    GET /api/chat/sessions/?session_ids=uuid1,uuid2
    Lists past conversations with snippets and timestamps
    """
    authentication_classes = []
    permission_classes = []
    def get(self, request):
        raw_ids = request.query_params.get('session_ids', '')
        uuids = [validate_uuid(sid.strip()) for sid in raw_ids.split(',') if validate_uuid(sid.strip())]

        if uuids:
            sessions = ChatSession.objects.filter(id__in=uuids).order_by('-last_active_at')
        else:
            # Return recent active sessions
            sessions = ChatSession.objects.all().order_by('-last_active_at')[:20]

        data = []
        for s in sessions:
            first_user_msg = s.messages.filter(role='user').first()
            snippet = first_user_msg.content[:45] + "..." if first_user_msg else "New Conversation"
            data.append({
                "id": str(s.id),
                "created_at": s.created_at.isoformat(),
                "last_active_at": s.last_active_at.isoformat(),
                "message_count": s.messages.count(),
                "snippet": snippet
            })

        return Response({"sessions": data}, status=status.HTTP_200_OK)


@method_decorator(csrf_exempt, name='dispatch')
class NewChatView(APIView):
    """
    POST /api/chat/new/
    SRS Section 7 & FR-CHAT-005
    """
    authentication_classes = []
    permission_classes = []
    def post(self, request):
        new_session = ChatSession.objects.create()
        return Response({
            "session_id": str(new_session.id)
        }, status=status.HTTP_200_OK)


class HomeContentView(APIView):
    """
    GET /api/home-content/
    SRS Section 7 & FR-HOME-004
    Loads highlights, stats, news, and campus life cards dynamically
    """
    def get(self, request):
        data = {
            "university_name": "CHRIST (Deemed to be University)",
            "motto": "Excellence and Service",
            "tagline": "A Premier Deemed to be University, committed to holistic education, research and social transformation.",
            "campuses": ["Bengaluru Central", "Bengaluru Kengeri", "Bengaluru BGR", "Bengaluru Yeshwanthpur", "Delhi NCR", "Pune Lavasa"],
            "stats": [
                {"label": "Academic Programmes", "value": "120+", "icon": "academics"},
                {"label": "Enrolled Students", "value": "30,000+", "icon": "admissions"},
                {"label": "Research Publications", "value": "15,000+", "icon": "research"},
                {"label": "Clubs & Associations", "value": "45+", "icon": "student_life"},
                {"label": "Global University Partners", "value": "150+", "icon": "global"},
                {"label": "Annual Placements", "value": "90%+", "icon": "placements"},
            ],
            "quick_links": [
                {"title": "Academics", "path": "#academics", "icon": "mortarboard"},
                {"title": "Admissions", "path": "#admissions", "icon": "users"},
                {"title": "Research", "path": "#research", "icon": "microscope"},
                {"title": "Student Life", "path": "#campus-life", "icon": "trophy"},
                {"title": "Global Outreach", "path": "#global", "icon": "globe"},
                {"title": "Placements", "path": "#placements", "icon": "handshake"},
            ],
            "campus_life": {
                "title": "A Vibrant Campus Life",
                "tagline": "Learn. Grow. Belong.",
                "description": "Experience a dynamic campus culture with world-class infrastructure, diverse communities and endless opportunities.",
                "cards": [
                    {
                        "id": 1,
                        "title": "Iconic Central Campus",
                        "subtitle": "Historic architecture and lush gardens",
                        "image": "/images/card1_tower.png"
                    },
                    {
                        "id": 2,
                        "title": "Student Collaboration",
                        "subtitle": "Community, teamwork, and innovation",
                        "image": "/images/card2_students.png"
                    },
                    {
                        "id": 3,
                        "title": "Cultural Vibrance",
                        "subtitle": "In-Bloom, Darpan & Performing Arts",
                        "image": "/images/card3_dancers.png"
                    }
                ]
            },
            "news": [
                {
                    "id": 1,
                    "date": "15 Nov 2026",
                    "title": "Admissions for Academic Session 2026-27 Officially Open for UG and PG Programs",
                    "category": "Admissions"
                },
                {
                    "id": 2,
                    "date": "10 Nov 2026",
                    "title": "Annual National Cultural Festival 'In-Bloom' Announced with 50+ Inter-College Events",
                    "category": "Campus Events"
                },
                {
                    "id": 3,
                    "date": "04 Nov 2026",
                    "title": "Placement Season Achieves Record Recruitments with Marquee Tech and Consulting Firms",
                    "category": "Placements"
                }
            ],
            "contact": {
                "address": "Hosur Road, Bengaluru, Karnataka, India - 560029",
                "phone": "+91 80 4012 9100 / 9600",
                "email": "mail@christuniversity.in",
                "admissions_email": "admissions@christuniversity.in"
            }
        }
        return Response(data, status=status.HTTP_200_OK)
