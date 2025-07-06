from fastapi import APIRouter
import pyodbc

router = APIRouter()

conn_str = (
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=localhost;Database=YourDB;UID=YourUser;PWD=YourPass;"
)

@router.get("/get-questions/{domain_id}")
def get_questions(domain_id: int):
    with pyodbc.connect(conn_str) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT FactorID FROM Factors WHERE DomainID = ?", domain_id)
        factor_ids = [row[0] for row in cursor.fetchall()]
        if not factor_ids:
            return {"questions": []}
        placeholders = ','.join(['?'] * len(factor_ids))
        cursor.execute(f"""
            SELECT QuestionID, QuestionText FROM Questions
            WHERE FactorID IN ({placeholders})
        """, *factor_ids)
        questions = [{"id": row[0], "text": row[1]} for row in cursor.fetchall()]
        return {"questions": questions}
