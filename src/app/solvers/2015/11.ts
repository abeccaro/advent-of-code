import { Solver } from '../../shared/models/problem';

export const solver201511: Solver = {
    part1(input: string): string {
        return nextValidPassword(preparePassword(input));
    },

    part2(input: string): string {
        return nextValidPassword(nextValidPassword(preparePassword(input)));
    },
};

const aCode = 'a'.charCodeAt(0);
const iCode = 'i'.charCodeAt(0);
const lCode = 'l'.charCodeAt(0);
const oCode = 'o'.charCodeAt(0);
const letters = 'z'.charCodeAt(0) - aCode + 1;

function preparePassword(password: string): string {
    const matchIndex = RegExp(/[ilo]/).exec(password)?.index;
    if (!matchIndex) {
        return password;
    }
    return password.substring(0, matchIndex + 1) + new Array(password.length - matchIndex - 1).fill('z').join('');
}

function nextPassword(password: string): string {
    const codes = password.split('').map(char => char.charCodeAt(0));
    for (let i = codes.length - 1; i >= 0; i--) {
        codes[i] = ((codes[i] - aCode + 1) % letters) + aCode;
        if (codes[i] !== aCode) {
            if (codes[i] === iCode || codes[i] === lCode || codes[i] === oCode) {
                codes[i]++;
            }
            break;
        }
    }
    return String.fromCharCode(...codes);
}

function isValid(password: string): boolean {
    return !!(
        RegExp(/abc|bcd|cde|def|efg|fgh|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/).exec(password) && RegExp(/(([a-z])\2.*){2,}/).exec(password)
    );
}

function nextValidPassword(password: string): string {
    let result = nextPassword(password);

    while (!isValid(result)) {
        result = nextPassword(result);
    }

    return result;
}
