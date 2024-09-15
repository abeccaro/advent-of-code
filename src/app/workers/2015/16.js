export const solver = () => {
    importScripts(`${self.location.origin}/workers/message-manager.js`);

    const target = {
        children: 3,
        cats: 7,
        samoyeds: 2,
        pomeranians: 3,
        akitas: 0,
        vizslas: 0,
        goldfish: 5,
        trees: 3,
        cars: 2,
        perfumes: 1
    };

    function parse(input) {
        return input.split('\n').map(row => {
            const tokens = row.split(' ');
            const aunt = {};
            for (let i = 2; i < tokens.length - 1; i += 2) {
                aunt[tokens[i].substring(0, tokens[i].length - 1)] = parseInt(tokens[i + 1], 10);
            }
            return aunt;
        });
    }

    function matches(aunt) {
        return !Object.keys(aunt).some(key => aunt[key] !== target[key]);
    }

    function matchesWithInequalities(aunt) {
        for (const key of Object.keys(aunt)) {
            if (key === 'cats' || key === 'trees') {
                if (aunt[key] <= target[key]) {
                    return false;
                }
            } else if (key === 'pomeranians' || key === 'goldfish') {
                if (aunt[key] >= target[key]) {
                    return false;
                }
            } else if (aunt[key] !== target[key]) {
                return false;
            }
        }
        return true;
    }

    function part1(input) {
        return parse(input).findIndex(matches) + 1;
    }

    function part2(input) {
        return parse(input).findIndex(matchesWithInequalities) + 1;
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
