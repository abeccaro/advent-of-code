export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    function part1(input) {
        return input
            .split('\n')
            .filter(s => /([aeiou]).*([aeiou]).*([aeiou])/.exec(s) && /([a-z])(\1)/.exec(s) && !/ab|cd|pq|xy/.exec(s))
            .length;
    }

    function part2(input) {
        return input
            .split('\n')
            .filter(s => /([a-z])[a-z](\1)/.exec(s) && /([a-z]{2}).*(\1)/.exec(s))
            .length;
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
