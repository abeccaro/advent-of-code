export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    function part1(input) {
        const [targetRow, targetCol] = input.split(/[ ,]/i).map(Number).filter(n => n && !isNaN(n));
        let value = 20151125;
        let row = 1;
        let col = 1;
        while (row !== targetRow || col !== targetCol) {
            if (row === 1) {
                row = col + 1;
                col = 1;
            } else {
                row--;
                col++;
            }

            value = (value * 252533) % 33554393;
        }
        return value;
    }

    function part2(input) {
        return 'No solution';
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
