import os
from django.db import models
from django.core.validators import FileExtensionValidator
from .validators import validate_file_size

class FinancialFile(models.Model):
    def files_directory_path(instance, filename):
        old_name = os.path.splitext(filename)[0]  # get the original file name without extension
        extension = os.path.splitext(filename)[1]  # get the file extension
        new_name = '{}______{}'.format(old_name, extension)  # create new name
        new_dir = os.path.join(new_name)  # join with the directory 
        return new_dir
    
    file = models.FileField(upload_to=files_directory_path, validators=[
            validate_file_size,
            FileExtensionValidator(allowed_extensions=["txt", "doc", "docx", "pdf", "ppt", "pptx", "csv"]),
        ])
    uploaded_at = models.DateTimeField(auto_now_add=True)
    dependent_name  = models.CharField(max_length=255, blank=True, null=True)
    independent_name = models.CharField(max_length=255, blank=True, null=True)
    slope = models.FloatField( blank=True, null=True)
    intercept = models.FloatField( blank=True, null=True)
    
    

class FinancialDataSet(models.Model):
    financial_file = models.ForeignKey(FinancialFile, on_delete=models.CASCADE)
    dependent  = models.DecimalField(max_digits=12, decimal_places=4)
    independent = models.DecimalField(max_digits=12, decimal_places=4)
    predicted_y  = models.DecimalField(max_digits=12, decimal_places=4)
   