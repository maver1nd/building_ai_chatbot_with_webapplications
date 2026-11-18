import uuid
from django.db import models

class ChatSession(models.Model):
    """
    Session tracking for visitor conversations.
    SRS Section 8 (Data Requirements)
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_active_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Chat Session'
        verbose_name_plural = 'Chat Sessions'
        ordering = ['-last_active_at']

    def __str__(self):
        return str(self.id)


class ChatMessage(models.Model):
    """
    Conversation messages between visitor and AI assistant.
    SRS Section 8 (Data Requirements)
    """
    ROLE_CHOICES = (
        ('user', 'User'),
        ('assistant', 'Assistant'),
    )

    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    content = models.TextField(max_length=4000)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Chat Message'
        verbose_name_plural = 'Chat Messages'
        indexes = [
            models.Index(fields=['session', 'created_at']),
        ]
        ordering = ['created_at']

    def __str__(self):
        return f"{self.session.id} - {self.role}: {self.content[:30]}"
