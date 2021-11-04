
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
