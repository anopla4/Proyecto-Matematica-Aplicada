from data_processing import DataProcessor, to_dataFrame
from kmean import get_groups_with_kmean
from metaheuristic_solution import run, func

def main_action(
    file_path: str,
    subset: dict,
    dataProcessor: DataProcessor = DataProcessor(),
    group_performing = get_groups_with_kmean,
    types: dict = None
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
    group_performing -> función para formar los grupos
        por defecto kmean será aplicado
        group_performing -> recibe un DataFrame, y la cantidad de grupos
                            retorna un list[list[int]] con los grupos
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
        relevant_data = dataProcessor.data_performing(data.loc[students, [k for k, _ in attr]])
        data_w = dataProcessor.data_weighted(relevant_data, attr)
        groups = group_performing(data_w, num_gr)
        subgroups[sub] = {}
        for g in range(len(groups)):
            subgroups[sub][g] = groups[g]

    return subgroups