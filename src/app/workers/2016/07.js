export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    function supportsTLS(ip) {
        const tokens = ip.split(new RegExp(/[\[\]]/));

        for (let i = 1; i < tokens.length; i += 2) {
            if (hasABBA(tokens[i])) {
                return false;
            }
        }

        for (let i = 0; i < tokens.length; i += 2) {
            if (hasABBA(tokens[i])) {
                return true;
            }
        }

        return false;
    }

    function hasABBA(token) {
        for (let i = 3; i < token.length; i++) {
            if (token[i] === token[i - 3] && token[i - 1] === token[i - 2] && token[i] !== token[i - 1]) {
                return true;
            }
        }
        return false;
    }

    function supportsSSL(ip) {
        const tokens = ip.split(new RegExp(/[\[\]]/));

        const abas = [];
        for (let i = 1; i < tokens.length; i += 2) {
            abas.push(...findABAs(tokens[i]));
        }

        // could be more efficient checking each bab as soon as it's found, but it runs so fast it doesn't matter and code gets messier
        const babs = [];
        for (let i = 0; i < tokens.length; i += 2) {
            babs.push(...findABAs(tokens[i]));
        }

        return !!abas.find(aba => !!babs.find(bab => bab[0] === aba[1] && aba[0] === bab[1]));
    }

    function findABAs(token) {
        const result = [];

        for (let i = 2; i < token.length; i++) {
            if (token[i] === token[i - 2] && token[i] !== token[i - 1]) {
                result.push(token.substring(i - 2, i + 1));
            }
        }

        return result;
    }

    function part1(input) {
        return input.split('\n').filter(supportsTLS).length;
    }

    function part2(input) {
        return input.split('\n').filter(supportsSSL).length;
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
