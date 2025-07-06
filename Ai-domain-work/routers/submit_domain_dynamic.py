from fastapi import APIRouter
from pydantic import BaseModel
import pyodbc

router = APIRouter()

conn_str = (
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=localhost;Database=fyp;UID=myuser;PWD=MySecurePass123;"
)

class AnswerInput(BaseModel):
    user_id: int
    domain_id: int
    answers: list[dict]  # [{"text": "...", "score": ...}]

@router.post("/submit-domain")
def submit_dynamic_domain(data: AnswerInput):
    total_score = sum(ans["score"] for ans in data.answers)
    table_name = f"Domain{data.domain_id}_Answer"

    column_names = []
    value_placeholders = []
    values = [data.user_id]

    for i, ans in enumerate(data.answers, start=1):
        column_names.append(f"ans{i}")
        column_names.append(f"ans{i}_score")
        value_placeholders.extend(["?", "?"])
        values.extend([ans["text"], ans["score"]])

    columns_sql = "User_id, " + ", ".join(column_names)
    placeholders_sql = ", ".join(["?"] * len(values))

    insert_sql = f"""
        INSERT INTO {table_name} ({columns_sql})
        VALUES ({placeholders_sql})
    """

    with pyodbc.connect(conn_str) as conn:
        cursor = conn.cursor()
        cursor.execute(insert_sql, values)
        conn.commit()

        # Fetch suggestion
        cursor.execute("""
            SELECT AnswerText FROM DomainAnswers
            WHERE DomainID = ? AND ScoreMin <= ? AND ScoreMax >= ?
        """, data.domain_id, total_score, total_score)
        row = cursor.fetchone()

    return {
        "message": f"Answers stored for Domain {data.domain_id}",
        "total_score": total_score,
        "suggestion": row[0] if row else "No suggestion found"
    }
