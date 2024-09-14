export const solver = () => {
    function part1(input) {
        const rows = input.split('\n');

        const codeLength = rows.join('').length;
        const memoryLength = rows.map(s => s.replaceAll(/\\{2}|\\"|\\x.{2}/g, '#')).join('').length - 2 * rows.length;

        return codeLength - memoryLength;
    }

    function part2(input) {
        const rows = input.split('\n');

        const codeLength = rows.join('').length;
        const encodedLength = rows.map(s => `"${s.replaceAll(/([\\"])/g, '##')}"`).join('').length;

        return encodedLength - codeLength;
    }
};
