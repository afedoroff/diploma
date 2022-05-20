import json
import pandas as pd
from pandas.api.types import is_string_dtype
from pandas.api.types import is_numeric_dtype
from pandas.api.types import  is_datetime64_dtype
import numpy as np

class DataAnalyzer():
    FEW_ROWS = 6
    MANY_ROWS = 10
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
            for i in range(len(df.columns)):
                if is_datetime64_dtype(df.iloc[:,i]):
                    df['date'] = df['date'].apply(lambda x: x.strftime('%Y-%m-%d'))
                    col_name = df.columns[i]
                    col_data= df[col_name]
                    df.drop(col_name, inplace=True, axis=1)
                    df[col_name] = col_data
            js = json.loads(df.to_json(orient = 'columns'))
            keys = list(js.keys())
            res_data = {}
            series = []
            for i in range(len(keys)-1):
                series.append({
                    'name': keys[i],
                    'data': list(js[keys[i]].values())
                })
            res_data.update({
                'series': list(series),
                'xaxis': {
                    'title': {
                        'text': keys[2]
                    },
                    'categories': list(js[keys[2]].values())
                }
            })
            print(list(js[keys[2]].values()))
            if len(df.index) <= DataAnalyzer.MANY_ROWS:
                res_data.update({'type': 'bar_date'})
            else:
                res_data.update({'type': 'line_date'})
            print(res_data)
        else:
            df.sort_values(by=df.iloc[:,0].name, inplace=True)
            js = json.loads(df.to_json(orient = 'columns'))
            keys = list(js.keys())
            res_data = {}
            series = []
            for i in range(1, len(keys)):
                series.append({
                    'name': keys[i],
                    'data': list(js[keys[i]].values())
                })
            res_data = {
                'series': list(series),
                'xaxis': {
                    'title': {
                        'text': keys[0]
                    },
                    'categories': list(js[keys[0]].values())
                }
            }
            if len(df.index) <= DataAnalyzer.MANY_ROWS:
                res_data.update({'type': 'bar_num'})
            else:
                res_data.update({'type': 'area'})
        return res_data

    @staticmethod
    def analyze_three_col(df):
        js = json.loads(df.to_json(orient = 'columns'))
        keys = list(js.keys())
        data1 = []
        data2 = []
        for i in range(len(js[keys[0]].values())):
            data1.append([list(js[keys[1]].values())[i], list(js[keys[0]].values())[i]])
            data2.append([list(js[keys[2]].values())[i], list(js[keys[0]].values())[i]])
        print(data1)
        print('////////////////////////')
        print(data2)
        print('////////////////////////')
        res_data = {
            'data1': data1,
            'data2': data2,
            'type': 'scatter'
        }
        return res_data