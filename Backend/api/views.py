from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Users,Profile_Details

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
    Profile_Details.objects.create(
        fullname=fullname,
        email=email,
        password=password,
        age=age,
        gender=gender,
        country=country
        # dosha_type, weight, height, blood_pressure default to null
    )


    return Response({'message': 'User registered successfully'}, status=200)  # ✅ Ensure message is sent

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = Users.objects.filter(email=email, password=password).first()

    if user:
        return Response({'message': 'Login successful', 'fullname': user.fullname, 'email': user.email}, status=200)  # ✅ Return user data
    return Response({'error': 'Invalid credentials'}, status=400)

@api_view(['POST'])
def get_profile_details(request):
    email = request.data.get('email')

    if not email:
        return Response({'error': 'Email is required'}, status=400)

    profile = Profile_Details.objects.filter(email=email).first()
    if not profile:
        return Response({'error': 'Profile not found'}, status=404)

    return Response({
        'name': profile.fullname,
        'email': profile.email,
        'age': profile.age,
        'gender': profile.gender,
        'country': profile.country,
        'dosha_type': profile.dosha_type,
        'weight': profile.weight,
        'height': profile.height,
        'blood_pressure': profile.blood_pressure
    })

@api_view(['POST'])
def update_profile(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=400)

    profile = Profile_Details.objects.filter(email=email).first()
    if not profile:
        return Response({'error': 'Profile not found'}, status=404)

    # Only update fields if they are not None or empty
    field_mapping = {'name': 'fullname'}
    for field in ['name', 'age', 'gender', 'dosha_type', 'weight', 'height', 'blood_pressure']:
        value = request.data.get(field)
        if value not in [None, '']:
            setattr(profile, field_mapping.get(field, field), value)


    profile.save()
    return Response({'message': 'Profile updated successfully'})