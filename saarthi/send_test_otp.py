import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'saarthi.settings')
django.setup()

from django.core.mail import send_mail
import random

# Change this to your test recipient
recipient = 'your_email@gmail.com'

otp = str(random.randint(100000, 999999))
subject = 'Test OTP from Saarthi'
message = f'Your OTP is: {otp}'
from_email = os.environ.get('DEFAULT_FROM_EMAIL', 'codeweave12@gmail.com')

try:
    send_mail(
        subject,
        message,
        from_email,
        [recipient],
        fail_silently=False
    )
    print(f'Success! OTP {otp} sent to {recipient}')
except Exception as e:
    print('Failed to send OTP:', e)
