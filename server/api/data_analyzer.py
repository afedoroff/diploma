import json
import pandas as pd
from pandas.api.types import is_string_dtype
from pandas.api.types import is_numeric_dtype
from pandas.api.types import  is_datetime64_dtype
import numpy as np

class DataAnalyzer():
    FEW_ROWS = 6
    MANY_ROWS = 15
    @staticmethod
    def analyze_one_col(df):
        df = df.iloc[:,0].value_counts()
        js = json.loads(df.to_json(orient = 'columns'))
        res_data = {
            'header': df.name,
            'xaxis': list(js.keys()),
            'yaxis': list(js.values())
        }
        if len(df.index) <= DataAnalyzer.FEW_ROWS:
            res_data.update({'type': 'pie'})
        elif len(df.index) > DataAnalyzer.FEW_ROWS and len(df.index) <= DataAnalyzer.MANY_ROWS:
            res_data.update({'type': 'bar'})
        else:
            res_data.update({'type': 'treemap'})
        return res_data

    @staticmethod
    def analyze_two_col(df, HAS_DT):
        if HAS_DT:
            if is_datetime64_dtype(df.iloc[:,1]):
                df = pd.DataFrame(df, columns=[df.columns[1], df.columns[0]])
            js = json.loads(df.to_json(orient = 'columns'))
            keys = list(js.keys())
            res_data = {
                'xaxis': list(js[keys[0]].values()),
                'yaxis': list(js[keys[1]].values()),
            }
            if len(df.index) <= DataAnalyzer.MANY_ROWS:
                res_data.update({'type': 'bar_date'})
            else:
                res_data.update({'type': 'line'})
            print(res_data)
        return res_data

    @staticmethod
    def analyze_three_col(df, HAS_DT):
        df = df.iloc[:,0].value_counts()
        js = json.loads(df.to_json(orient = 'columns'))
        res_data = {
            'header': df.name,
            'keys': list(js.keys()),
            'values': list(js.values())
        }
        return res_data