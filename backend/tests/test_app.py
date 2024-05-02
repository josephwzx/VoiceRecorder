import pytest
from app import create_app
import io
import os

@pytest.fixture
def app():
    app = create_app({'TESTING': True, 'UPLOAD_FOLDER': '/tmp'})
    with app.app_context():
        test_file_path = os.path.join(app.config['UPLOAD_FOLDER'], 'test.wav')
        with open(test_file_path, 'wb') as f:
            f.write(b"Dummy audio data")
        
        yield app
        
        os.remove(test_file_path)

@pytest.fixture
def client(app):
    return app.test_client()

def test_hello_world(client):
    response = client.get('/')
    assert response.data == b'Hello, World!'
    assert response.status_code == 200

def test_save_recording(client):
    data = {'file': (io.BytesIO(b"your file contents"), 'test.wav')}
    response = client.post('/api/recordings', content_type='multipart/form-data', data=data)
    assert response.status_code == 201
    assert 'uploaded successfully' in response.json['message']

def test_list_recordings(client):
    response = client.get('/api/recordings')
    assert response.status_code == 200
    assert isinstance(response.json, list)

def test_get_recording(client):
    files = os.listdir('/tmp')  # Adjust path as necessary
    print(files)
    response = client.get('/api/recordings/test.wav')
    assert response.status_code == 200

def test_delete_recording(client):
    response = client.delete('/api/recordings/test.wav')
    assert response.status_code == 200
    assert 'deleted successfully' in response.json['message']
