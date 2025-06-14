from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Users

@api_view(['POST'])
def register(request):
    fullname = request.data.get('fullname')
    email = request.data.get('email')
    password = request.data.get('password')
    age = request.data.get('age')
    gender = request.data.get('gender')
    country = request.data.get('country')

    if not fullname or not email or not password:
        return Response({'error': 'All fields are required'}, status=400)

    user = Users.objects.create(fullname=fullname, email=email, password=password, age=age, gender=gender, country=country)

    return Response({'message': 'User registered successfully'}, status=200)  # ✅ Ensure message is sent

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = Users.objects.filter(email=email, password=password).first()

    if user:
        return Response({'message': 'Login successful', 'fullname': user.fullname, 'email': user.email}, status=200)  # ✅ Return user data
    return Response({'error': 'Invalid credentials'}, status=400)

@api_view(['GET'])
def user_details(request):
    if request.user.is_authenticated:
        user = request.user
        return Response({
            'name': user.username,
            'email': user.email,
            'age': user.profile.age,
            'gender': user.profile.gender,
            'dosha_type': user.profile.dosha_type,
            'weight': user.profile.weight,
            'height': user.profile.height,
            'blood_pressure': user.profile.blood_pressure,
        })
    return Response({'error': 'User not authenticated'}, status=401)