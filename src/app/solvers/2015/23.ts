import { Solver } from '../../shared/models/problem';

interface State {
    [label: string]: number;
}

export const solver201523: Solver = {
    part1(input: string): number {
        return execute({ a: 0, b: 0 }, input.split('\n'))['b'];
    },
    part2(input: string): number {
        return execute({ a: 1, b: 0 }, input.split('\n'))['b'];
    },
};

function execute(state: State, commands: string[]): State {
    let commandIndex = 0;
    while (commandIndex >= 0 && commandIndex < commands.length) {
        const [commandKey, ...params] = commands[commandIndex].split(' ').map(token => token.replaceAll(',', ''));
        switch (commandKey) {
            case 'hlf': {
                state[params[0]] = Math.floor(state[params[0]] / 2);
                commandIndex++;
                break;
            }
            case 'tpl': {
                state[params[0]] *= 3;
                commandIndex++;
                break;
            }
            case 'inc': {
                state[params[0]] += 1;
                commandIndex++;
                break;
            }
            case 'jmp': {
                commandIndex += parseInt(params[0], 10);
                break;
            }
            case 'jie': {
                commandIndex += state[params[0]] % 2 === 0 ? parseInt(params[1], 10) : 1;
                break;
            }
            case 'jio': {
                commandIndex += state[params[0]] === 1 ? parseInt(params[1], 10) : 1;
                break;
            }
        }
    }

    return state;
}
