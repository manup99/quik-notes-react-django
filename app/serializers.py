from rest_framework.authtoken.models import Token
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from .models import Notes
from django.contrib.auth.models import User
class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','first_name','last_name','email']
class TokenSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(many=False, read_only=True)
    class Meta:
        model = Token
        fields = ('key', 'user')

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password_reset_form_class = PasswordResetForm
    def validate_email(self, value):
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(_('Error'))

        ###### FILTER YOUR USER MODEL ######
        if not User.objects.filter(email=value).exists():

            raise serializers.ValidationError(_('Invalid e-mail address'))
        return value

    def save(self):
        request = self.context.get('request')
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),


            'email_template_name': 'example_message.txt',

            'request': request,
        }
        self.reset_form.save(**opts)
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Notes
        fields=['title','body','id']