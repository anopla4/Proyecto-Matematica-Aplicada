from typing import Dict
import pandas as pd
from pandas.core.frame import DataFrame
from sklearn.preprocessing import StandardScaler
import numpy as np
from random import random

def fill_na(data):
    """
    Asigna a los valores nan de un feature determinado un valor de los que este feature puede tomar utilizando 
    la probabilidad de ocurrencia de cada uno de esos valores a partir de una función de probabilidad
    """
    dict_values_to_freq = {}
    for feature in data.columns:
        dict_values_to_freq[feature] = {}
        for i, row in data.iterrows():
            if pd.isna(row[feature]):
                continue
            else:
                if row[feature] not in dict_values_to_freq[feature]:
                    dict_values_to_freq[feature][row[feature]] = 0
                dict_values_to_freq[feature][row[feature]] += 1
        for value in dict_values_to_freq[feature]:
            dict_values_to_freq[feature][value] = dict_values_to_freq[feature][value]/(len(data) - data[feature].isna().sum())
        for i, row in data.iterrows():
            if pd.isna(row[feature]):
                u = random()
                acc_prob = 0
                for value in dict_values_to_freq[feature]:
                    acc_prob += dict_values_to_freq[feature][value]
                    if u <= acc_prob:
                        data.loc[i,feature] = value
                        break
    return data

def values_fill_na(data:DataFrame):
    """
    Rellena los valores nan de los atributos numericos en el data frame original
    data-> data frama de pandas(data de entrada completa antes de dummy)
    """
    types = data.dtypes
    for i in range(len(types)):
        if types[i] == np.int64 or types[i] == np.float64:
            data.loc[:,data.columns.values[i]] =data.loc[:,data.columns.values[i]].fillna(data.loc[:,data.columns.values[i]].mean())
    return data

def precomputing_nominal_fill_na(data:DataFrame):
    """
    Precomputan los diccionarios para la sustitucion de los valores nan nominales
    """
    dict_values_to_prob = {}
    dict_atribute_rowsnan = {}
    for feature in data.columns:
        dict_values_to_prob[feature] = {}
        dict_atribute_rowsnan[feature] = []
        for i, row in data.iterrows():
            if pd.isna(row[feature]):
                dict_atribute_rowsnan[feature].append(i)
                continue
            else:
                if row[feature] not in dict_values_to_prob[feature]:
                    dict_values_to_prob[feature][row[feature]] = 0
                dict_values_to_prob[feature][row[feature]] += 1
        for value in dict_values_to_prob[feature]:
            dict_values_to_prob[feature][value] = dict_values_to_prob[feature][value]/(len(data) - data[feature].isna().sum())
    return dict_values_to_prob, dict_atribute_rowsnan

def nominal_fill_na(data:DataFrame, dict_values_to_prob:Dict, dict_atribute_rowsnan:Dict):
    """
    Rellena los valores nan de los atributos nominales en el data frame original
    data-> data frama de pandas(data de entrada completa luego de dummy)
    dict_values_to_prob -> diccionario atributo : (dict valor: probabilidad)
    dict_atribute_rowsnan -> diccionario atributo : lista de filas que tenian nan
    """
    for feature in dict_atribute_rowsnan:
        rows = dict_atribute_rowsnan[feature]
        if len(rows) == 0:
            continue
        for row in rows:
            for value in dict_values_to_prob[feature]:
                prob = dict_values_to_prob[feature][value]
                column_name = feature + "_" + value
                data.loc[row,column_name] = prob
    return data



def municipality_raw_parser(municipality_column):
    """
    Otorga un nombre standard a los municipios
    a los municipios fuera de la habana les otorgo el valor: habana del este
    """
    dict_munic = {"plaza de la revolucion": "plaza de la revoución" ,
                    "plaza de la revoución": "plaza de la revoución",
                    "plaza": "plaza de la revolucion",
                    "centro habana":"centro habana",
                    "habana vieja":"habana vieja",
                    "playa":"playa",
                    "cerro":"cerro",
                    "marianao":"marianao",
                    "diez de octubre": "diez de octubre",
                    "10 de octubre":"diez de octubre",
                    "la lisa": "la lisa",
                    "boyero":"boyeros",
                    "boyeros":"boyeros", 
                    "arroyo naranjo": "arroyo naranjo",
                    "san miguel": "san miguel del padrón",
                    "san miguel del padron":"san miguel del padrón",
                    "san miguel del padrón":"san miguel del padrón",
                    "cotoro":"cotoro",
                    "guanabacoa":"guanabacoa",
                    "habana del este":"habana del este"}
    result = []
    for munc in municipality_column:
        if  pd.isna(munc) or munc.lower() not in dict_munic:
            munc = "habana del este"
        result.append(dict_munic[munc.lower()])
    return result

def municipality_parser_universityDistance(municipality_column):
    """
    Realiza un primer municipality_parser_raw, y luego
    Otorga un valor standard a los municipios segun su cercania con la universidad
    """
    dict_munic = {"plaza de la revoución": 0,
                    "centro habana":1,
                    "habana vieja":2,
                    "playa":2,
                    "cerro":2,
                    "marianao":3,
                    "diez de octubre": 3,
                    "la lisa": 4,
                    "boyeros":4, 
                    "arroyo naranjo": 4,
                    "san miguel del padrón":5,
                    "cotoro":5,
                    "guanabacoa":5,
                    "habana del este":5}
    result = []
    for munc in  municipality_raw_parser(municipality_column):
        if munc.lower() not in dict_munic:
            munc = "habana del este"
        result.append(dict_munic[munc.lower()]/6)
    return result

dict_parsers_global = {"municipality_raw_parser":municipality_raw_parser,
    "municipality_parser_universityDistance": municipality_parser_universityDistance}


def data_performing(df, interesting_atribute, relevant_weights, dict_parser_strategy):
    """
    df-> data frama de pandas(data de entrada completa)
    interesting_atribute-> lista con el nombre de los atributos relevantes
    relevant_weights -> relevancia de los atributos de interes
    dict_parser_strategy -> donde se indica el tipo de parser a ejcutar sobre un atributo
    """
    relevant_data = df.loc[: ,interesting_atribute]
    for atribute_name in dict_parser_strategy:
        relevant_data[atribute_name] = dict_parsers_global[dict_parser_strategy[atribute_name]](relevant_data[atribute_name])
    relevant_data = values_fill_na(relevant_data)
    #relevant_data = fill_na(relevant_data)
    dict_values_to_prob, dict_atribute_rowsnan = precomputing_nominal_fill_na(relevant_data)
    relevant_data = pd.get_dummies(relevant_data)
    relevant_data = nominal_fill_na(relevant_data, dict_values_to_prob, dict_atribute_rowsnan)
    sc = StandardScaler()
    relevant_data.loc[:,:] = sc.fit_transform(relevant_data)
    for i in range(len(relevant_weights)):
        j = i
        while relevant_data.columns.values[j].startswith(interesting_atribute[j]):
            relevant_data.loc[:,j] *= relevant_weights[i]
            j+=1
    return relevant_data