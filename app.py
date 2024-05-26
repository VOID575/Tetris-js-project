from flask import Flask, render_template
from flask_cors import CORS
from markupsafe import escape

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return render_template("Tetris_main.html")

if __name__ == "__main__" :
    app.run(debug=True, host='0.0.0.0', port=8000)

