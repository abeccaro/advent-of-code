export const messageManager = () => {
    this.onmessage = (evt) => {
        console.time('part1');
        const part1Result = part1(evt.data);
        console.timeEnd('part1');

        this.postMessage({ part1: part1Result });

        console.time('part2');
        const part2Result = part2(evt.data);
        console.timeEnd('part2');

        this.postMessage({ part2: part2Result });
    };
};
