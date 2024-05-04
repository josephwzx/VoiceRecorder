const dev = {
    //API_URL: 'http://api.josephweng.com',
    API_URL: 'http://127.0.0.1:5000',
};

const prod = {
    API_URL: 'http://api.josephweng.com',
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;
