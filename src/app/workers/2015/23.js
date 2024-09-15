export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    function execute(state, commands) {
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

    function part1(input) {
        return execute({ a: 0, b: 0 }, input.split('\n'))['b'];
    }

    function part2(input) {
        return execute({ a: 1, b: 0 }, input.split('\n'))['b'];
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
