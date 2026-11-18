from django.db import models

class KnowledgeEntry(models.Model):
    """
    University knowledge base entries for the campus AI assistant.
    SRS Section 8 (Data Requirements)
    """
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100, db_index=True)
    content = models.TextField()
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Knowledge Entry'
        verbose_name_plural = 'Knowledge Entries'
        ordering = ['category', 'title']

    def __str__(self):
        return f"[{self.category}] {self.title}"
