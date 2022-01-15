from fastapi import FastAPI, UploadFile, File
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from main import main_action
from data_processing import to_dataFrame
from json import dumps
from kmean import get_groups_with_kmean
from metaheuristic_solution import run
import os
from typing import Optional
from pydantic import BaseModel


class Item(BaseModel):
    subset: dict
    types: dict
    method: str


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


@app.get("/")
async def root():
    html_content = """
    <html>
        <head>
            <title>kgruposapi</title>
        </head>
        <body>
            <div>
                <h1>Wellcome to kgruposapi, the Api part of the project Kgrupos</h1>
            </div>
            <div>
                <span></span>
                <a href="https://github.com/anoppa/Proyecto-Matematica-Aplicada/tree/main/backend">Source code</a>
            </div>
            <div>
                <p>See documentation <a href="/docs">here</a></p> 
                <p>See alternative documentation <a href="/redoc">here</a></p>
            </div>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)


def __clean_files():
    for f in os.listdir(file_location):
        os.remove(os.path.join(file_location, f))


@app.post("/file")
async def upload_file(file: UploadFile = File(...)):
    global file_location
    if file_location != "files/":
        file_location = "files/"
        # __clean_files()
    file_location += f"{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
        file_object.close()
    return to_dataFrame(file_location).to_json()


@app.post("/groups")
def group_processing(item: Item):
    """
    subset -> dicc de la forma #sub(int)-> Obj donde:
        Obj = {
            numberOfGroups:int  -> # de grupos de este subgrupo
            students:list[int] -> estudiantes que forman parte de este subgrupo
            attributes:list[Tuple[string,float]] -> atributos relevantes para homogeneizar
                                                    el subgrupo y sus pesos respectivos
        }
    types  -> diccionario con el tipo de datos de cada atributo para el parser
    """
    subset = item.subset
    types = item.types
    method = item.method
    if method == "kmean":
        group_performing = get_groups_with_kmean
    elif method == "metaheuristic":
        group_performing = run
    else:
        return None
    groups = main_action(
        file_path=file_location,
        subset=subset,
        types=types,
        group_performing=group_performing,
    )
    return dumps(groups)
