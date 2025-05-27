"""
CPUUsage --> 
    the main logic here, 
    takes ip_address, time_period, interval as arguments, and as output will provide cpu usage. 
    according to the params(from the task details - an EC2 instance), this class handles the data manipuldation. 
    will not use any DB/cache for this project
    
    returns -->
        using cloudWatch --> MetricName=CPUUtilization(from AWS api's doc)
        returns a dict with the 'get_metric_statistics()' responses data
        
"""

import boto3
import os
from dotenv import load_dotenv
from .validators import date_formatter

load_dotenv()

keys = { 
        'AWS_ACCESS_ID': os.getenv('AWS_ACCESS_ID'), 
        'SECRET_ACCESS_KEY': os.getenv('SECRET_ACCESS_KEY'), 
        'REGION': os.getenv('REGION'),
        'IP_ADDRESS': os.getenv('IP_ADDRESS')
    }

class CPUUsage: 
    def __init__(self, **fields):
        self.__cpu_data = {}
        self.__cpu_data['InstanceId'] = self.handle_ip(fields.get('ip_address'))
            
    # provided ip as default, return the InstanceId  
    def handle_ip(self, ip_address=keys['IP_ADDRESS']) -> str | None:
        ec2_instance = boto3.client(
            'ec2',
            aws_access_key_id=keys['AWS_ACCESS_ID'],
            aws_secret_access_key=keys['SECRET_ACCESS_KEY'],
            region_name=keys['REGION']
        )
        reservations = ec2_instance.describe_instances()['Reservations']        
        instances = [
            instance
            for reservation in reservations
            for instance in reservation['Instances']
        ]

        for instance in instances:
            if 'PrivateIpAddress' in instance and instance['PrivateIpAddress'] == ip_address:
                instance_id = instance['InstanceId']
                print(instance_id)
                return instance_id

        print("No instance found with IP:", ip_address)
        return None

    def measure_cpu_usage(self, input_time_period=None, interval: int=300) -> dict:
        start_time, end_time = date_formatter(input_time_period)    
        cloud_watch_client = boto3.client(
            'cloudwatch',
            aws_access_key_id = keys['AWS_ACCESS_ID'],
            aws_secret_access_key = keys['SECRET_ACCESS_KEY'],
            region_name = keys['REGION']      
        )
        
        points_data = cloud_watch_client.get_metric_statistics(
            Namespace = 'AWS/EC2',
            MetricName = 'CPUUtilization',
            Dimensions=[
                {
                    'Name': 'InstanceId',
                    'Value': self.__cpu_data['InstanceId']
                }
            ],
            StartTime = start_time, 
            EndTime = end_time,
            Period = interval,  
            Statistics = ['Average'],
            Unit = 'Percent'
        )
        
        # organizing data before returns as response 
        
        datapoints = sorted(points_data.get("Datapoints", []), key=lambda x: x["Timestamp"])
        timestamps = [point["Timestamp"].isoformat() for point in datapoints]
        averages = [point["Average"] for point in datapoints]

        # and suppose we will display it in the FE (with chartjs), this is kind of "suite" structure to work with 
        return {
            "label": "CPUUtilization",
            "labels": timestamps,
            "data": averages,
            "unit": "Percent"
        }

