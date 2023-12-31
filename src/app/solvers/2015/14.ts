import { Solver } from '../../shared/models/problem';

export const solver201514: Solver = {
    part1(input: string): number {
        return Math.max(...parse(input).map(reindeer => traveledDistance(reindeer, 2503)));
    },
    part2(input: string): number {
        return Math.max(...calculatePoints(parse(input), 2503));
    },
};

interface Reindeer {
    speed: number; // in km/s
    flightDuration: number;
    restingTime: number;
}

function parse(input: string): Reindeer[] {
    return input.split('\n').map(row => {
        const tokens = row.split(' ');
        return {
            speed: parseInt(tokens[3], 10),
            flightDuration: parseInt(tokens[6], 10),
            restingTime: parseInt(tokens[13], 10),
        };
    });
}

function traveledDistance(reindeer: Reindeer, time: number): number {
    return (
        (Math.floor(time / (reindeer.flightDuration + reindeer.restingTime)) * reindeer.flightDuration +
            Math.min(time % (reindeer.flightDuration + reindeer.restingTime), reindeer.flightDuration)) *
        reindeer.speed
    );
}

function calculatePoints(reindeer: Reindeer[], time: number): number[] {
    const points = new Array(reindeer.length).fill(0);
    for (let t = 1; t <= time; t++) {
        let max = traveledDistance(reindeer[0], t);
        let maxIndex = [0];
        for (let i = 1; i < reindeer.length; i++) {
            const distance = traveledDistance(reindeer[i], t);
            if (distance > max) {
                max = distance;
                maxIndex = [i];
            } else if (distance === max) {
                maxIndex.push(i);
            }
        }
        maxIndex.forEach(i => points[i]++);
    }
    return points;
}
