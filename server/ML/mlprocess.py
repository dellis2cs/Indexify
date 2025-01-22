from flask import Flask, request, jsonify
import pdfplumber
import re
from transformers import pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 



# Load Hugging Face summarizer pipeline
pipe = pipeline("summarization", model="facebook/bart-large-cnn")

# Define keyword extraction function
def extract_keywords(text, top_n=10):
    vectorizer = TfidfVectorizer(stop_words='english', max_df=1, min_df=.85)
    X = vectorizer.fit_transform([text])
    feature_names = vectorizer.get_feature_names_out()
    scores = X.sum(axis=0).A1
    keyword_scores = sorted(zip(feature_names, scores), key=lambda x: x[1], reverse=True)
    return [keyword for keyword, _ in keyword_scores[:top_n]]

# Split text into chunks
def split_text(text, max_chunk_size=1000):
    words = text.split()
    for i in range(0, len(words), max_chunk_size):
        yield " ".join(words[i:i + max_chunk_size])

@app.route('/summarize', methods=['POST'])
def summarize():
    print("Request Recieved")
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    pdf_file = request.files['file']
    try:
        with pdfplumber.open(pdf_file) as pdf_doc:
            all_pages_text = [
                re.sub(r"\s+", " ", (page.extract_text() or "")).strip()
                for page in pdf_doc.pages
            ]

        final_text_one_line = " ".join(all_pages_text)

        # Extract keywords
        keywords = extract_keywords(final_text_one_line, top_n=10)

        # Split and filter text
        chunks = list(split_text(final_text_one_line, max_chunk_size=1000))
        relevant_chunks = [
            chunk for chunk in chunks if any(keyword in chunk for keyword in keywords)
        ]

        # Summarize relevant chunks
        section_summaries = [
            pipe(chunk, max_length=200, min_length=80, do_sample=False)[0]['summary_text']
            for chunk in relevant_chunks
        ]

        extended_summary = " ".join(section_summaries) if section_summaries else ""
        
        # Summarize the combined text
        if extended_summary:
            final_summary = pipe(extended_summary, max_length=300, min_length=100, do_sample=False)[0]['summary_text']
        else:
            final_summary = "No significant text found in the PDF."
        print(final_summary)
        # Return the summaries
        return jsonify({
            "final_summary": final_summary
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
