# main.py

import os
import fitz  # PyMuPDF
import pandas as pd

def get_resume_data(folder_path):
    resume_data = []

    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            file_path = os.path.join(folder_path, filename)
            try:
                with fitz.open(file_path) as doc:
                    text = ""
                    for page in doc:
                        text += page.get_text()
                resume_data.append({"filename": filename, "content": text})
            except Exception as e:
                print(f"❌ Error reading {filename}: {e}")
    return resume_data

def save_to_csv(data, output_file="resume_data.csv"):
    df = pd.DataFrame(data)
    df.to_csv(output_file, index=False)
    print(f"✅ Resume data saved to {output_file}")
