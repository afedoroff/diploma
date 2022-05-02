from django.urls import path
from .views import FileUploader

urlpatterns = [
    path('upload-file', FileUploader.as_view())
]