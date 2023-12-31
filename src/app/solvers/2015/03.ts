import { Solver } from '../../shared/models/problem';

export const solver201503: Solver = {
    part1(input: string): number {
        return solveNSantas(input, 1);
    },

    part2(input: string): number {
        return solveNSantas(input, 2);
    },
};

function solveNSantas(input: string, santas: number): number {
    const visited = new Set<number>();

    let x = new Array(santas).fill(0);
    let y = new Array(santas).fill(0);
    visited.add(hash(x[0], y[0]));
    let santaIndex = 0;
    for (const movement of input) {
        switch (movement) {
            case '^': {
                y[santaIndex]++;
                break;
            }
            case '>': {
                x[santaIndex]++;
                break;
            }
            case 'v': {
                y[santaIndex]--;
                break;
            }
            case '<': {
                x[santaIndex]--;
                break;
            }
        }

        visited.add(hash(x[santaIndex], y[santaIndex]));
        santaIndex = ++santaIndex % santas;
    }

    return visited.size;
}

const hashOffset = 2 ** 16;

// No conflicts for numbers < hashOffset
function hash(a: number, b: number): number {
    return hashOffset * a + b;
}
