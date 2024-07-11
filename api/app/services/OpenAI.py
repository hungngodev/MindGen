from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()
client = OpenAI(
    api_key= os.getenv("OPENAI_API_KEY")
)
system ={
    "role": "system",
    "content":"""You are an assistant specializing in creating detailed mindmaps to help users achieve their goals.
    Your expertise includes breaking down complex tasks into manageable steps, identifying key priorities, and providing actionable advice to ensure users stay on track. 
    Success metrics include achieving clear, manageable steps, meeting defined goals and milestones, receiving positive user feedback, and effective problem-solving outcomes. 
    Only response with @startmindmap PlanUML code, don't need answer anything
    You must output JSON"""
    
}
def planGenerated(planData):
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
    return planGenerated