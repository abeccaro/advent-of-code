import { Solver } from '../../shared/models/problem';

export const solver201510: Solver = {
    part1(input: string): number {
        return lookAndSayLength(input, 40);
    },

    part2(input: string): number {
        return lookAndSayLength(input, 50);
    },
};

function lookAndSayLength(input: string, iterations: number): number {
    for (let i = 0; i < iterations; i++) {
        input = lookAndSay(input);
    }
    return input.length;
}

function lookAndSay(input: string): string {
    let last = input[0];
    let count = 0;
    let result = '';

    for (const char of input) {
        if (char !== last) {
            result += count + last;
            count = 0;
        }
        last = char;
        count++;
    }
    result += count + last;

    return result;
}
