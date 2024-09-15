export const solver = () => {
    importScripts(`${self.location.origin}/workers/message-manager.js`);

    function firstNumberWithDivisorSumGreaterThan(x, maxIterations = Infinity) {
        const values = Array(Math.ceil(x) + 1).fill(0);

        for (let i = 1; i <= x; i++) {
            for (let j = i, iterations = 1; j <= x && iterations <= maxIterations; j += i, iterations++) {
                values[j] += i;
            }
            if (values[i] > x) {
                return i;
            }
        }

        return -1;
    }

    function part1(input) {
        const target = parseInt(input, 10);
        return firstNumberWithDivisorSumGreaterThan(target / 10);
    }

    function part2(input) {
        const target = parseInt(input, 10);
        return firstNumberWithDivisorSumGreaterThan(target / 11, 50);
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
