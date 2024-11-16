export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    function decompressedLength(input, v2 = false) {
        let result = 0;

        for (let i = 0; i < input.length; i++) {
            if (input[i] === '(') {
                const markerLength = input.substring(i).indexOf(')');
                const [tokenLength, times] = input.substring(i + 1, i + markerLength).split('x').map(n => parseInt(n, 10));
                const tokenStart = i + markerLength + 1;

                result += times * (v2 ? decompressedLength(input.substring(tokenStart, tokenStart + tokenLength), true) : tokenLength);
                return result + decompressedLength(input.substring(tokenStart + tokenLength), v2);
            } else {
                result += 1;
            }
        }

        return result;
    }

    function part1(input) {
        return decompressedLength(input);
    }

    function part2(input) {
        return decompressedLength(input, true);
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
