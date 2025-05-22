const axios = require('axios');

const API_URLS = {
    primes: 'http://20.244.56.144/eva1uation-service/primes',
    fibo: 'http://20.244.56.144/eva1uation-service/fibo',
    even: 'http://20.244.56.144/eva1uation-service/even',
    rand: 'http://20.244.56.144/eva1uation-service/rand'
};

async function fetchNumbers(type) {
    const url = API_URLS[type];
    try {
        const response = await Promise.race([
            axios.get(url, { timeout: 500 }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 500))
        ]);
        if (Array.isArray(response.data)) {
            return response.data;
        }
        return response.data.numbers || [];
    } catch (err) {
        return [];
    }
}

module.exports = { fetchNumbers };