const dev = {
    API_URL: 'http://127.0.0.1:5000',
};

const prod = {
    API_URL: 'https://a1f6946efd5304f7db5f33a15e10bbef-1209942196.us-east-2.elb.amazonaws.com',
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;
