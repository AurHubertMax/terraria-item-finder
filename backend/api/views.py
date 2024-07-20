from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, ItemSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, Item


# POST request to /api/notes/ will create a new note
class NoteListCreate(generics.ListCreateAPIView):
    
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        items_data = self.request.data.get('items', [])
        if serializer.is_valid():
            serializer.save(author=self.request.user)
            for item_data in items_data:
                item_serializer = ItemSerializer(data=item_data)
                if item_serializer.is_valid():
                    item_serializer.save()
                else:
                    print(item_serializer.errors)
        else:
            print(serializer.errors)

# DELETE request to /api/notes/delete/<int:pk>/ will delete the note with the primary key of pk
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
# POST request to /api/users/ will create a new user
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# GET request to /api/users/ will return all users
class ItemSearch(generics.ListAPIView):
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]
    queryset = Item.objects.all()

    def get_queryset(self):
        queryset = Item.objects.all()
        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = queryset.filter(name__icontains=name)
        return queryset





