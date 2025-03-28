import faiss
import pickle
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer

# -------------------------------
# Step 1: Load FAISS index and filename mapping
# -------------------------------
index = faiss.read_index("faiss_index.index")
with open("index_to_filename.pkl", "rb") as f:
    filenames = pickle.load(f)

# -------------------------------
# Step 2: Load resume_data.csv to get additional resume details (content)
# -------------------------------
resume_df = pd.read_csv("resume_data.csv")  # Must contain 'filename' and 'content' columns
# Build a dictionary for easy lookup: filename -> resume text
resume_dict = {row['filename']: str(row['content']) for _, row in resume_df.iterrows()}

# -------------------------------
# Step 3: Initialize the SentenceTransformer model
# -------------------------------
model = SentenceTransformer('all-MiniLM-L6-v2')

# -------------------------------
# Step 4: Define the job description (JD) for the Data Analyst role
# -------------------------------
job_description = (
    "Data Analyst with at least 3 years of experience. "
    "Proficient in SQL, Python, and data visualization tools (e.g., Tableau, Power BI). "
    "Able to transform raw data into actionable insights and communicate findings clearly."
)

# -------------------------------
# Step 5: Create a normalized embedding for the JD
# -------------------------------
query_embedding = model.encode([job_description], convert_to_numpy=True)
query_embedding = query_embedding / np.linalg.norm(query_embedding, axis=1, keepdims=True)

# -------------------------------
# Step 6: Retrieve top k candidates using FAISS
# -------------------------------
k = 15
similarities, indices = index.search(query_embedding, k)

# -------------------------------
# Step 7: Define a basic keyword matching function
# -------------------------------
keywords = ['data analyst', 'sql', 'python', 'tableau', 'power bi', 'excel', 'analytics', 'etl']

def compute_keyword_score(text, keywords_list):
    """
    Computes a simple score based on the frequency of each keyword in text.
    """
    score = 0
    if text:
        text_lower = text.lower()
        for kw in keywords_list:
            # Using count; you may enhance this with word-boundary regex if needed.
            count = text_lower.count(kw)
            score += count
    return score

# -------------------------------
# Step 8: Build a list of candidate results with combined scores
# -------------------------------
candidates = []

for sim, idx in zip(similarities[0], indices[0]):
    if idx < len(filenames):
        filename = filenames[idx]
        # Lookup the candidate’s resume text (if available)
        resume_text = resume_dict.get(filename, "")
        # Compute a keyword score: How many relevant keywords appear in the resume
        keyword_score = compute_keyword_score(resume_text, keywords)
        # Combine scores into a final score. (Weights are tunable.)
        final_score = (sim * 10) + keyword_score  # FAISS similarity is scaled and then added to keyword score
        candidates.append({
            'filename': filename,
            'similarity': sim,
            'keyword_score': keyword_score,
            'final_score': final_score
        })

# -------------------------------
# Step 9: Sort candidates by the final combined score
# -------------------------------
candidates_sorted = sorted(candidates, key=lambda x: x['final_score'], reverse=True)

# -------------------------------
# Step 10: Print the re-ranked results
# -------------------------------
print("Ranked Candidates for Data Analyst Role:")
for rank, candidate in enumerate(candidates_sorted, 1):
    print(f"Rank {rank}: {candidate['filename']}")
    print(f"  FAISS Similarity Score: {candidate['similarity']:.2f}")
    print(f"  Keyword Score: {candidate['keyword_score']}")
    print(f"  Final Combined Score: {candidate['final_score']:.2f}")
    print("")
