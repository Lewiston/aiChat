import psycopg2
import os

from dotenv import load_dotenv

load_dotenv()


conn = psycopg2.connect(
    host=os.getenv("db_host"),
    database=os.getenv("db_name"),
    user=os.getenv("db_user"),
    password=os.getenv("db_pass"),
    port=os.getenv("db_port"),
    sslmode='require'
)

cursor = conn.cursor()

cursor.execute("select 1;")

result = cursor.fetchone()

print(result)
