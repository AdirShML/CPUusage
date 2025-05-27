from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from .cpu_usage import CPUUsage
from datetime import datetime
import os
from typing import Optional
from dotenv import load_dotenv

################  some configs ####################

load_dotenv()
app = FastAPI()

keys = { 
        'AWS_ACCESS_ID': os.getenv('AWS_ACCESS_ID'), 
        'SECRET_ACCESS_KEY': os.getenv('SECRET_ACCESS_KEY'), 
        'REGION': os.getenv('REGION'),
        'IP_ADDRESS': os.getenv('IP_ADDRESS')
    }

origins = [  
    "http://localhost:5173" # since my frontend is on Vite   
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
################ the EP for this project ####################
@app.get("/")
def index(
    address: Optional[str] = Query(default=keys['IP_ADDRESS']),
    time_period: Optional[datetime] = Query(default=None),
    interval: int = Query(default=300)
    ) -> dict:
    test = CPUUsage(ip_address=address)
    response = test.measure_cpu_usage(time_period, interval)
    return { "data": response }
    