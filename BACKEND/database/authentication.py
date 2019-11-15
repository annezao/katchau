from .models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
import pytz

from django.utils import timezone
import datetime

# token checker if token expired or not
def is_token_expired(token):
    if token.name != 'auth-token':
        return False
    else:
        utc_now = timezone.now()
        utc_now = utc_now.replace(tzinfo=pytz.utc)
        return token.created < utc_now - datetime.timedelta(hours=24)

class ExpiringTokenAuthentication(TokenAuthentication):
    """ 
    If token is expired then it will be removed
    and new one with different key will be created
    """
    def authenticate_credentials(self, key):
        try:
            token = Token.objects.get(key = key)
        except Token.DoesNotExist:
            raise AuthenticationFailed("Invalid token.")
        
        if not token.user.is_active:
            raise AuthenticationFailed("User account is disabled.")

        if is_token_expired(token):
            raise AuthenticationFailed("The token is expired.")
        
        return (token.user, token)
