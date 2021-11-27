from data_processing import data_performing, data_weighted, to_dataFrame
from kmean import get_groups_with_kmean
from metaheuristic_solution import run, func

def main_action(
    file_path: str,
    subset: dict,
    types: dict
):
    """
    file_path -> localización del archivo de datos
    subset -> dicc de la forma #sub(int)-> Obj donde:
        Obj = {
            numberOfGroups:int  -> # de grupos de este subgupo
            students:list[int] -> estudiantes que forman parte de este subgrupo
            attributes:list[Tuple[string,float]] -> atributos relevantes para homogeneizar
                                                    el subgupo y sus pesos respectivos
        }
    types  -> diccionario con el tipo de datos de cada atributo para el parser
    Ejecuta la distribución de los grupos según los parámetros especificados
    Retorna un diccionario con la configuación de los subgrupos y sus grupos correspondientes
    """
    data = to_dataFrame(file_path)
    subgroups = {}
    for sub, obj in subset.items():
        num_gr = int(obj["numberOfGroups"])
        students = obj["students"]
        attr = obj["attributes"]
        relevant_data = data_performing(data.loc[students, [k for k, _ in attr]])
        data_w = data_weighted(relevant_data, attr)
        groups_kmean = get_groups_with_kmean(data_w, num_gr)
        #groups_met = run(data_w, num_gr)
        subgroups[sub] = {}
        for g in range(len(groups_kmean)):
            subgroups[sub][g] = groups_kmean[g]

    return subgroups