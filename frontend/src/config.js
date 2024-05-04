const dev = {
    API_URL: 'http://127.0.0.1:5000',
};

const prod = {
    API_URL: '',
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;
