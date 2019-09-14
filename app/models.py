from django.db import models
from django.contrib.auth.models import User
class Notes(models.Model):
    title=models.CharField(max_length=100)
    body=models.CharField(max_length=2000)
    user=models.ForeignKey(User,related_name='notes',on_delete=models.CASCADE)
    def __str__(self):
        return  self.title