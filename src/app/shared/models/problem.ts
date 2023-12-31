export interface Problem {
    day: number;
    name: string;
    solver?: Solver;
}

export interface Solver {
    part1?: SolverFunction;
    part2?: SolverFunction;
}

export type SolverFunction = ((x: string) => number) | ((x: string) => string);
