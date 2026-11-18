from django.core.management.base import BaseCommand
from knowledge.models import KnowledgeEntry

SEED_DATA = [
    {
        "title": "Admissions Overview & Process 2026-2027",
        "category": "Admissions",
        "content": (
            "Christ University admissions for the academic year 2026-2027 are conducted online "
            "through the official admissions portal (https://christuniversity.in/apply-online). "
            "Selection is based on the Christ University Entrance Test (CUET), Skill Assessment (SA), "
            "Micro Presentation (MP), and Personal Interview (PI), alongside Class 10 and Class 12 academic merit. "
            "Applications open in December each year with multiple selection rounds extending through May. "
            "Candidates may apply for up to three program preferences across campuses."
        )
    },
    {
        "title": "Undergraduate Degree Programs (UG)",
        "category": "Courses & Programs",
        "content": (
            "Christ University offers premier undergraduate programs across Sciences, Engineering, Commerce, "
            "Management, Arts, and Law. Notable programs include:\n"
            "• B.Tech: Computer Science & Engineering, AI & Machine Learning, Electronics & Communication, Robotics (Kengeri Campus).\n"
            "• BCA (Bachelor of Computer Applications): 3-year and 4-year Honours with research in Cloud Computing and Data Analytics.\n"
            "• BBA: Finance & Accountancy, Tourism and Travel Management, Decision Sciences (Central & BGR Campuses).\n"
            "• B.Com (Honours / Professional / International Finance): Accredited by ACCA and CIMA.\n"
            "• B.A. LLB (Honours) & BBA LLB (Honours): Approved by the Bar Council of India.\n"
            "• B.Sc: Data Science, Psychology, Biotechnology, Economics & Mathematics."
        )
    },
    {
        "title": "Postgraduate Degree Programs (PG)",
        "category": "Courses & Programs",
        "content": (
            "Postgraduate offerings include:\n"
            "• MBA (Master of Business Administration): Dual specialization in Marketing, Finance, HR, Business Analytics, and Lean Operations at Bengaluru Central, Kengeri, Delhi NCR, and Pune Lavasa campuses.\n"
            "• MCA (Master of Computer Applications): 2-year rigorous curriculum with AI, Cloud Infrastructure, and Full-Stack development.\n"
            "• M.Tech: Computer Science, VLSI Design, and Machine Learning.\n"
            "• M.Sc: Data Science, Clinical Psychology, Physics, Actuarial Science.\n"
            "• M.Com & MA: Applied Economics, English and Cultural Studies, Media and Communication."
        )
    },
    {
        "title": "Doctoral & Research Programs (Ph.D.)",
        "category": "Courses & Programs",
        "content": (
            "Christ University provides full-time and part-time Ph.D. programs across 24 disciplines including "
            "Computer Science, Management Studies, Economics, Psychology, and Media Studies. Candidates must qualify "
            "UGC-NET / JRF or the university's Ph.D. Entrance Examination followed by a research proposal presentation. "
            "Doctoral scholars have access to sponsored research grants, the Central Instrumentation Facility, and international lab collaborations."
        )
    },
    {
        "title": "University Campuses & Infrastructure",
        "category": "Campus Facilities",
        "content": (
            "Christ (Deemed to be University) operates multiple vibrant campuses equipped with world-class facilities:\n"
            "1. Central Campus (Hosur Road, Bengaluru): 25 acres of lush green campus featuring the iconic Central Tower, modern smart classrooms, Knowledge Centre (Library with 300,000+ volumes), Main Auditorium (2000 seats), and amphitheatre.\n"
            "2. Kengeri Campus (Bengaluru): 75-acre eco-friendly campus housing the School of Engineering and Technology, School of Architecture, sports complex, and incubation centres.\n"
            "3. Bannerghatta Road Campus (BGR, Bengaluru): Focuses on School of Business and Management with financial trading labs and modern executive conference halls.\n"
            "4. Yeshwanthpur Campus (Bengaluru): State-of-the-art 10-storey campus housing Liberal Arts, Sciences, and Law.\n"
            "5. Delhi NCR Campus (Ghaziabad): Modern campus providing Commerce, Law, and Management in North India.\n"
            "6. Pune Lavasa Campus: Known as the Hub of Analytics, focusing on Data Science, Business Analytics, and AI."
        )
    },
    {
        "title": "Campus Facilities, Hostels, and Student Amenities",
        "category": "Campus Facilities",
        "content": (
            "The university provides comprehensive on-campus facilities for students:\n"
            "• Hostels: Dedicated safe hostels for men (Jonas Hall, St. Kuriakose Hall) and women (Devadan Hall, St. Mary's Hostel) with Wi-Fi, study halls, and 24/7 security.\n"
            "• Libraries: Multi-storey Knowledge Centres with digital databases (IEEE, Scopus, JSTOR), private reading carrels, and RFID issue systems.\n"
            "• Sports: Olympic-size basketball courts, football grounds, badminton courts, indoor table tennis, and fully equipped gymnasiums.\n"
            "• Dining: Gourmet food courts, Ivy Hall cafeteria, Nandini parlour, and vegetarian/multi-cuisine dining options.\n"
            "• Health Care: On-campus health centres with resident medical doctors and tie-ups with multi-specialty hospitals."
        )
    },
    {
        "title": "Student Life, Cultural Fests & Clubs",
        "category": "Events & Activities",
        "content": (
            "Student life at Christ is vibrant and multifaceted under the motto 'Excellence and Service':\n"
            "• Cultural Fests: 'In-Bloom' (national inter-collegiate cultural fest), 'Darpan' (intra-university talent search), 'Magnovite' (national engineering and tech symposium), 'Blossoms' and 'Chrysalis'.\n"
            "• Student Associations: Over 40 active student clubs including Student Council, Centre for Social Action (CSA), Choir, University Dance Team, Model United Nations (MUN), Rotaract Club, and IEEE Student Branch.\n"
            "• Social Transformation: Mandatory social service credit hours through CSA community schools and rural education camps."
        )
    },
    {
        "title": "Placements, Recruiters & Career Development",
        "category": "Placements",
        "content": (
            "The Placement and Career Guidance Cell at Christ University boasts an outstanding placement record:\n"
            "• Top Recruiters: Google, Microsoft, Amazon, Cisco, Deloitte, EY, KPMG, PwC, McKinsey, Goldman Sachs, JP Morgan, Morgan Stanley, Infosys, TCS, Wipro, and Accenture.\n"
            "• Statistics: Over 500+ visiting recruiters annually. Highest domestic package stands at ₹22.5 LPA; average package across management and computer science programs is ₹7.8 LPA to ₹9.2 LPA.\n"
            "• Training: Pre-placement training begins from semester 4 covering aptitude test prep, mock interviews, domain case studies, and soft-skill development."
        )
    },
    {
        "title": "Fees, Scholarships & Financial Assistance",
        "category": "Fees & Scholarships",
        "content": (
            "Tuition fees at Christ University vary by program and domicile status (Karnataka domicile, Other Indian States, and International/NRI):\n"
            "• Typical UG annual tuition ranges from ₹90,000 to ₹2,80,000 depending on the discipline (B.Com ~₹1.2L - ₹1.8L; B.Tech ~₹2.2L - ₹2.5L; BBA ~₹2.4L - ₹2.8L).\n"
            "• Merit Scholarships: Awarded to top academic performers each semester (up to 50% tuition waiver).\n"
            "• Financial Need-Based Scholarships: Provided through the Christ Beneficiary Fund to deserving economically challenged students.\n"
            "• Sports Scholarships: Granted to national and international level athletes."
        )
    },
    {
        "title": "Contact Details, Addresses & Official Channels",
        "category": "Contact Details",
        "content": (
            "University Contact Information:\n"
            "• Central Campus Address: Hosur Road, Bengaluru, Karnataka, India - 560029.\n"
            "• Central Switchboard Phone: +91 80 4012 9100 / +91 80 4012 9600.\n"
            "• Admissions Enquiry Phone: +91 80 4012 9281 / +91 80 4012 9282.\n"
            "• General Email: mail@christuniversity.in\n"
            "• Admissions Email: admissions@christuniversity.in\n"
            "• Office Working Hours: Monday to Friday 9:00 AM – 5:00 PM; Saturday 9:00 AM – 1:00 PM (Closed on Sundays and University holidays).\n"
            "• Official Website: https://christuniversity.in"
        )
    },
    {
        "title": "Global Outreach & International Admissions",
        "category": "Global Outreach",
        "content": (
            "Christ University has active academic exchange partnerships with over 150 international universities in the US, UK, Europe, Australia, and East Asia. "
            "International students and NRI applicants can apply under the Foreign/NRI quota through the Office of International Affairs. "
            "Dual-degree and credit transfer programs are available with partner institutions such as Western Michigan University, University of Applied Sciences Wurzburg-Schweinfurt, and Swansea University."
        )
    }
]

class Command(BaseCommand):
    help = 'Seeds the Knowledge Base with comprehensive university data for ChristBot'

    def handle(self, *args, **options):
        created_count = 0
        updated_count = 0
        for item in SEED_DATA:
            obj, created = KnowledgeEntry.objects.update_or_create(
                title=item['title'],
                defaults={
                    'category': item['category'],
                    'content': item['content'],
                    'is_active': True
                }
            )
            if created:
                created_count += 1
            else:
                updated_count += 1

        self.stdout.write(self.style.SUCCESS(
            f"Successfully seeded Knowledge Base: {created_count} created, {updated_count} updated."
        ))
