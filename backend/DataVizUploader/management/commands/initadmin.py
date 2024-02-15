from django.contrib.auth.models import User
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    def handle(self, *args, **options):
        if User.objects.count() == 0:
            User.objects.create_superuser(
                username='admin',
                email='admin@example.com',
                password='pass'
            )
            print('Admin account created.')
        else:
            print('Admin account can only be initialized if no Accounts exist.')