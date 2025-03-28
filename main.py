import os
import fitz  # PyMuPDF
import pandas as pd

# Path to folder containing resumes
RESUME_FOLDER = "resumes/pdfs"


# Extract text from PDF
def extract_text_from_pdf(pdf_path):
    try:
        text = ""
        with fitz.open(pdf_path) as doc:
            for page in doc:
                text += page.get_text()
        return text.strip()
    except Exception as e:
        print(f"Error reading {pdf_path}: {e}")
        return ""

# Read all resumes and extract data
def get_resume_data():
    resume_data = []

    for filename in os.listdir(RESUME_FOLDER):
        if filename.endswith(".pdf"):
            full_path = os.path.join(RESUME_FOLDER, filename)
            print(f"📄 Extracting: {filename}")
            text = extract_text_from_pdf(full_path)
            resume_data.append({
                "filename": filename,
                "content": text
            })

    return resume_data

# Save extracted content to CSV
def save_to_csv(data):
    df = pd.DataFrame(data)
    df.to_csv("resume_data.csv", index=False)
    print("✅ All resume data saved to 'resume_data.csv'")

# Run script
if __name__ == "__main__":
    data = get_resume_data()
    save_to_csv(data)
