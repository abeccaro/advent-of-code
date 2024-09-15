export const solver = () => {
    importScripts(`${self.location.origin}/workers/message-manager.js`);

    function part1(input) {
        let res = 0;
        for (const c of input) {
            res += c === '(' ? 1 : -1;
        }
        return res;
    }

    function part2(input) {
        let res = 0;
        for (let i = 0; i < input.length; i++) {
            res += input[i] === '(' ? 1 : -1;
            if (res < 0) {
                return i + 1;
            }
        }
        return -1;
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
