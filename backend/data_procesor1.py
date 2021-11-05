import pandas as pd
from sklearn.preprocessing import StandardScaler


def municipality_parser_universityDistance(municipality_column):
    dict_munic = {"plaza de la revolucion" : 0,
                    "plaza de la revoución" : 0,
                    "plaza": 0,
                    "centro habana":1,
                    "habana vieja":2,
                    "playa":2,
                    "cerro":2,
                    "marianao":3,
                    "diez de octubre": 3,
                    "10 de octubre"
                    "la lisa": 4,
                    "boyeros":4, 
                    "arroyo naranjo": 4,
                    "san miguel": 4,
                    "san miguel del padron":5,
                    "san miguel del padrón":5,
                    "cotoro":5,
                    "guanabacoa":5,
                    "habana del este":5}
    result = []
    for munc in municipality_column:
        result.append(dict_munic[munc.lower()]/6)
    return result

dict_parsers_global = {"municipality_parser_universityDistance": municipality_parser_universityDistance()}


def data_performing(df, interesting_atribute, weights, dict_parser_strategy):
    """
    df-> data frama de pandas(data de entrada completa)
    interesting_atribute-> lista booleana(True los atributos relevantes)
    weitght -> relevancia de los atributos(0 los no relevantes)
    """
    relevant_data = df.loc[: ,interesting_atribute]
    for atribute_name in dict_parser_strategy:
        relevant_data[atribute_name] = dict_parsers_global[dict_parser_strategy[atribute_name]](relevant_data[atribute_name])
    relevant_weights = weights[interesting_atribute]
    relevant_data = pd.get_dummies(relevant_data)
    sc = StandardScaler()
    relevant_data[:,:] = sc.fit_transform(relevant_data[:,:])
    for i in range(len(relevant_weights)):
        relevant_data.loc[:,i] *= relevant_weights[i]
    return relevant_data

