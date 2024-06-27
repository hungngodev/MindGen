from flask import Flask, jsonify
print("Hello, World!")

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/api/hello")
def api_hello():
    return jsonify({"message": "Hello, World"})



if __name__ == "main":
    app.run(debug=True)
    