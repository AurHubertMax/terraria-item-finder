from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Item


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'item_id', 'name', 'recipe1', 'recipe2', 'recipe3', 'recipe4', 'recipe5', 'recipe6']
        extra_kwargs = {'id': {'read_only': True}}
    
    def create(self, validated_data):
        return Item.objects.create(**validated_data)

class NoteSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True)
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'items', 'created_at', 'author']
        extra_kwargs = {'author': {'read_only': True}}
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        note = Note.objects.create(**validated_data)
        for item_data in items_data:
            item= Item.objects.create(**item_data)
            note.items.add(item)
        return note
