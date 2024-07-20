from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.NoteListCreate.as_view(), name='note-list'),
    path('notes/delete/<int:pk>/', views.NoteDelete.as_view(), name='note-delete'), # int:pk is the primary key of the note
    path('items/', views.ItemSearch.as_view(), name='item-search'),
]
