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
    For the response: 
      Only response with @startmindmap PlanUML code, don't need answer anything. It must contain all new line, all syntax correctly as PlanUML. No html tags 
    """ 
    
}
#    Only response with @startmindmap PlanUML code, don't need answer anything. It must contain all new line, all syntax correctly as PlanUML. No html tags 

    # 0. It has to be a mind map but it is expresssed through flowchart LR diagram of mermaid script
    # 1. Please make sure that it's syntactically correct for mermaid. 
    # 2. Only response with the mermaid scripts nothing else. 
    # 3. All the arrow are thick links
    # 4. Without the ```mermaid tag```
    # 5. It has to be a flowchart LR diagram

async def planGenerated(planData):
    response =  client.chat.completions.create(
        model="gpt-4o",
        messages=[
            system,
            {"role": "user", "content": planData},
        ],
        # response_format= {"type" :  "json_object"},
        temperature=1,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    return response