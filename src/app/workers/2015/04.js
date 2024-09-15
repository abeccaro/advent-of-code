export const solver = () => {
    importScripts(`${self.location.origin}/workers/message-manager.js`);
    importScripts('https://cdn.jsdelivr.net/npm/md5-jkmyers@0.0.1/md5.min.js');

    function findMinResultStartingWith(input, match) {
        let i = 1;
        while (!md5(`${input}${i}`).startsWith(match)) {
            i++;
        }
        return i;
    }

    function part1(input) {
        return findMinResultStartingWith(input, '00000');
    }

    function part2(input) {
        return findMinResultStartingWith(input, '000000');
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
