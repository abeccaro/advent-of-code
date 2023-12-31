import { Solver } from '../../shared/models/problem';

export const solver201506: Solver = {
    part1(input: string): number {
        const lights = createLightsGrid(false);

        parse(input).forEach(action =>
            processRange(action, lights, (actionDescription, currentValue) => {
                if (actionDescription === 'toggle') {
                    return !currentValue;
                }
                return action.description === 'turn_on';
            }),
        );

        let lit = 0;
        lights.forEach(row => (lit += row.filter(Boolean).length));
        return lit;
    },

    part2(input: string): number {
        const lights = createLightsGrid(0);

        parse(input).forEach(action =>
            processRange(action, lights, (actionDescription, currentValue) => {
                if (actionDescription === 'turn_off') {
                    return Math.max(0, currentValue - 1);
                }
                return currentValue + (actionDescription === 'toggle' ? 2 : 1);
            }),
        );

        let brightness = 0;
        lights.forEach(row => row.forEach(light => (brightness += light)));
        return brightness;
    },
};

interface Action {
    description: string;
    rangeStart: number[]; // [x, y]
    rangeEnd: number[]; // [x, y]
}

function createLightsGrid<T>(value: T): T[][] {
    const lights: T[][] = [];
    for (let row = 0; row < 1000; row++) {
        lights.push(new Array(1000).fill(value));
    }
    return lights;
}

function parse(input: string): Action[] {
    return input.split('\n').map(row => {
        row = row.replace('turn ', 'turn_');
        const tokens = row.split(' ');

        return {
            description: tokens[0],
            rangeStart: tokens[1].split(',').map(n => parseInt(n, 10)),
            rangeEnd: tokens[3].split(',').map(n => parseInt(n, 10)),
        };
    });
}

function processRange<T>(action: Action, lights: T[][], lightChanger: (action: string, currentValue: T) => T): void {
    for (let r = action.rangeStart[0]; r <= action.rangeEnd[0]; r++) {
        for (let c = action.rangeStart[1]; c <= action.rangeEnd[1]; c++) {
            lights[r][c] = lightChanger(action.description, lights[r][c]);
        }
    }
}
