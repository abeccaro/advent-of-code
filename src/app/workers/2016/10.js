export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    function setupBots(input) {
        // sorting necessary to prevent value assignment before bot creation
        const sortedLines = input.split('\n').sort((a, b) => a.localeCompare(b));
        const bots = Array(sortedLines.findIndex(line => !line.startsWith('bot')));

        for (const line of sortedLines) {
            const tokens = line.split(' ');
            if (tokens[0] === 'bot') {
                bots[parseInt(tokens[1], 10)] = {
                    chips: [],
                    lowValue: parseInt(tokens[6], 10),
                    highValue: parseInt(tokens[11], 10),
                    lowType: tokens[5],
                    highType: tokens[10]
                };
            } else {
                bots[parseInt(tokens[5], 10)].chips.push(parseInt(tokens[1], 10));
            }
        }

        return bots;
    }

    function findOrProcess(bots, i, outputs, lowSearch, highSearch) {
        if (bots[i].chips.length !== 2) {
            return -1;
        }

        const [low, high] = bots[i].chips.sort((a, b) => a - b);

        if (low === lowSearch && high === highSearch) {
            return i;
        }

        if (bots[i].lowType === 'bot') {
            bots[bots[i].lowValue].chips.push(low);

            const foundIndex = findOrProcess(bots, bots[i].lowValue, outputs, lowSearch, highSearch);
            if (foundIndex >= 0) {
                return foundIndex;
            }
        } else {
            outputs[bots[i].lowValue] = low;
        }

        if (bots[i].highType === 'bot') {
            bots[bots[i].highValue].chips.push(high);

            const foundIndex = findOrProcess(bots, bots[i].highValue, outputs, lowSearch, highSearch);
            if (foundIndex >= 0) {
                return foundIndex;
            }
        } else {
            outputs[bots[i].highValue] = high;
        }

        bots[i].chips = [];
        return -1;
    }

    function part1(input) {
        const bots = setupBots(input);

        // assuming only one bot starts with 2 chips at the beginning
        const index = bots.findIndex(bot => bot.chips.length === 2);
        const outputs = Array(input.split(' ').filter(word => word === 'output').length);
        return findOrProcess(bots, index, outputs, 17, 61);
    }

    // Could be improved by stopping as soon as the first 3 outputs are valued, but it's so fast it's not worth the added code complexity
    function part2(input) {
        const bots = setupBots(input);

        // assuming only one bot starts with 2 chips at the beginning
        const index = bots.findIndex(bot => bot.chips.length === 2);
        const outputs = Array(input.split(' ').filter(word => word === 'output').length);
        findOrProcess(bots, index, outputs);
        return outputs[0] * outputs[1] * outputs[2];
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
