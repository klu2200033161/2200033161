const { fetchNumbers } = require('../utils/fetchNumber');
const { calculateAverage } = require('../utils/calculator');

const WINDOW_SIZE = 10;
const windowStore = [];

class AverageController {
    static async calculateAverage(req, res) {
        const { numberid } = req.params;
        const validIds = ['p', 'f', 'e', 'r'];
        const idMap = { p: 'primes', f: 'fibo', e: 'even', r: 'rand' };

        if (!validIds.includes(numberid)) {
            return res.status(400).json({ error: 'Invalid number ID.' });
        }

        const windowPrevState = [...windowStore];

        let numbers = [];
        try {
            numbers = await fetchNumbers(idMap[numberid]);
        } catch (err) {
            // Ignore errors or timeouts
        }

        // Add unique numbers, ignore duplicates
        for (const num of numbers) {
            if (!windowStore.includes(num)) {
                windowStore.push(num);
                if (windowStore.length > WINDOW_SIZE) {
                    windowStore.shift();
                }
            }
        }

        const windowCurrState = [...windowStore];
        let avg = null;
        if (windowStore.length > 0) {
            avg = parseFloat(calculateAverage(windowStore).toFixed(2));
        }

        res.json({
            windowPrevState,
            windowCurrState,
            numbers,
            avg
        });
    }
}

module.exports = AverageController;