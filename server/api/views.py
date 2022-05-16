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
        ONE_COL = 1
        TWO_COL = 2
        THREE_COL = 3
        HAS_DT = False
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        jsonReq = request.body.decode('utf-8')
        df = pd.DataFrame(json.loads(jsonReq))
        if len(df.columns) == ONE_COL:
            res_data = DataAnalyzer.analyze_one_col(df)
        elif len(df.columns) >= TWO_COL:
            for column in df:
                try:
                    df[column] = pd.to_numeric(df[column])
                    df.sort_values(by=column, kind = "mergesort")
                    continue
                except ValueError:
                    pass
                try:
                    df[column] = pd.to_datetime(df[column])
                    df.sort_values(by=column, kind = "mergesort")
                    HAS_DT = True
                except ValueError:
                    pass
            if len(df.columns) == TWO_COL:
                res_data = DataAnalyzer.analyze_two_col(df, HAS_DT)
            else:
                res_data = DataAnalyzer.analyze_three_col(df, HAS_DT)
        return JsonResponse(res_data)