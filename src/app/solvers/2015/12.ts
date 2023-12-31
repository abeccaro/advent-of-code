import { Solver } from '../../shared/models/problem';

export const solver201512: Solver = {
    part1(input: string): number {
        return sumNumbers(JSON.parse(input));
    },
    part2(input: string): number {
        return sumNumbersWithoutRed(JSON.parse(input));
    },
};

type jsonElement = object | jsonElement[] | number | string;

function sumNumbers(element: jsonElement): number {
    if (element instanceof Array) {
        return element.map(sumNumbers).reduce((sum, current) => sum + current, 0);
    }

    switch (typeof element) {
        case 'number':
            return element;
        case 'string':
            return 0;
        case 'object':
            return Object.values(element)
                .map(sumNumbers)
                .reduce((sum, current) => sum + current, 0);
    }
}

function sumNumbersWithoutRed(element: jsonElement): number {
    if (element instanceof Array) {
        return element.map(sumNumbersWithoutRed).reduce((sum, current) => sum + current, 0);
    }

    switch (typeof element) {
        case 'number':
            return element;
        case 'string':
            return 0;
        case 'object': {
            const values = Object.values(element);
            return values.includes('red') ? 0 : values.map(sumNumbersWithoutRed).reduce((sum, current) => sum + current, 0);
        }
    }
}
