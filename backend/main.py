from typing import DefaultDict
from collections import defaultdict
import pandas as pd
import numpy as np
from data_processing import data_performing, data_weighted, to_dataFrame
from kmean import get_groups_with_kmean
from metaheuristic_solution import run, func
from typing import List


def main_action(
    file_path: str,
    subset: dict,
    types: dict
    # sub_groups_specifications: dict,
    # relevants_feature: list,
    # weights: List[float],
    # dict_parser_strategy: dict = {},
):
    """
    Ejecuta la distribución de los grupos según los parámetros especificados
    Retorna una lista de listas con los grupos
    """
    data = to_dataFrame(file_path)

    result = []
    # data_perf = data_performing(data)
    for sub, obj in subset.items():
        num_gr = int(obj["numberOfGroups"])
        students = obj["students"]
        attr = obj["attributes"]
        relevant_data = data_performing(data.loc[students, [k for k, _ in attr]])
        data_w = data_weighted(relevant_data, attr)
        groups_kmean = get_groups_with_kmean(data_w, num_gr)
        result.append(groups_kmean)

    return result

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
    groups_kmean = get_groups_with_kmean(data_transf, 6)
    print(evaluate_kmean_solution(groups_kmean, data_transf))
    groups_met_sol = run(data_transf, 6)
    print(groups_met_sol[1])
    groups_met = [groups_met_sol[0][i] for i in groups_met_sol[0]]
    aux = 0
    for i, group in enumerate(groups_kmean):
        m = 0
        f = 0
        becados = 0
        comunistas = 0
        skin_color = defaultdict(int)
        politics_organization = defaultdict(int)
        access_type = defaultdict(int)
        province = defaultdict(int)
        for number in group:
            if data["Sexo"][number] == "Masculino":
                m += 1
            else:
                f += 1
            if data["Provincia"][number] != "La Habana":
                becados += 1
            if data["Organización política"][number] == "UJC":
                comunistas += 1
            skin_color[data["Color de la piel"][number]] += 1
            politics_organization[data["Organización política"][number]] += 1
            access_type[data["Fuente de Ingreso"][number]] += 1
            province[data["Provincia"][number]] += 1

        print(f"Grupo {i+1}")
        print(f"{m} Hombres")
        print(f"{f} Mujeres")
        print(f"{becados} Becados")
        print(f"{comunistas} UJC")
        print(f"Color de la piel {skin_color}")
        print(f"Organización política {politics_organization}")
        print(f"Fuente de ingreso {access_type}")
        print(f"Provincia {province}")

    for i, group in enumerate(groups_met):
        m_1 = 0
        f_1 = 0
        becados_1 = 0
        comunistas_1 = 0
        skin_color_1 = defaultdict(int)
        politics_organization_1 = defaultdict(int)
        access_type_1 = defaultdict(int)
        province_1 = defaultdict(int)
        for number in group:
            if data["Sexo"][number] == "Masculino":
                m_1 += 1
            else:
                f_1 += 1
            if data["Provincia"][number] != "La Habana":
                becados_1 += 1
            if data["Organización política"][number] == "UJC":
                comunistas_1 += 1
            # print(number)
            skin_color_1[data["Color de la piel"][number]] += 1
            politics_organization_1[data["Organización política"][number]] += 1
            access_type_1[data["Fuente de Ingreso"][number]] += 1
            province_1[data["Provincia"][number]] += 1

        print(f"Grupo {i+1}")
        print(f"{m_1} Hombres")
        print(f"{f_1} Mujeres")
        print(f"{becados_1} Becados")
        print(f"{comunistas_1} UJC")
        print(f"Color de la piel {skin_color_1}")
        print(f"Organización política {politics_organization_1}")
        print(f"Fuente de ingreso {access_type_1}")
        print(f"Provincia {province_1}")

    return groups_kmean


def evaluate_kmean_solution(groups, data):
    sol = [0] * (max([max(item) for item in groups]) + 1)
    for g, item in enumerate(groups):
        for s in item:
            sol[s] = g
    return func(sol, data.to_numpy(), len(groups))
