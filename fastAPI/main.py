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


html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
        <link rel="stylesheet" type="text/css" href="style/style.css">
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var ws = new WebSocket("ws://lfreeze.ml:80/API/ws");
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""

@app.route("/API")
class Homepage(HTTPEndpoint):
    async def get(self, request):
        return HTMLResponse(html)

@app.get("/API/test/{chords}")
def get(chords: str):
    # arr = ['1', '2', '3']

    cStr = (" ").join(chords.split(" "))
    print(cStr)

    # process = subprocess.run(['/fastAPI/test.sh', cStr], check=True, stdout=subprocess.PIPE, universal_newlines=True)
    
    process = subprocess.run(['/magenta/runImprov.sh', cStr], check=True, stdout=subprocess.PIPE, universal_newlines=True)
    output = process.stdout
    return PlainTextResponse(output)

    # def post


@app.websocket_route("/API/ws")
class Echo(WebSocketEndpoint):
 
    encoding = "text" 

    async def on_receive(self, websocket, data):
        await websocket.send_text(f"Message text was: {data}")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3000, root_path="")