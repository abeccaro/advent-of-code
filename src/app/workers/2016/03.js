export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    function countValid(triangles) {
        return triangles.filter(triangle => {
            const max = Math.max(...triangle);
            return max < triangle.reduce((a, b) => a + b) - max;
        }).length;
    }

    function part1(input) {
        const triangles = input.split('\n').map(line => [line.substring(0, 5), line.substring(5, 10), line.substring(10)].map(token => parseInt(token.trim(), 10)));
        return countValid(triangles);
    }

    function part2(input) {
        const numbers = input.split('\n').map(line => [line.substring(0, 5), line.substring(5, 10), line.substring(10)].map(token => parseInt(token.trim(), 10))).flat();
        const triangles = [];

        for (let i = 0; i < numbers.length; i = i + (i % 9 === 2 ? 7 : 1)) {
            triangles.push([numbers[i], numbers[i + 3], numbers[i + 6]]);
        }

        return countValid(triangles);
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
