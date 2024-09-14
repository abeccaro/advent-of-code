export const solver = () => {
    function solveNSantas(input, santas) {
        const visited = new Set();

        let x = new Array(santas).fill(0);
        let y = new Array(santas).fill(0);
        visited.add(hash(x[0], y[0]));
        let santaIndex = 0;
        for (const movement of input) {
            switch (movement) {
                case '^': {
                    y[santaIndex]++;
                    break;
                }
                case '>': {
                    x[santaIndex]++;
                    break;
                }
                case 'v': {
                    y[santaIndex]--;
                    break;
                }
                case '<': {
                    x[santaIndex]--;
                    break;
                }
            }

            visited.add(hash(x[santaIndex], y[santaIndex]));
            santaIndex = ++santaIndex % santas;
        }

        return visited.size;
    }

    const hashOffset = 2 ** 16;

    // No conflicts for numbers < hashOffset
    function hash(a, b) {
        return hashOffset * a + b;
    }

    function part1(input) {
        return solveNSantas(input, 1);
    }

    function part2(input) {
        return solveNSantas(input, 2);
    }
};
