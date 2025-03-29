# app.py
import os
from flask import Flask, render_template, request, redirect, send_from_directory
from main import get_resume_data, save_to_csv
from embed_and_store import main as build_faiss_index
from rank_and_search import get_ranked_results  # You'll get this in next step
import pandas as pd

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'pdf'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Check file extension
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Home: Upload form
@app.route('/')
def index():
    return render_template('index.html')

# Handle uploads + JD
@app.route('/upload', methods=['POST'])
def upload_files():
    job_description = request.form['job_description']
    files = request.files.getlist('resumes')

    # Save uploaded PDFs
    for file in files:
        if file and allowed_file(file.filename):
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filepath)

    # Step 1: Extract text
    resume_data = get_resume_data(app.config['UPLOAD_FOLDER'])
    save_to_csv(resume_data)

    # Step 2: Embed and Store
    build_faiss_index()

    # Step 3: Rank against JD
    ranked_results = get_ranked_results(job_description)

    return render_template('results.html', results=ranked_results)

# View a specific resume PDF
@app.route('/view/<filename>')
def view_pdf(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    print("🚀 Flask app starting on http://127.0.0.1:5000 ...")
    app.run(debug=True)

