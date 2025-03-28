#!/usr/bin/env python3
"""
generate_embeddings_faiss.py

This script reads resume data from resume_data.csv containing
columns 'filename' and 'content', generates vector embeddings using
SentenceTransformer's 'all-MiniLM-L6-v2' model, and builds a FAISS index
for semantic similarity search. It then saves the FAISS index and a mapping
from index positions to resume filenames.
"""

import os
import pandas as pd
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import pickle
print("Script started...")

# Define the input CSV and output file paths
CSV_FILE = "resume_data.csv"
OUTPUT_INDEX = "faiss_index.index"           # FAISS index file
OUTPUT_MAPPING = "index_to_filename.pkl"     # Mapping from index position to filename

def main():
    # Load resume data from the CSV file
    print(f"Loading resume data from {CSV_FILE}...")
    try:
        df = pd.read_csv(CSV_FILE)
    except Exception as e:
        print(f"Error reading {CSV_FILE}: {e}")
        return
    
    # Validate that the required columns exist: 'filename' and 'content'
    if "filename" not in df.columns or "content" not in df.columns:
        print("Error: CSV file must contain 'filename' and 'content' columns.")
        return
    
    # Retrieve filenames and resume contents
    filenames = df["filename"].tolist()
    resume_texts = df["content"].tolist()
    
    # Filter out entries with empty or missing content
    valid_filenames = []
    valid_texts = []
    for fname, text in zip(filenames, resume_texts):
        if isinstance(text, str) and text.strip():
            valid_filenames.append(fname)
            valid_texts.append(text.strip())
        else:
            print(f"Skipping {fname}: No valid content found.")
    
    if not valid_texts:
        print("No valid resume contents available for embedding generation. Exiting.")
        return

    # Initialize the SentenceTransformer model
    print("Generating embeddings for resumes...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embeddings = model.encode(valid_texts, convert_to_numpy=True)
    
    # Confirm the dimensionality of each embedding
    dim = embeddings.shape[1]
    print(f"Embedding dimensionality: {dim}")
    
    # Build the FAISS index using the L2 distance metric
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)
    print(f"FAISS index built with {index.ntotal} resumes.")
    
    # Save the FAISS index to disk
    faiss.write_index(index, OUTPUT_INDEX)
    print(f"FAISS index saved to {OUTPUT_INDEX}")
    
    # Save the mapping of index positions to filenames
    with open(OUTPUT_MAPPING, "wb") as f:
        pickle.dump(valid_filenames, f)
    print(f"Mapping of resume filenames saved to {OUTPUT_MAPPING}")

if __name__ == "__main__":
    main()
