import { Solver } from '../../shared/models/problem';

export const solver201520: Solver = {
    part1(input: string): number {
        const target = parseInt(input, 10);
        return firstNumberWithDivisorSumGreaterThan(target / 10);
    },
    part2(input: string): number {
        const target = parseInt(input, 10);
        return firstNumberWithDivisorSumGreaterThan(target / 11, 50);
    },
};

function firstNumberWithDivisorSumGreaterThan(x: number, maxIterations = Infinity): number {
    const values = Array(Math.ceil(x) + 1).fill(0);

    for (let i = 1; i <= x; i++) {
        for (let j = i, iterations = 1; j <= x && iterations <= maxIterations; j += i, iterations++) {
            values[j] += i;
        }
        if (values[i] > x) {
            return i;
        }
    }

    return -1;
}
