export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    let solutionMaxLength;

    function minimumFirstGroupQuantumEntanglement(packages, groups) {
        const weightPerGroup = packages.reduce((a, b) => a + b) / groups;
        solutionMaxLength = Infinity;
        const firstGroup = buildFirstGroup([], packages, 0, weightPerGroup);
        return Math.min(...firstGroup.map(group => group.reduce((a, b) => a * b)));
    }

    function buildFirstGroup(partialPackages, remainingPackages, partialWeight, totalWeight) {
        if (partialWeight === totalWeight) {
            solutionMaxLength = Math.min(solutionMaxLength, partialPackages.length);
            return [partialPackages];
        }
        if (partialWeight > totalWeight || remainingPackages.length === 0 || partialPackages.length >= solutionMaxLength) {
            return [];
        }

        const solutions = [];
        for (const pack of remainingPackages) {
            const group = buildFirstGroup(
                [...partialPackages, pack],
                remainingPackages.slice(1 + remainingPackages.findIndex(p => p === pack)),
                partialWeight + pack,
                totalWeight
            );
            if (group) {
                solutions.push(...group);
            }
        }
        return solutions;
    }

    function part1(input) {
        const packages = input
            .split('\n')
            .map(row => parseInt(row, 10))
            .sort((a, b) => a - b);
        return minimumFirstGroupQuantumEntanglement(packages, 3);
    }

    function part2(input) {
        const packages = input
            .split('\n')
            .map(row => parseInt(row, 10))
            .sort((a, b) => a - b);
        return minimumFirstGroupQuantumEntanglement(packages, 4);
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
