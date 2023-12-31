import { Md5 } from 'ts-md5';
import { Solver } from '../../shared/models/problem';

export const solver201504: Solver = {
    part1(input: string): number {
        return findMinResultStartingWith(input, '00000');
    },
    part2(input: string): number {
        return findMinResultStartingWith(input, '000000');
    },
};

function findMinResultStartingWith(input: string, match: string): number {
    let i = 1;
    while (!Md5.hashStr(`${input}${i}`).startsWith(match)) {
        i++;
    }
    return i;
}
