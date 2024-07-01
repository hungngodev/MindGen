from flask import Flask, jsonify, redirect, url_for, request, render_template, session
from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()
client = OpenAI(
    api_key= os.getenv("OPENAI_API_KEY")
)
print(os.getenv("OPENAI_API_KEY"))
app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/api/hello")
def api_hello():
    return jsonify({"message": "Hello, World"})


system ={
    "role": "system",
    "content":"You are an assistant specializing in creating detailed mindmaps."
}

@app.route('/api/plan', methods=['GET', 'POST'])
def api_plan():
    if request.method == 'GET':
        print("get")
        return jsonify({"message": "GET method"})
    elif request.method == 'POST':
        jsonData = request.get_json();
        planData = jsonData['plan']
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=[
                system,
                {"role": "user", "content": planData},
            ],
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        planGenerated = response.choices[0].message
        app.logger.info(planGenerated)
        app.logger.info(response)
        return jsonify({"message": planGenerated})
    
if __name__ == "main":
    app.run(debug=True)
    