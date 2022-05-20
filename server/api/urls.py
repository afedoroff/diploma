from django.urls import path
from .views import DataUploader

urlpatterns = [
    path('upload-file', DataUploader.as_view())
]