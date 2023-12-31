import { Solver } from '../../shared/models/problem';

export const solver201518: Solver = {
    part1(input: string): number {
        let grid = input.split('\n').map(row => row.split('').map(char => char === '#'));
        for (let i = 0; i < 100; i++) {
            grid = step(grid, grid.length);
        }
        return countLightsOn(grid);
    },
    part2(input: string): number {
        let grid = input.split('\n').map(row => row.split('').map(char => char === '#'));
        const gridSize = grid.length;
        forceCornersOn(grid, gridSize);

        for (let i = 0; i < 100; i++) {
            grid = step(grid, gridSize);
            forceCornersOn(grid, gridSize);
        }
        return countLightsOn(grid);
    },
};

function step(grid: boolean[][], gridSize: number): boolean[][] {
    const res = JSON.parse(JSON.stringify(grid)); // deep copy

    for (let row = 0; row < res.length; row++) {
        for (let col = 0; col < res[row].length; col++) {
            const onNeighbours = countNeighboursOn(grid, row, col, gridSize);
            res[row][col] = onNeighbours === 3 || (onNeighbours === 2 && grid[row][col]);
        }
    }

    return res;
}

function countNeighboursOn(grid: boolean[][], row: number, col: number, gridSize: number): number {
    return (
        Number(col > 0 && row > 0 && grid[row - 1][col - 1]) +
        Number(row > 0 && grid[row - 1][col]) +
        Number(col < gridSize - 1 && row > 0 && grid[row - 1][col + 1]) +
        Number(col > 0 && grid[row][col - 1]) +
        Number(col < gridSize - 1 && grid[row][col + 1]) +
        Number(col > 0 && row < gridSize - 1 && grid[row + 1][col - 1]) +
        Number(row < gridSize - 1 && grid[row + 1][col]) +
        Number(col < gridSize - 1 && row < gridSize - 1 && grid[row + 1][col + 1])
    );
}

function countLightsOn(grid: boolean[][]): number {
    return grid.reduce((count, row) => count + row.reduce((count, light) => count + Number(light), 0), 0);
}

function forceCornersOn(grid: boolean[][], gridSize: number): void {
    grid[0][0] = true;
    grid[0][gridSize - 1] = true;
    grid[gridSize - 1][0] = true;
    grid[gridSize - 1][gridSize - 1] = true;
}
