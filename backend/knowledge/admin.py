from django.contrib import admin
from .models import KnowledgeEntry

@admin.register(KnowledgeEntry)
class KnowledgeEntryAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_active', 'updated_at')
    list_filter = ('category', 'is_active')
    search_fields = ('title', 'category', 'content')
