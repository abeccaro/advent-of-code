export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    function turn(instruction, direction) {
        const turn = instruction.charAt(0);
        return (direction + (turn === 'R' ? 1 : 3)) % 4;
    }

    function steps(instruction, direction, coordinates) {
        const step = parseInt(instruction.substring(1), 10);
        switch (direction) {
            case 0:
                coordinates.y += step;
                break;
            case 1:
                coordinates.x += step;
                break;
            case 2:
                coordinates.y -= step;
                break;
            case 3:
                coordinates.x -= step;
                break;
        }
        return coordinates;
    }

    function distance(coordinates) {
        return Math.abs(coordinates.x) + Math.abs(coordinates.y);
    }

    function checkSteps(startingPoint, endingPoint, visited) {
        visited.pop(); // prevents intersection on current starting point with last step ending point
        for (let x = startingPoint.x; startingPoint.x < endingPoint.x ? x <= endingPoint.x : x >= endingPoint.x; startingPoint.x < endingPoint.x ? x++ : x--) {
            for (let y = startingPoint.y; startingPoint.y < endingPoint.y ? y <= endingPoint.y : y >= endingPoint.y; startingPoint.y < endingPoint.y ? y++ : y--) {
                if (visited.find(location => location.x === x && location.y === y)) {
                    return { x, y };
                }
                visited.push({ x, y });
            }
        }
    }

    function part1(input) {
        const instructions = input.split(', ');
        let direction = 0; // 0 = north, 1 = east, 2 = south, 3 = west
        let coordinates = { x: 0, y: 0 };

        for (const instruction of instructions) {
            direction = turn(instruction, direction);
            coordinates = steps(instruction, direction, coordinates);
        }

        return distance(coordinates);
    }

    function part2(input) {
        const instructions = input.split(', ');
        let direction = 0; // 0 = north, 1 = east, 2 = south, 3 = west
        let coordinates = { x: 0, y: 0 };
        const visited = [{ x: 0, y: 0 }];

        for (const instruction of instructions) {
            direction = turn(instruction, direction);
            const startingPoint = { x: coordinates.x, y: coordinates.y };
            coordinates = steps(instruction, direction, coordinates);

            const intersection = checkSteps(startingPoint, coordinates, visited);
            if (intersection) {
                return distance(intersection);
            }
        }

        return Infinity;
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
