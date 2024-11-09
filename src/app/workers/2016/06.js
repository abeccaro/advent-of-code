export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    function countCharacters(input) {
        const lines = input.split('\n');
        const counters = Array(lines[0].length);
        for (let i = 0; i < counters.length; i++) {
            counters[i] = {};
        }

        for (const line of lines) {
            for (let i = 0; i < line.length; i++) {
                counters[i][line[i]] = counters[i][line[i]] ? counters[i][line[i]] + 1 : 1;
            }
        }

        return counters;
    }

    function part1(input) {
        const counterMaps = countCharacters(input);

        return counterMaps.map(counters => Object.entries(counters).reduce((max, curr) => curr[1] > max[1] ? curr : max, ['', -Infinity])[0]).join('');
    }

    function part2(input) {
        const counterMaps = countCharacters(input);

        return counterMaps.map(counters => Object.entries(counters).reduce((min, curr) => curr[1] < min[1] ? curr : min, ['', Infinity])[0]).join('');
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
