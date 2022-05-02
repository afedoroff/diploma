import pandas as pd
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import  generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django import forms
from .data_analyzer import DataAnalyzer
from django.http import JsonResponse
import json


class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()

class FileUploader(APIView):
    def post(self, request, format=None):
        global res_data
        ONE_VAR = 1
        TWO_VAR = 2
        THREE_VAR = 3
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        jsonReq = request.body.decode('utf-8')
        df = pd.DataFrame(json.loads(jsonReq))
        try:
            for column in df:
                df[column] = pd.to_numeric(df[column])
            df.sort_values(by=df.iloc[:,0])
        except ValueError:
            pass
        try:
            for column in df:
                df[column] = pd.to_datetime(df[column])
            df.sort_values(by=df.iloc[:,0])
        except ValueError:
            pass
        if len(df.columns) == ONE_VAR:
            #df = df.pivot_table(columns=df.iloc[:,0], aggfunc='size')
            df = df.iloc[:,0].value_counts()
            js = json.loads(df.to_json(orient = 'columns'))
            print(df.name)
            res_data = {
                'header': df.name,
                'keys': list(js.keys()),
                'values': list(js.values())
            }
        print(JsonResponse(res_data))
        return JsonResponse(res_data)