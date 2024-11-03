export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    function code(input, processInstruction, n = 5) {
        const lines = input.split('\n');
        const result = [];

        for (const line of lines) {
            for (const char of line) {
                n = processInstruction(n, char);
            }
            result.push(n);
        }

        return result;
    }

    function part1(input) {
        const processInstruction = (n, char) => {
            switch (char) {
                case 'U': {
                    return n > 3 ? n - 3 : n;
                }
                case 'D': {
                    return n < 7 ? n + 3 : n;
                }
                case 'L': {
                    return n % 3 !== 1 ? n - 1 : n;
                }
                case 'R': {
                    return n % 3 !== 0 ? n + 1 : n;
                }
            }
        };

        return code(input, processInstruction).join('');
    }

    function part2(input) {
        const processInstruction = (n, char) => {
            switch (char) {
                case 'U': {
                    if (n === 3 || n === 13) {
                        return n - 2;
                    }
                    return [6, 7, 8, 10, 11, 12].includes(n) ? n - 4 : n;
                }
                case 'D': {
                    if (n === 1 || n === 11) {
                        return n + 2;
                    }
                    return [2, 3, 4, 6, 7, 8].includes(n) ? n + 4 : n;
                }
                case 'L': {
                    return [1, 2, 5, 10, 13].includes(n) ? n : n - 1;
                }
                case 'R': {
                    return [1, 4, 9, 12, 13].includes(n) ? n : n + 1;
                }
            }
        };

        return code(input, processInstruction).map(n => {
            switch (n) {
                case 10:
                    return 'A';
                case 11:
                    return 'B';
                case 12:
                    return 'C';
                case 13:
                    return 'D';
                default:
                    return n;
            }
        }).join('');
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
