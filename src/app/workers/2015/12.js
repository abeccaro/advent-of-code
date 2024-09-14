export const solver = () => {
    function sumNumbers(element) {
        if (element instanceof Array) {
            return element.map(sumNumbers).reduce((sum, current) => sum + current, 0);
        }

        switch (typeof element) {
            case 'number':
                return element;
            case 'string':
                return 0;
            case 'object':
                return Object.values(element)
                    .map(sumNumbers)
                    .reduce((sum, current) => sum + current, 0);
        }
    }

    function sumNumbersWithoutRed(element) {
        if (element instanceof Array) {
            return element.map(sumNumbersWithoutRed).reduce((sum, current) => sum + current, 0);
        }

        switch (typeof element) {
            case 'number':
                return element;
            case 'string':
                return 0;
            case 'object': {
                const values = Object.values(element);
                return values.includes('red') ? 0 : values.map(sumNumbersWithoutRed).reduce((sum, current) => sum + current, 0);
            }
        }
    }

    function part1(input) {
        return sumNumbers(JSON.parse(input));
    }

    function part2(input) {
        return sumNumbersWithoutRed(JSON.parse(input));
    }
};
