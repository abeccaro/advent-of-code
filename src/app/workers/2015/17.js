export const solver = () => {
    importScripts(`${self.location.origin}/workers/message-manager.js`);

    function containersCombinations(selected, remaining, liters) {
        if (liters < 0) {
            return [];
        }
        if (remaining.length === 0) {
            return liters === 0 ? [selected] : [];
        }

        return [
            ...containersCombinations(selected, remaining.slice(1), liters),
            ...containersCombinations([...selected, remaining[0]], remaining.slice(1), liters - remaining[0])
        ];
    }

    function countSolutionsWithMinLength(solutions) {
        let result = 0;
        let minLength = Infinity;

        for (const solution of solutions) {
            if (solution.length < minLength) {
                minLength = solution.length;
                result = 1;
            } else if (solution.length === minLength) {
                result++;
            }
        }

        return result;
    }

    function part1(input) {
        const containers = input.split('\n').map(row => parseInt(row, 10));
        return containersCombinations([], containers, 150).length;
    }

    function part2(input) {
        const containers = input.split('\n').map(row => parseInt(row, 10));
        const solutions = containersCombinations([], containers, 150);
        return countSolutionsWithMinLength(solutions);
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
