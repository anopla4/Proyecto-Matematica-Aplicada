from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from main import main_action
from data_processing import to_dataFrame
from typing import List
from json import dumps
from kmean import get_groups_with_kmean
from metaheuristic_solution import run

app = FastAPI()

# file_location = "files/"
file_location = "files/1RO CC 2021.xlsx"

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/file")
async def upload_file(file: UploadFile = File(...)):
    global file_location
    if file_location != "files/":
        file_location = "files/"
    file_location += f"{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
        file_object.close()
    return to_dataFrame(file_location).to_json()


@app.post("/groups")
def group_processing(
    subset: dict,
    types: dict,
    method = "kmean"
):
    """
    subset -> dicc de la forma #sub(int)-> Obj donde:
        Obj = {
            numberOfGroups:int  -> # de grupos de este subgupo
            students:list[int] -> estudiantes que forman parte de este subgrupo
            attributes:list[Tuple[string,float]] -> atributos relevantes para homogeneizar
                                                    el subgupo y sus pesos respectivos
        }
    types  -> diccionario con el tipo de datos de cada atributo para el parser
    """
    group_performing = get_groups_with_kmean
    if method == "metaheuristic":
        group_performing = run
    groups = main_action(
        file_path=file_location,
        subset=subset,
        types= types,
        group_performing= group_performing
    )
    return dumps(groups)
