import pandas as pd
from .models import FinancialDataSet
from django.db import transaction

import numpy as np



def process_csv_file(file):
    return_data_object = {'is_error':False,'error_message':"",'data_frame':None,'dependent_name':"",'independent_name':"",'slope':"",'intercept':""}
    
    df = pd.read_csv(file.file)
    
      # Check if the file contains at least two columns
    if len(df.columns) < 2:
        return_data_object['is_error'] = True
        return_data_object['error_message'] = "The file must contain at least two columns."
        return return_data_object

    # Take the first two columns
    df = df[df.columns[:2]]

    # Extract the names of the columns for dependent and independent variables
    x_var, y_var = df.columns

    # Check if all values in the rows are numbers
    if not (np.issubdtype(df[x_var].dtype, np.number) and np.issubdtype(df[y_var].dtype, np.number)):
        return_data_object['is_error'] = True
        return_data_object['error_message'] = "All values in the rows must be numbers."
        return return_data_object

    # Replace null values with 0
    df = df.fillna(0)

    # Generate the slope and the intercept for linear regression
    slope, intercept = np.polyfit(df[x_var],  df[y_var], 1)

    # Generate new DataFrame with data of the line
    df = generate_new_dataframe(df, x_var, slope, intercept)

    return_data_object['data_frame'] = df
    return_data_object['dependent_name'] = y_var
    return_data_object['independent_name'] = x_var
    return_data_object['slope'] = slope
    return_data_object['intercept'] = intercept
    
    return return_data_object

def generate_new_dataframe(df, x_var, slope, intercept):
    df['predicted_y'] = slope * df[x_var] + intercept
    return df

def insert_data_into_financial_data_set(data_frame,file):
    with transaction.atomic():
        for index, row in data_frame.iterrows():
            independent = row[0]  
            dependent = row[1]  
            predicted_y = row[2]
            FinancialDataSet.objects.create(dependent=dependent,independent=independent,predicted_y=predicted_y,financial_file=file)
       
    
def get_data_sets_by_file_id(file_id,dependent_name,independent_name):
    financial_data_sets = FinancialDataSet.objects.filter(financial_file_id=file_id)
    result_list = {dependent_name:[], independent_name:[],'predicted_y':[]}
  
    
 
    for j in financial_data_sets:
              result_list[dependent_name].append(j.dependent)
              result_list[independent_name].append(j.independent)
              result_list['predicted_y'].append(j.predicted_y)
   
    return result_list
    