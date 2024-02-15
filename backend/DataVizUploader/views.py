from rest_framework.generics import ListCreateAPIView, DestroyAPIView,RetrieveDestroyAPIView,ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser,FileUploadParser
from .models import FinancialDataSet,FinancialFile 
from .serializers import FinancialFileSerializer,FinancialDataSetSerializer
from .utils import process_csv_file,insert_data_into_financial_data_set,get_data_sets_by_file_id

class FileUploadListCreateView(ListCreateAPIView):
    queryset = FinancialFile.objects.all() 
    serializer_class = FinancialFileSerializer
    parser_classes = (MultiPartParser, FormParser)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        uploaded_file = serializer.validated_data['file']
        try:
            return_data_object = process_csv_file(uploaded_file)
        except Exception as e:
            return Response('An unexpected error occurred during processing the CSV file.', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
           
        
        if return_data_object['is_error']:
            return Response(return_data_object['error_message'], status=status.HTTP_400_BAD_REQUEST)
        
        data_frame = return_data_object["data_frame"]
        
        last_three_columns = data_frame.iloc[:, -3:]

        result_list = last_three_columns.to_dict(orient='list')
        
        serializer.validated_data['dependent_name'] = return_data_object["dependent_name"]
        serializer.validated_data['independent_name'] = return_data_object["independent_name"]
        serializer.validated_data['slope'] = return_data_object["slope"]
        serializer.validated_data['intercept'] = return_data_object["intercept"]
        
        file = serializer.save()
        
        
        try:
            insert_data_into_financial_data_set(return_data_object['data_frame'],file)
        except Exception as e :
            return Response('An unexpected error occurred during storing the data.', status=status.HTTP_400_BAD_REQUEST)
        
        result_list["dependent_name"]= return_data_object["dependent_name"]
        result_list["independent_name"]= return_data_object["independent_name"]
        result_list["slope"]= return_data_object["slope"]
        result_list["intercept"]= return_data_object["intercept"]
        
        return Response(result_list, status=status.HTTP_201_CREATED)
    
class FileView(RetrieveDestroyAPIView):
    serializer_class = FinancialFileSerializer
    queryset = FinancialFile.objects.all()
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        file_id = serializer.data["id"]
        result_list = get_data_sets_by_file_id(file_id,serializer.data["dependent_name"],serializer.data["independent_name"])
        result_list["dependent_name"]=  serializer.data["dependent_name"]
        result_list["independent_name"]= serializer.data["independent_name"]
        
        return Response(result_list)


   
