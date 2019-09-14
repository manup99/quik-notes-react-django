from django.shortcuts import render
from rest_framework import viewsets,permissions
from .serializers import NoteSerializer
from .models import Notes
# Create your views here.
class NoteViewset(viewsets.ModelViewSet):
    permission_classes=[
        permissions.IsAuthenticated,
    ]
    serializer_class=NoteSerializer
    def get_queryset(self):
        return self.request.user.notes.all()
    def perform_create(self,serializer):
        serializer.save(user=self.request.user)

