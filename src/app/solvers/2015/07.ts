/*
 * This solution is not efficient, it could be improved in at least a couple of ways:
 *
 * - instead of saving values as Actions with var1 with value just save the value. This should save a function call each time an already
 *   calculated value is read
 * - for part 2 don't parse twice but make a deep copy of the first action map. It is faster because it saves all the parsing logic
 */

import { Solver } from '../../shared/models/problem';

export const solver201507: Solver = {
    part1(input: string): number {
        return getValue(parse(input), 'a');
    },

    part2(input: string): number {
        const actionMap = parse(input);
        actionMap['b'] = {
            var1: getValue(parse(input), 'a'),
        };
        return getValue(actionMap, 'a');
    },
};

interface ActionMap {
    [x: string]: {
        var1: number | string;
        var2?: number | string;
        operation?: string;
    };
}

function parse(input: string): ActionMap {
    const map: ActionMap = {};
    input.split('\n').forEach(row => {
        const tokens = row.split(' ');
        if (tokens.length === 3) {
            const var1AsInt = parseInt(tokens[0]);
            map[tokens[2]] = {
                var1: isNaN(var1AsInt) ? tokens[0] : var1AsInt,
            };
        } else if (tokens.length === 4) {
            const var1AsInt = parseInt(tokens[1]);
            map[tokens[3]] = {
                operation: 'NOT',
                var1: isNaN(var1AsInt) ? tokens[1] : var1AsInt,
            };
        } else {
            const var1AsInt = parseInt(tokens[0]);
            const var2AsInt = parseInt(tokens[2]);
            map[tokens[4]] = {
                operation: tokens[1],
                var1: isNaN(var1AsInt) ? tokens[0] : var1AsInt,
                var2: isNaN(var2AsInt) ? tokens[2] : var2AsInt,
            };
        }
    });
    return map;
}

function getValue(actionMap: ActionMap, symbol: string | number): number {
    if (typeof symbol === 'number') {
        return symbol;
    }

    const action = actionMap[symbol];
    switch (action.operation) {
        case 'NOT': {
            actionMap[symbol] = {
                var1: ~getValue(actionMap, action.var1),
            };
            break;
        }
        case 'AND': {
            actionMap[symbol] = {
                var1: getValue(actionMap, action.var1) & getValue(actionMap, action.var2!),
            };
            break;
        }
        case 'OR': {
            actionMap[symbol] = {
                var1: getValue(actionMap, action.var1) | getValue(actionMap, action.var2!),
            };
            break;
        }
        case 'LSHIFT': {
            actionMap[symbol] = {
                var1: getValue(actionMap, action.var1) << getValue(actionMap, action.var2!),
            };
            break;
        }
        case 'RSHIFT': {
            actionMap[symbol] = {
                var1: getValue(actionMap, action.var1) >> getValue(actionMap, action.var2!),
            };
            break;
        }
        default: {
            actionMap[symbol] = {
                var1: getValue(actionMap, action.var1),
            };
            break;
        }
    }
    return actionMap[symbol].var1 as number;
}
