import { Solver } from '../../shared/models/problem';
import { permute } from '../utilities';

export const solver201513: Solver = {
    part1(input: string): number {
        const happinessValues = parse(input);
        return maxHappiness(happinessValues);
    },
    part2(input: string): number {
        const happinessValues = parse(input);

        happinessValues.forEach(personValues => personValues.push(0));
        happinessValues.push(new Array(happinessValues.length + 1).fill(0));

        return maxHappiness(happinessValues);
    },
};

function parse(input: string): number[][] {
    const values = [];

    const rows = input.split('\n');
    const people = Math.ceil(Math.sqrt(rows.length));

    for (let i = 0; i < people; i++) {
        const happinessValues = [];
        for (let j = 0; j < people - 1; j++) {
            if (j === i) {
                happinessValues.push(NaN);
            }
            const rowIndex = i * (people - 1) + j;
            const tokens = rows[rowIndex].split(' ');
            happinessValues.push(parseInt(tokens[3], 10) * (tokens[2] === 'lose' ? -1 : 1));
        }
        values.push(happinessValues);
    }
    values[people - 1].push(NaN);

    return values;
}

function calculateArrangementHappiness(arrangement: number[], happinessValues: number[][]): number {
    let happiness = 0;

    for (let i = 0, neighbour = 1; i < arrangement.length; i++, neighbour = (neighbour + 1) % arrangement.length) {
        happiness += happinessValues[arrangement[i]][arrangement[neighbour]];
        happiness += happinessValues[arrangement[neighbour]][arrangement[i]];
    }

    return happiness;
}

function maxHappiness(happinessValues: number[][]): number {
    const people = [...Array(happinessValues.length).keys()];

    return Math.max(...permute(people).map(arrangement => calculateArrangementHappiness(arrangement, happinessValues)));
}
