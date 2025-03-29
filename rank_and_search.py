# rank_and_search.py

import faiss
import pickle
import pandas as pd
from sentence_transformers import SentenceTransformer

CSV_FILE = "resume_data.csv"
INDEX_FILE = "faiss_index.index"
MAPPING_FILE = "index_to_filename.pkl"

def get_ranked_results(job_description, top_k=5):
    # Load FAISS index
    index = faiss.read_index(INDEX_FILE)

    # Load mapping: index -> filename
    with open(MAPPING_FILE, "rb") as f:
        index_to_filename = pickle.load(f)

    # Load resume text data
    df = pd.read_csv(CSV_FILE)
    resume_texts = df["content"].tolist()

    # Embed JD
    model = SentenceTransformer('all-MiniLM-L6-v2')
    jd_embedding = model.encode([job_description])

    # Search
    D, I = index.search(jd_embedding, top_k)

    # Prepare ranked results
    results = []
    for score, idx in zip(D[0], I[0]):
        filename = index_to_filename[idx]
        text = df[df["filename"] == filename]["content"].values[0]
        results.append({
            "filename": filename,
            "content": text,
            "score": float(100 / (1 + score))  # Convert distance to similarity score (0-100)
        })

    return results

