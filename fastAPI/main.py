from fastapi import FastAPI
from starlette.routing import Route, Router, Mount
from starlette.staticfiles import StaticFiles
from starlette.responses import HTMLResponse, PlainTextResponse, FileResponse
from starlette.applications import Starlette
from starlette.endpoints import WebSocketEndpoint, HTTPEndpoint
import time
import random
import uvicorn
import subprocess

app = FastAPI()

@app.get("/API/test/{chords}")
def get(chords: str):

    # cStr = (" ").join(chords.split(" "))
    # print(cStr)
    
    process = subprocess.run(['/magenta/runImprov.sh', chords], check=True, stdout=subprocess.PIPE, universal_newlines=True)
    output = process.stdout
    return PlainTextResponse(output)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3000, root_path="")