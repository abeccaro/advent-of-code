import { Solver } from '../../shared/models/problem';

export const solver201505: Solver = {
    part1(input: string): number {
        return input.split('\n').filter(s => /([aeiou]).*([aeiou]).*([aeiou])/.exec(s) && /([a-z])(\1)/.exec(s) && !/ab|cd|pq|xy/.exec(s))
            .length;
    },

    part2(input: string): number {
        return input.split('\n').filter(s => /([a-z])[a-z](\1)/.exec(s) && /([a-z]{2}).*(\1)/.exec(s)).length;
    },
};
