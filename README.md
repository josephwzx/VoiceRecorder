# Voice Recording Service

## Overview

The Voice Recording Service is a full-stack application designed to record user voices and store the recordings on disk. This application utilizes React and Material Tailwind for the frontend and Python Flask for the backend, providing a clean and responsive user experience across both desktop and mobile devices.

## Features

- **Frontend:** Developed using React.js with Material Tailwind components for styling. It includes features such as reading text area, a voice recorder with start/stop controls, and playback capabilities directly from the browser.
- **Backend:** Implemented with Python Flask without the use of a database, handling file storage directly on the server's disk. Supports basic CRUD operations through RESTful APIs to manage audio recordings.

## Running the Project Locally

To run the application locally, follow the steps below to set up both the frontend and backend parts of the project.

### Frontend Setup:

```bash
cd frontend
npm install
npm start
```

This will start the React application on `http://localhost:3000`.

```
pytest
```
Use pytest to run tests for backend.

### Backend Setup:

```bash
cd backend
python3 -m venv venv     
source venv/bin/activate
pip install -r requirements.txt
flask run
```

This will activate the virtual environment, install the required dependencies, and start the Flask server on `http://localhost:5000`.
```
npm test
```
Use Jest to run tests for frontend.

Make sure both servers are running to fully utilize the functionalities of the Voice Recording Service. Adjustments to configurations might be necessary depending on your development environment.

## Deployment

### Frontend Deployment using AWS Amplify

AWS Amplify is a development platform for building secure, scalable mobile and web applications. It integrates well with frontend frameworks like React and offers a straightforward deployment process, hosting your frontend on AWS with continuous deployment from your version control system.

Frontend was deployed to ```https://main.d27j752elq3zn3.amplifyapp.com```. It can be automatically deployed when push build product to github.

### Backend Deployment using AWS EC2

AWS EC2 (Elastic Compute Cloud) provides scalable computing capacity in the Amazon Web Services cloud, allowing you to develop and deploy applications rapidly. It’s ideal for running your backend services like a Flask app.

Backend was deployed to ```http://a1f6946efd5304f7db5f33a15e10bbef-1209942196.us-east-2.elb.amazonaws.com```

For a professional setup, I configurde a domain name to point to EC2 instance for the backend. ```api.josephweng.com```