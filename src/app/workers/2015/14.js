export const solver = () => {
    importScripts(`${self.location.origin}/workers/message-manager.js`);

    function parse(input) {
        return input.split('\n').map(row => {
            const tokens = row.split(' ');
            return {
                speed: parseInt(tokens[3], 10),
                flightDuration: parseInt(tokens[6], 10),
                restingTime: parseInt(tokens[13], 10)
            };
        });
    }

    function traveledDistance(reindeer, time) {
        return (
            (Math.floor(time / (reindeer.flightDuration + reindeer.restingTime)) * reindeer.flightDuration +
                Math.min(time % (reindeer.flightDuration + reindeer.restingTime), reindeer.flightDuration)) *
            reindeer.speed
        );
    }

    function calculatePoints(reindeer, time) {
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

    function part1(input) {
        return Math.max(...parse(input).map(reindeer => traveledDistance(reindeer, 2503)));
    }

    function part2(input) {
        return Math.max(...calculatePoints(parse(input), 2503));
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
