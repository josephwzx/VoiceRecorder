from flask import Flask, request, send_from_directory, jsonify
from werkzeug.utils import secure_filename
from werkzeug.exceptions import NotFound
import os

upload_folder = 'uploads'
os.makedirs(upload_folder, exist_ok=True)  # Ensure the upload folder exists

def create_app(test_config=None, upload_folder=upload_folder):
    app = Flask(__name__)
    if test_config:
        app.config.update(test_config)

    @app.route('/')
    def hello_world():
        return 'Hello, World!'

    @app.route('/api/recordings', methods=['POST'])
    def save_recording():
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        if file:
            filename = secure_filename(file.filename)
            file_path = os.path.join(upload_folder, filename)
            file.save(file_path)
            return jsonify({'message': 'File uploaded successfully!', 'filename': filename}), 201
        return jsonify({'error': 'File upload failed'}), 500

    @app.route('/api/recordings', methods=['GET'])
    def list_recordings():
        try:
            files = os.listdir(upload_folder)
            return jsonify(files)
        except Exception as e:
            return jsonify({'error': 'Error accessing the uploads directory', 'details': str(e)}), 500

    @app.route('/api/recordings/<filename>', methods=['GET'])
    def get_recording(filename):
        try:
            return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
        except NotFound:
            return jsonify({'error': 'File not found'}), 404

    @app.route('/api/recordings/<filename>', methods=['DELETE'])
    def delete_recording(filename):
        try:
            file_path = os.path.join(upload_folder, filename)
            if os.path.exists(file_path):
                os.remove(file_path)
                return jsonify({'message': 'File deleted successfully!'})
            else:
                return jsonify({'error': 'File not found'}), 404
        except Exception as e:
            return jsonify({'error': 'Failed to delete file', 'details': str(e)}), 500

    return app

if __name__ == '__main__':
    create_app().run(debug=True)
