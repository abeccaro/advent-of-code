import { Solver } from '../../shared/models/problem';

export const solver201501: Solver = {
    part1(input: string): number {
        let res = 0;
        for (const c of input) {
            res += c === '(' ? 1 : -1;
        }
        return res;
    },

    part2(input: string): number {
        let res = 0;
        for (let i = 0; i < input.length; i++) {
            res += input[i] === '(' ? 1 : -1;
            if (res < 0) {
                return i + 1;
            }
        }
        return -1;
    },
};
