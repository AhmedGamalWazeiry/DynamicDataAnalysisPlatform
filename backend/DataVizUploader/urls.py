
from .views import FileUploadListCreateView,FileView
from django.urls import path

urlpatterns = [
    path('files', FileUploadListCreateView.as_view(), name='file-list-create'),
    path('files/<int:pk>', FileView.as_view(), name='file-retrieve-destroy'),
    
]