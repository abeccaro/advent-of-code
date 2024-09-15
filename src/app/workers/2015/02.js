export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    function count(input, counter) {
        const sizes = input.split('\n').map(row => row.split('x').map(n => parseInt(n, 10)));
        let total = 0;
        for (const [l, w, h] of sizes) {
            total += counter(l, w, h);
        }
        return total;
    }

    function part1(input) {
        return count(input, (l, w, h) => {
            const lw = l * w;
            const wh = w * h;
            const lh = l * h;
            return 2 * (lw + wh + lh) + Math.min(lw, wh, lh);
        });
    }

    function part2(input) {
        return count(input, (l, w, h) => {
            const minPerimeter = 2 * (l + w + h - Math.max(l, w, h));
            return minPerimeter + l * w * h;
        });
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
