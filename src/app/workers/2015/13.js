export const solver = () => {
    importScripts(`${self.location.origin}/workers/utilities.js`);

    function parse(input) {
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

    function calculateArrangementHappiness(arrangement, happinessValues) {
        let happiness = 0;

        for (let i = 0, neighbour = 1; i < arrangement.length; i++, neighbour = (neighbour + 1) % arrangement.length) {
            happiness += happinessValues[arrangement[i]][arrangement[neighbour]];
            happiness += happinessValues[arrangement[neighbour]][arrangement[i]];
        }

        return happiness;
    }

    function maxHappiness(happinessValues) {
        const people = [...Array(happinessValues.length).keys()];

        return Math.max(...permute(people).map(arrangement => calculateArrangementHappiness(arrangement, happinessValues)));
    }

    function part1(input) {
        const happinessValues = parse(input);
        return maxHappiness(happinessValues);
    }

    function part2(input) {
        const happinessValues = parse(input);

        happinessValues.forEach(personValues => personValues.push(0));
        happinessValues.push(new Array(happinessValues.length + 1).fill(0));

        return maxHappiness(happinessValues);
    }
};
