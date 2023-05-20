from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from users.models import History,Document,Client,Pet,Vet

@receiver(post_save, sender=Document)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        #print(dir(instance))
        History.objects.create(user=instance.user,client=instance.client,action_name = 'uploaded document',action_details=instance.upload_document.name)

@receiver(post_save, sender=Pet)
def create_pet_profile(sender, instance, created, **kwargs):
    if created:
        #print(dir(instance))
        History.objects.create(user=instance.user,client=instance.client,action_name = 'Updated a Pet Info',action_details=instance.name)

@receiver(post_save, sender=Vet)
def create_vet_profile(sender, instance, created, **kwargs):
    if created:
        #print(dir(instance))
        History.objects.create(user=instance.user,client=instance.client,action_name = 'Updated a Vet Info',action_details=instance.name)        

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()