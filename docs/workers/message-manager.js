function calculate(part1, part2, input) {
    console.time('part1');
    const part1Result = part1(input);
    console.timeEnd('part1');

    this.postMessage({ part1: part1Result });

    console.time('part2');
    const part2Result = part2(input);
    console.timeEnd('part2');

    this.postMessage({ part2: part2Result });
}
