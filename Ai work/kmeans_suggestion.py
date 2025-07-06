

from fastapi import FastAPI, HTTPException, Query
import pyodbc
import pandas as pd
from sklearn.cluster import KMeans
from fastapi.middleware.cors import CORSMiddleware
import random  # ✅ For random.sample()

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB Connection
def get_db_connection():
    conn_str = (
        'DRIVER={SQL Server};'
        'SERVER=localhost;'
        'DATABASE=fyp;'
        'UID=myuser;'
        'PWD=MySecurePass123;'
    )
    return pyodbc.connect(conn_str)

# Domain Names
domain_names = [
    "Security Awareness & Safe Practices and Verification",
    "Device Security",
    "Passwords & Authentication",
    "Password Generation",
    "Password Management",
    "Account and Data Securement",
    "Data Protection & Backup",
    "Software Updates and System Maintenance",
    "Proactive Awareness",
    "Perceived Severity (PS)",
    "Perceived Barriers (PB)",
    "Quality Trends in Cybersecurity Behavioral Research"
]

# Domain Templates (dummy training data)
domain_templates = pd.DataFrame([
    [2,3,1,0,3,2,1,0,2,1,3,1,2,1,2,0,1,1,2,3],
    [1,2,2,2,1,1,0,0,1,1,2,0,1,2,1,2,1,0,2,2],
    [3,2,0,1,3,2,1,0,3,2,1,1,3,2,2,1,0,0,1,1],
    [2,1,1,1,2,2,2,1,1,1,2,1,2,1,2,1,1,1,1,1],
    [1,3,0,0,1,1,2,1,0,0,2,0,2,1,1,1,0,1,2,0],
    [0,2,3,3,1,2,2,2,3,1,3,2,2,3,1,2,1,2,2,2],
    [2,1,2,0,1,0,1,0,2,1,2,1,1,2,1,1,0,0,2,1],
    [1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [2,3,3,2,3,3,3,2,2,3,3,2,2,2,3,2,3,2,3,2],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
], columns=[f'q{i}' for i in range(1, 21)])

# Keep original index for reverse lookup
domain_templates['domain_index'] = domain_templates.index

# Train KMeans model
kmeans = KMeans(n_clusters=3, random_state=42)
kmeans.fit(domain_templates.iloc[:, :-1])
domain_templates['cluster'] = kmeans.labels_

# --- Domain Suggestion API ---
@app.get("/suggest-domains/")
def suggest_domains(user_id: int = Query(..., description="User ID for domain suggestion")):
    try:
        conn = get_db_connection()
        query = """
            SELECT
                ans1_score, ans2_score, ans3_score, ans4_score, ans5_score,
                ans6_score, ans7_score, ans8_score, ans9_score, ans10_score,
                ans11_score, ans12_score, ans13_score, ans14_score, ans15_score,
                ans16_score, ans17_score, ans18_score, ans19_score, ans20_score
            FROM Userknow_Answer
            WHERE User_id = ?
        """
        user_scores_df = pd.read_sql(query, conn, params=[user_id])
        conn.close()

        if user_scores_df.empty:
            raise HTTPException(status_code=404, detail="User scores not found")

        # User input scores
        user_scores = user_scores_df.iloc[0].tolist()

        # Predict user's cluster
        user_cluster = kmeans.predict([user_scores])[0]

        # Get all domains from that cluster
        matched = domain_templates[domain_templates['cluster'] == user_cluster]

        # Randomly select 3 domain indexes from the matched cluster
        selected_indices = random.sample(list(matched['domain_index']), k=3)

        # Map to domain names
        suggestions = [domain_names[idx] for idx in selected_indices]

        return {
            "user_cluster": int(user_cluster),
            "suggested_domains": suggestions
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
