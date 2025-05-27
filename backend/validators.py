from datetime import datetime, timedelta

def date_formatter(time_input):
    todays_date_index = datetime.utcnow()
    if time_input is None:
        time_input = todays_date_index - timedelta(days=1)
    
    return time_input, todays_date_index

