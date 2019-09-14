from django.urls import path,include
from rest_framework import routers
from .views import NoteViewset

router=routers.DefaultRouter()
router.register(r'notes',NoteViewset,'notes')

urlpatterns=[
    path('',include(router.urls)),
]