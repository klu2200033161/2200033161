const axios = require('axios');

const API_URLS = {
    primes: 'http://20.244.56.144/evaluation-service/primes',
    fibo: 'http://20.244.56.144/evaluation-service/fibo',
    even: 'http://20.244.56.144/evaluation-service/even',
    rand: 'http://20.244.56.144/evaluation-service/rand'
};

// Paste your token string between the quotes below
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3ODk0Njg1LCJpYXQiOjE3NDc4OTQzODUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjBmODA2Y2NmLTYzODYtNGZmNy1hYWRmLTE4OGJhYzcxMjY5NiIsInN1YiI6IjIyMDAwMzMxNjFjc2VoQGdtYWlsLmNvbSJ9LCJlbWFpbCI6IjIyMDAwMzMxNjFjc2VoQGdtYWlsLmNvbSIsIm5hbWUiOiJndW50YW11a2thbGEgc2FpbGVzaCIsInJvbGxObyI6IjIyMDAwMzMxNjEiLCJhY2Nlc3NDb2RlIjoiYmVUSmpKIiwiY2xpZW50SUQiOiIwZjgwNmNjZi02Mzg2LTRmZjctYWFkZi0xODhiYWM3MTI2OTYiLCJjbGllbnRTZWNyZXQiOiJ5QWtocHlWenNOZWtGek1mIn0.-Emtb4qxCpX1QkDYcDERimDu5ctgn6rblilzNLBeZxA';

async function fetchNumbers(type) {
    const url = API_URLS[type];
    try {
        const response = await axios.get(url, {
            timeout: 500,
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        });
        return response.data.numbers || [];
    } catch (err) {
        return [];
    }
}

module.exports = { fetchNumbers };