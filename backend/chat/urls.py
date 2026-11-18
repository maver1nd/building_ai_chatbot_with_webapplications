from django.urls import path
from .views import ChatView, ChatHistoryView, NewChatView, HomeContentView, ChatSessionsListView

urlpatterns = [
    path('chat/', ChatView.as_view(), name='api_chat'),
    path('chat/history/', ChatHistoryView.as_view(), name='api_chat_history'),
    path('chat/sessions/', ChatSessionsListView.as_view(), name='api_chat_sessions'),
    path('chat/new/', NewChatView.as_view(), name='api_chat_new'),
    path('home-content/', HomeContentView.as_view(), name='api_home_content'),
]
