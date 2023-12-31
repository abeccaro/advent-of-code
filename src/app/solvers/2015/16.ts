import { Solver } from '../../shared/models/problem';
import { typedKeys } from '../utilities';

export const solver201516: Solver = {
    part1(input: string): number {
        return parse(input).findIndex(matches) + 1;
    },
    part2(input: string): number {
        return parse(input).findIndex(matchesWithInequalities) + 1;
    },
};

interface AuntSue {
    children: number;
    cats: number;
    samoyeds: number;
    pomeranians: number;
    akitas: number;
    vizslas: number;
    goldfish: number;
    trees: number;
    cars: number;
    perfumes: number;
}

const target: AuntSue = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
};

function parse(input: string): Partial<AuntSue>[] {
    return input.split('\n').map(row => {
        const tokens = row.split(' ');
        const aunt: Partial<AuntSue> = {};
        for (let i = 2; i < tokens.length - 1; i += 2) {
            aunt[tokens[i].substring(0, tokens[i].length - 1) as keyof AuntSue] = parseInt(tokens[i + 1], 10);
        }
        return aunt;
    });
}

function matches(aunt: Partial<AuntSue>): boolean {
    return !typedKeys(aunt).some(key => aunt[key] !== target[key]);
}

function matchesWithInequalities(aunt: Partial<AuntSue>): boolean {
    for (const key of typedKeys(aunt)) {
        if (key === 'cats' || key === 'trees') {
            if (aunt[key]! <= target[key]) {
                return false;
            }
        } else if (key === 'pomeranians' || key === 'goldfish') {
            if (aunt[key]! >= target[key]) {
                return false;
            }
        } else if (aunt[key] !== target[key]) {
            return false;
        }
    }
    return true;
}
