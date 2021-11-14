import pandas as pd
from sklearn.preprocessing import StandardScaler
import numpy as np
from random import random


def fill_na(data):
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
            dict_values_to_freq[feature][value] = dict_values_to_freq[feature][
                value
            ] / (len(data) - data[feature].isna().sum())
        for i, row in data.iterrows():
            if pd.isna(row[feature]):
                u = random()
                acc_prob = 0
                for value in dict_values_to_freq[feature]:
                    acc_prob += dict_values_to_freq[feature][value]
                    if u <= acc_prob:
                        data.loc[i, feature] = value
                        break
    return data


def municipality_raw_parser(municipality_column):
    """
    Otorga un nombre standard a los municipios
    a los municipios fuera de la habana les otorgo el valor: habana del este
    """
    dict_munic = {
        "plaza de la revolucion": "plaza de la revoución",
        "plaza de la revoución": "plaza de la revoución",
        "plaza": "plaza de la revolucion",
        "centro habana": "centro habana",
        "habana vieja": "habana vieja",
        "playa": "playa",
        "cerro": "cerro",
        "marianao": "marianao",
        "diez de octubre": "diez de octubre",
        "10 de octubre": "diez de octubre",
        "la lisa": "la lisa",
        "boyero": "boyeros",
        "boyeros": "boyeros",
        "arroyo naranjo": "arroyo naranjo",
        "san miguel": "san miguel del padrón",
        "san miguel del padron": "san miguel del padrón",
        "san miguel del padrón": "san miguel del padrón",
        "cotoro": "cotoro",
        "guanabacoa": "guanabacoa",
        "habana del este": "habana del este",
    }
    result = []
    for munc in municipality_column:
        if munc.lower() not in dict_munic:
            munc = "habana del este"
        result.append(dict_munic[munc.lower()])
    return result


def municipality_parser_universityDistance(municipality_column):
    """
    Realiza un primer municipality_parser_raw, y luego
    Otorga un valor standard a los municipios segun su cercania con la universidad
    """
    dict_munic = {
        "plaza de la revoución": 0,
        "centro habana": 1,
        "habana vieja": 2,
        "playa": 2,
        "cerro": 2,
        "marianao": 3,
        "diez de octubre": 3,
        "la lisa": 4,
        "boyeros": 4,
        "arroyo naranjo": 4,
        "san miguel del padrón": 5,
        "cotoro": 5,
        "guanabacoa": 5,
        "habana del este": 5,
    }
    result = []
    for munc in municipality_raw_parser(municipality_column):
        if munc.lower() not in dict_munic:
            munc = "habana del este"
        result.append(dict_munic[munc.lower()] / 6)
    return result


dict_parsers_global = {
    "municipality_raw_parser": municipality_raw_parser,
    "municipality_parser_universityDistance": municipality_parser_universityDistance,
}


def data_performing(df, interesting_atribute, relevant_weights, dict_parser_strategy):
    """
    df-> data frama de pandas(data de entrada completa)
    interesting_atribute-> lista con el nombre de los atributos relevantes
    relevant_weights -> relevancia de los atributos de interes
    dict_parser_strategy -> donde se indica el tipo de parser a ejcutar sobre un atributo
    """
    relevant_data = df.loc[:, interesting_atribute]
    for atribute_name in dict_parser_strategy:
        relevant_data[atribute_name] = dict_parsers_global[
            dict_parser_strategy[atribute_name]
        ](relevant_data[atribute_name])
    relevant_data = fill_na(relevant_data)
    relevant_data = pd.get_dummies(relevant_data)
    header = relevant_data.columns.values
    sc = StandardScaler()
    relevant_data = pd.DataFrame(sc.fit_transform(relevant_data))
    relevant_data.columns = header
    for i in range(len(relevant_weights)):
        j = i
        while relevant_data.columns.values[j].startswith(interesting_atribute[j]):
            relevant_data.loc[:, j] *= relevant_weights[i]
            j += 1
    return relevant_data
