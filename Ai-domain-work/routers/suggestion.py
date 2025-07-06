from fastapi import APIRouter
from pydantic import BaseModel
import pyodbc

router = APIRouter()

conn_str = (
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=localhost;"      # apne SQL Server ka naam yahan lagayen
    "Database=fyp;"   # apne DB ka naam
    "UID=myuser;"          # apne DB username
    "PWD=MySecurePass123;"      # apne DB password
)

class UserDomainInput(BaseModel):
    user_id: int
    domain_id: int  # 1 to 12

@router.post("/get-domain-suggestion")
def get_domain_suggestion(data: UserDomainInput):
    with pyodbc.connect(conn_str) as conn:
        cursor = conn.cursor()

        table_name = f"Domain{data.domain_id}_Answer"

        score_columns = [f"ans{i}_score" for i in range(1, 16)]  # assume 15 Qs per domain
        score_sum_sql = " + ".join(score_columns)

        query = f"""
            SELECT TOP 1 ({score_sum_sql}) as TotalScore
            FROM {table_name}
            WHERE User_id = ?
            ORDER BY id DESC
        """

        cursor.execute(query, data.user_id)
        row = cursor.fetchone()
        if not row:
            return {"error": "No answers found for this user and domain"}

        total_score = row.TotalScore

        cursor.execute("""
            SELECT AnswerText FROM DomainAnswers
            WHERE DomainID = ? AND ScoreMin <= ? AND ScoreMax >= ?
        """, data.domain_id, total_score, total_score)
        suggestion_row = cursor.fetchone()

        return {
            "total_score": total_score,
            "suggestion": suggestion_row[0] if suggestion_row else "No suggestion found"
        }
