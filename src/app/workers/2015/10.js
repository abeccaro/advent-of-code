export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    function lookAndSayLength(input, iterations) {
        for (let i = 0; i < iterations; i++) {
            input = lookAndSay(input);
        }
        return input.length;
    }

    function lookAndSay(input) {
        let last = input[0];
        let count = 0;
        let result = '';

        for (const char of input) {
            if (char !== last) {
                result += count + last;
                count = 0;
            }
            last = char;
            count++;
        }
        result += count + last;

        return result;
    }

    function part1(input) {
        return lookAndSayLength(input, 40);
    }

    function part2(input) {
        return lookAndSayLength(input, 50);
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
