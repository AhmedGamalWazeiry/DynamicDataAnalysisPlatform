from django.contrib import admin
from .models import FinancialDataSet, FinancialFile

class FinancialDataSetAdmin(admin.ModelAdmin):
    list_display = ('dependent','independent','financial_file')
   

class FinancialFileAdmin(admin.ModelAdmin):
    list_display = ('file','uploaded_at','dependent_name','independent_name','slope','intercept')

admin.site.register(FinancialDataSet, FinancialDataSetAdmin)
admin.site.register(FinancialFile, FinancialFileAdmin)
