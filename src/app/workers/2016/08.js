export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    const displayWidth = 50;
    const displayHeight = 6;

    function applyInstructions(instructions) {
        let display = Array(displayWidth * displayHeight).fill(false);

        instructions.forEach(line => {
            if (line.startsWith('rect')) {
                const [width, height] = line.split(' ')[1].split('x').map(n => parseInt(n, 10));
                for (let h = 0; h < height; h++) {
                    for (let w = 0; w < width; w++) {
                        display[h * displayWidth + w] = true;
                    }
                }
            } else if (line.startsWith('rotate row')) {
                const tokens = line.split(new RegExp(/\s|=/));
                const row = parseInt(tokens[3], 10);
                const shift = parseInt(tokens[5], 10);
                const newDisplay = [...display];

                for (let i = row * displayWidth; i < (row + 1) * displayWidth; i++) {
                    const oldIndex = i - shift >= row * displayWidth ? i - shift : i - shift + displayWidth;
                    newDisplay[i] = display[oldIndex];
                }
                display = newDisplay;
            } else if (line.startsWith('rotate column')) {
                const tokens = line.split(new RegExp(/\s|=/));
                const col = parseInt(tokens[3], 10);
                const shift = parseInt(tokens[5], 10);
                const newDisplay = [...display];

                for (let row = 0; row < displayHeight; row++) {
                    const oldIndex = (row - shift >= 0 ? row - shift : (row - shift + displayHeight) % displayHeight) * displayWidth + col;
                    newDisplay[row * displayWidth + col] = display[oldIndex];
                }
                display = newDisplay;
            }
        });

        return display;
    }

    function part1(input) {
        const display = applyInstructions(input.split('\n'));
        return display.filter(x => x).length;
    }

    function part2(input) {
        const display = applyInstructions(input.split('\n'));
        let letterDisplay = '';
        for (let i = 0; i < display.length; i += displayWidth) {
            letterDisplay += display.slice(i, i + displayWidth).map(x => x ? '■' : ' ').join('') + '\n';
        }
        return letterDisplay.substring(0, letterDisplay.length - 1);
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
