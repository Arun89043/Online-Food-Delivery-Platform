from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


User = get_user_model()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def test_users(request):
    users = User.objects.all()
    data = [
        {
            "username": user.username,
            "user_type": user.user_type,
            "phone": user.phone_number,
        }
        for user in users
    ]
    return Response(data)
