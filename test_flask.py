from flask import Flask, render_template
from flask_cors import CORS
from markupsafe import escape

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return render_template("Tetris_main.html")

@app.route("/<name>")
def user(name):
    return f"Hello {name}"

if __name__ == "__main__" :
    app.run(debug=True, host='127.0.0.1', port=5000)

