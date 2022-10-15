import psycopg2
import csv


conn = psycopg2.connect(
    host="localhost", database="bus", user="postgres", password="postgres"
)

cursor = conn.cursor()

cursor.execute(
    "CREATE TABLE IF NOT EXISTS stops (stop_id integer, stop_code varchar(50), stop_name varchar(255), stop_lat varchar(255), stop_lon varchar(255));"
)

with open("../static_data/stops.csv", "r") as file:
    reader = csv.reader(file)
    headers = next(reader)
    # ['stop_id', 'stop_code', 'stop_name', 'stop_lat', 'stop_lon']
    for row in reader:
        query = f"INSERT INTO stops VALUES({row[0]}, '{row[1]}', '{row[2]}', '{row[3]}', '{row[4]}');"
        cursor.execute(query)

conn.commit()
cursor.close()
conn.close()
print("done motherfucker asinfijdngd")
