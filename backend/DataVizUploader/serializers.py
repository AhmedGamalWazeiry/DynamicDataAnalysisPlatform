# myapp/serializers.py
from rest_framework import serializers
from .models import FinancialDataSet, FinancialFile

class FinancialFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialFile
        fields = '__all__'

class FinancialDataSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialDataSet
        fields = '__all__'