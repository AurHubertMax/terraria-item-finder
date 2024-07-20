from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    items = models.ManyToManyField('Item', related_name='notes')
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')

    def __str__(self):
        return self.title
    
class Item(models.Model):
    item_id = models.IntegerField()
    name = models.CharField(max_length=100)
    recipe1 = models.CharField(max_length=100, blank=True, null=True)
    recipe2 = models.CharField(max_length=100, blank=True, null=True)
    recipe3 = models.CharField(max_length=100, blank=True, null=True)
    recipe4 = models.CharField(max_length=100, blank=True, null=True)
    recipe5 = models.CharField(max_length=100, blank=True, null=True)
    recipe6 = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name
