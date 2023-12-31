import { Solver } from '../../shared/models/problem';

export const solver201517: Solver = {
    part1(input: string): number {
        const containers = input.split('\n').map(row => parseInt(row, 10));
        return containersCombinations([], containers, 150).length;
    },
    part2(input: string): number {
        const containers = input.split('\n').map(row => parseInt(row, 10));
        const solutions = containersCombinations([], containers, 150);
        return countSolutionsWithMinLength(solutions);
    },
};

function containersCombinations(selected: number[], remaining: number[], liters: number): number[][] {
    if (liters < 0) {
        return [];
    }
    if (remaining.length === 0) {
        return liters === 0 ? [selected] : [];
    }

    return [
        ...containersCombinations(selected, remaining.slice(1), liters),
        ...containersCombinations([...selected, remaining[0]], remaining.slice(1), liters - remaining[0]),
    ];
}

function countSolutionsWithMinLength(solutions: number[][]): number {
    let result = 0;
    let minLength = Infinity;

    for (const solution of solutions) {
        if (solution.length < minLength) {
            minLength = solution.length;
            result = 1;
        } else if (solution.length === minLength) {
            result++;
        }
    }

    return result;
}
