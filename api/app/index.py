from flask import Flask, jsonify, redirect, url_for, request, render_template, session
from dotenv import load_dotenv
from openai import OpenAI
from flask_sqlalchemy import SQLAlchemy
import os

load_dotenv()
client = OpenAI(
    api_key= os.getenv("OPENAI_API_KEY")
)

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///' + os.path.join(basedir, 'map-gen.db')

db = SQLAlchemy(app)

class RequestTable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    def __init__(self) -> None:
        super().__init__()

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/api/hello")
def api_hello():
    return jsonify({"message": "Hello, World"})


system ={
    "role": "system",
    "content":"""You are an assistant specializing in creating detailed mindmaps to help users achieve their goals.
    Your expertise includes breaking down complex tasks into manageable steps, identifying key priorities, and providing actionable advice to ensure users stay on track. 
    Success metrics include achieving clear, manageable steps, meeting defined goals and milestones, receiving positive user feedback, and effective problem-solving outcomes. 
    Only response with @startmindmap PlanUML code, don't need answer anything
    You must output JSON"""
    
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
            model="gpt-4o",
            messages=[
                system,
                {"role": "user", "content": planData},
            ],
            response_format= {"type" :  "json_object"},
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        planGenerated = response.choices[0].message.content
        app.logger.info("This is the plan generated" ,  planGenerated)
    
        return jsonify({"message": planGenerated})
    
if __name__ == "main":
    db.create_all()
    print("SIUUUUUUUUUUU")
    app.run(debug=True)
    