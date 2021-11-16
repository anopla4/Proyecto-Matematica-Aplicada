import pandas as pd
import numpy as np
from data_processing import data_performing
from kmean import Get_Groups_with_kmean

data = pd.read_excel("1RO CC 2021.xlsx")
names = np.array(data["Nombre"] + " " + data["Apellidos"])

data_transf = data_performing(
    data,
    [
        "Provincia",
        "Municipio",
        "Situación académica",
        "Fuente de Ingreso",
        "Organización política",
        "Sexo",
        "Color de la piel",
        "Edad",
    ],
    [1, 1, 1, 1, 1, 1, 1, 1],
    {"Municipio": "municipality_raw_parser"},
)

groups = Get_Groups_with_kmean(data_transf, 6)
aux = 0
for i, group in enumerate(groups):
    m = 0
    f = 0
    becados = 0
    comunistas = 0
    print(f"Grupo {i+1}")
    for number in group:
        if data["Sexo"][number] == "Masculino":
            m += 1
        else:
            f += 1
        if data["Provincia"][number] != "La Habana":
            becados += 1
        if data["Organización política"][number] == "UJC":
            comunistas += 1
        print(names[number])
    print(f"{m} Hombres")
    print(f"{f} Mujeres")
    print(f"{becados} Becados")
    print(f"{comunistas} UJC")
