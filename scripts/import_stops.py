import psycopg2
import requests
from bs4 import BeautifulSoup
import csv


conn = psycopg2.connect(
    host="localhost", database="bus", user="postgres", password="postgres"
)

cursor = conn.cursor()

cursor.execute(
    "CREATE TABLE IF NOT EXISTS stops (stop_id integer, stop_code varchar(50), stop_name varchar(255), stop_lat varchar(255), stop_lon varchar(255), buses TEXT);"
)


list_url = "https://www.wroclaw.pl/komunikacja/rozklady-jazdy"


list_html = requests.get(list_url)
document = BeautifulSoup(list_html.text, "html.parser")

buses: list[BeautifulSoup] = document.find_all("li", attrs={"class": "busTimetableElement"})

stops = {}

for bus in buses:
    a: BeautifulSoup = bus.find("a")
    bus_name = a.find("span", attrs={"class": "tramNr"}).text

    stops_html = requests.get(a.attrs["href"])
    document = BeautifulSoup(stops_html.text, "html.parser")

    accordions: list[BeautifulSoup] = document.find_all("div", attrs={"class": "accordionContent"})

    for acc in accordions:
        stop = acc.find("a", attrs={"class": "label"}).text.strip().lower()

        if stop not in stops:
            stops[stop] = set()

        stops[stop].add(bus_name)
        print(stop)

print(stops)

with open("../static_data/stops.csv", "r") as file:
    reader = csv.reader(file)
    headers = next(reader)
    # ['stop_id', 'stop_code', 'stop_name', 'stop_lat', 'stop_lon']
    for row in reader:
        stop_name = row[2].lower()
        if stop_name not in stops:
            stops[stop_name] = []

        buses = ";".join(stops[stop_name])

        query = f"INSERT INTO stops VALUES({row[0]}, '{row[1]}', '{row[2]}', '{row[3]}', '{row[4]}','{buses}');"
        cursor.execute(query)

conn.commit()
cursor.close()
conn.close()
print("done motherfucker asinfijdngd")
