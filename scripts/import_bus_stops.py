import psycopg2
import csv


conn = psycopg2.connect(
    host="localhost", database="bus", user="postgres", password="postgres"
)

cursor = conn.cursor()

cursor.execute(
    "CREATE TABLE IF NOT EXISTS bus_stops (bus_id varchar(5), bus_short_name varchar(5), stop varchar(255), route_type integer, valid_from varchar(255), valid_until varchar(255));"
)


with open("../static_data/routes.csv", "r") as file:
    reader = csv.reader(file)
    headers = next(reader)
    # route_id,agency_id,route_short_name,route_long_name,route_desc,route_type,route_type2_id,valid_from,valid_until
    for row in reader:
        pass

conn.commit()
cursor.close()
conn.close()
print("done motherfucker asinfijdngd")
