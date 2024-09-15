export const solver = () => {
    importScripts(`${self.location.origin}/workers/message-manager.js`);

    const aCode = 'a'.charCodeAt(0);
    const iCode = 'i'.charCodeAt(0);
    const lCode = 'l'.charCodeAt(0);
    const oCode = 'o'.charCodeAt(0);
    const letters = 'z'.charCodeAt(0) - aCode + 1;

    function preparePassword(password) {
        const matchIndex = RegExp(/[ilo]/).exec(password)?.index;
        if (!matchIndex) {
            return password;
        }
        return password.substring(0, matchIndex + 1) + new Array(password.length - matchIndex - 1).fill('z').join('');
    }

    function nextPassword(password) {
        const codes = password.split('').map(char => char.charCodeAt(0));
        for (let i = codes.length - 1; i >= 0; i--) {
            codes[i] = ((codes[i] - aCode + 1) % letters) + aCode;
            if (codes[i] !== aCode) {
                if (codes[i] === iCode || codes[i] === lCode || codes[i] === oCode) {
                    codes[i]++;
                }
                break;
            }
        }
        return String.fromCharCode(...codes);
    }

    function isValid(password) {
        return !!(
            RegExp(/abc|bcd|cde|def|efg|fgh|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/).exec(password) && RegExp(/(([a-z])\2.*){2,}/).exec(password)
        );
    }

    function nextValidPassword(password) {
        let result = nextPassword(password);

        while (!isValid(result)) {
            result = nextPassword(result);
        }

        return result;
    }

    function part1(input) {
        return nextValidPassword(preparePassword(input));
    }

    function part2(input) {
        return nextValidPassword(nextValidPassword(preparePassword(input)));
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
