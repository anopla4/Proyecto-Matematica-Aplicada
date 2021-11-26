from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from main import main_action
from data_processing import to_dataFrame
from typing import List

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
    types: dict
    # sub_groups_specifications: dict = {},
    # relevants_feature: list = [],
    # weights: List[float] = [],
    # dict_parser_strategy: dict = {},
):
    """
    sub_groups_specifications-> diccionario donde se definen las condiciones de los subgrupos
    relevants_feature-> nombre de los feature a tener en cuenta para la distrbución de los grupos
    weights-> peso de esos atributos relevantes dentro de la distribución
    dict_parser_strategy -> indica el tipo de parser a ejcutar sobre un atributo
    """
    groups = main_action(
        file_location,
        subset,
        types
        # sub_groups_specifications,
        # relevants_feature,
        # weights,
        # dict_parser_strategy,
    )
    return groups
