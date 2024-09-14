export const solver = () => {
    function parse(input) {
        const rows = input.split('\n');

        const replacements = [];
        rows.forEach(row => {
            const tokens = row.split(' ');
            if (tokens.length === 3) {
                replacements.push([tokens[0], tokens[2]]);
            }
        });

        return { replacements, molecule: rows[rows.length - 1] };
    }

    function replaceOne(molecule, replacements) {
        const results = new Set();
        replacements.forEach(replacement => {
            const matches = molecule.matchAll(new RegExp(replacement[0], 'g'));
            for (const { index } of matches) {
                if (index === undefined) {
                    continue;
                }
                results.add(`${molecule.substring(0, index)}${replacement[1]}${molecule.substring(index + replacement[0].length)}`);
            }
        });
        return results;
    }

    function tokenize(input) {
        const tokens = [];

        for (let i = 0; i < input.length; i += tokens[tokens.length - 1].length) {
            const next = input[i + 1];
            tokens.push(input[i] + (next !== next?.toUpperCase() ? next : ''));
        }

        return tokens;
    }

    function countMinTransformations(tokens) {
        const count = tokens.reduce((count, token) => {
            switch (token) {
                case 'Y':
                    return count - 1;
                case 'Rn':
                case 'Ar':
                    return count;
                default:
                    return count + 1;
            }
        }, -1);

        // Handles empty tokens array returning 0
        return Math.max(0, count);
    }

    function part1(input) {
        const { replacements, molecule } = parse(input);
        return replaceOne(molecule, replacements).size;
    }

    function part2(input) {
        const { molecule } = parse(input);
        return countMinTransformations(tokenize(molecule));
    }
};
