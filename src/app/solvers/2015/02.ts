import { Solver } from '../../shared/models/problem';

export const solver201502: Solver = {
    part1(input: string): number {
        return count(input, (l, w, h) => {
            const lw = l * w;
            const wh = w * h;
            const lh = l * h;
            return 2 * (lw + wh + lh) + Math.min(lw, wh, lh);
        });
    },

    part2(input: string): number {
        return count(input, (l, w, h) => {
            const minPerimeter = 2 * (l + w + h - Math.max(l, w, h));
            return minPerimeter + l * w * h;
        });
    },
};

function count(input: string, counter: (l: number, w: number, h: number) => number): number {
    const sizes = input.split('\n').map(row => row.split('x').map(n => parseInt(n, 10)));
    let total = 0;
    for (const [l, w, h] of sizes) {
        total += counter(l, w, h);
    }
    return total;
}
