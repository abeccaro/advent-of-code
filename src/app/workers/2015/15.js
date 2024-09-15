/*
 * Recipes function is a little messy, so I suspect there's an easier (and probably faster) way to enumerate them, but I couldn't find it
 * while maintaining the number of ingredients variable and this is working well with the input sizes of aoc
 */

export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    function parse(input) {
        return input.split('\n').map(row => {
            const tokens = row.split(' ');
            return [tokens[2], tokens[4], tokens[6], tokens[8], tokens[10]].map(token => parseInt(token, 10));
        });
    }

    function recipes(amount, ingredients) {
        // start from first ingredient in all possible quantities
        let res = Array.from(Array(amount + 1).keys()).map(key => [key]);

        // include all other ingredients but the last
        for (let i = 1; i < ingredients - 1; i++) {
            const newRes = [];
            // starting from each partial recipe
            for (const partial of res) {
                const partialAmount = partial.reduce((prev, curr) => prev + curr, 0);
                // add all feasible ingredient quantities
                for (let q = 0; q < amount - partialAmount + 1; q++) {
                    newRes.push([...partial, q]);
                }
            }
            // update results each time including quantities for the new ingredient
            res = newRes;
        }

        // include last ingredient with the only feasible quantity
        for (const partial of res) {
            partial.push(amount - partial.reduce((prev, curr) => prev + curr, 0));
        }

        return res;
    }

    function totalScore(recipe, ingredientProperties) {
        let score = 1;

        for (let property = 0; property < ingredientProperties[0].length - 1; property++) {
            let propertyScore = 0;
            for (let ingredient = 0; ingredient < recipe.length; ingredient++) {
                propertyScore += recipe[ingredient] * ingredientProperties[ingredient][property];
            }
            score *= Math.max(0, propertyScore);
        }

        return score;
    }

    function calories(recipe, ingredientProperties) {
        const caloriesIndex = ingredientProperties[0].length - 1;
        return recipe.reduce((calories, quantity, ingredient) => calories + quantity * ingredientProperties[ingredient][caloriesIndex], 0);
    }

    function part1(input) {
        const ingredientProperties = parse(input);
        // Calculating the max using reduce because for 5+ ingredients Math.max throws a stack overflow
        return recipes(100, ingredientProperties.length)
            .map(recipe => totalScore(recipe, ingredientProperties))
            .reduce((max, current) => (max < current ? current : max), -Infinity);
    }

    function part2(input) {
        const ingredientProperties = parse(input);
        return recipes(100, ingredientProperties.length)
            .filter(recipe => calories(recipe, ingredientProperties) === 500)
            .map(recipe => totalScore(recipe, ingredientProperties))
            .reduce((max, current) => (max < current ? current : max), -Infinity);
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
