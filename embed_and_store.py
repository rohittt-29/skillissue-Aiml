# embed_and_store.py

import os
import pandas as pd
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import pickle

CSV_FILE = "resume_data.csv"
OUTPUT_INDEX = "faiss_index.index"
OUTPUT_MAPPING = "index_to_filename.pkl"

def main():
    print("📦 Loading resume data from CSV...")
    try:
        df = pd.read_csv(CSV_FILE)
    except Exception as e:
        print(f"❌ Error reading {CSV_FILE}: {e}")
        return

    if "filename" not in df.columns or "content" not in df.columns:
        print("❌ CSV file must contain 'filename' and 'content' columns.")
        return

    filenames = df["filename"].tolist()
    resume_texts = df["content"].tolist()

    valid_filenames = []
    valid_texts = []

    for fname, text in zip(filenames, resume_texts):
        if isinstance(text, str) and text.strip():
            valid_filenames.append(fname)
            valid_texts.append(text.strip())
        else:
            print(f"⚠️ Skipping {fname}: Empty content.")

    if not valid_texts:
        print("⚠️ No valid resumes found.")
        return

    print("🧠 Generating embeddings...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embeddings = model.encode(valid_texts, convert_to_numpy=True)

    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)

    faiss.write_index(index, OUTPUT_INDEX)
    print(f"✅ FAISS index saved to {OUTPUT_INDEX}")

    with open(OUTPUT_MAPPING, "wb") as f:
        pickle.dump(valid_filenames, f)
    print(f"✅ Mapping saved to {OUTPUT_MAPPING}")

# 👇 THIS IS CRUCIAL FOR IMPORT TO WORK
if __name__ == "__main__":
    main()
