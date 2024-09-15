export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    function step(grid, gridSize) {
        const res = JSON.parse(JSON.stringify(grid)); // deep copy

        for (let row = 0; row < res.length; row++) {
            for (let col = 0; col < res[row].length; col++) {
                const onNeighbours = countNeighboursOn(grid, row, col, gridSize);
                res[row][col] = onNeighbours === 3 || (onNeighbours === 2 && grid[row][col]);
            }
        }

        return res;
    }

    function countNeighboursOn(grid, row, col, gridSize) {
        return [
            col > 0 && row > 0 && grid[row - 1][col - 1],
            row > 0 && grid[row - 1][col],
            col < gridSize - 1 && row > 0 && grid[row - 1][col + 1],
            col > 0 && grid[row][col - 1],
            col < gridSize - 1 && grid[row][col + 1],
            col > 0 && row < gridSize - 1 && grid[row + 1][col - 1],
            row < gridSize - 1 && grid[row + 1][col],
            col < gridSize - 1 && row < gridSize - 1 && grid[row + 1][col + 1]
        ].map(Number).reduce((a, b) => a + b);
    }

    function countLightsOn(grid) {
        return grid.reduce((count, row) => count + row.reduce((count, light) => count + Number(light), 0), 0);
    }

    function forceCornersOn(grid, gridSize) {
        grid[0][0] = true;
        grid[0][gridSize - 1] = true;
        grid[gridSize - 1][0] = true;
        grid[gridSize - 1][gridSize - 1] = true;
    }

    function part1(input) {
        let grid = input.split('\n').map(row => row.split('').map(char => char === '#'));
        for (let i = 0; i < 100; i++) {
            grid = step(grid, grid.length);
        }
        return countLightsOn(grid);
    }

    function part2(input) {
        let grid = input.split('\n').map(row => row.split('').map(char => char === '#'));
        const gridSize = grid.length;
        forceCornersOn(grid, gridSize);

        for (let i = 0; i < 100; i++) {
            grid = step(grid, gridSize);
            forceCornersOn(grid, gridSize);
        }
        return countLightsOn(grid);
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
