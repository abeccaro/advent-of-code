import { Solver } from '../../shared/models/problem';
import { permute } from '../utilities';

export const solver201509: Solver = {
    part1(input: string): number {
        const distances = parse(input);
        const paths = permute(Object.keys(distances));

        return Math.min(...paths.map(path => calculateCost(path, distances)));
    },

    part2(input: string): number {
        const distances = parse(input);
        const paths = permute(Object.keys(distances));

        return Math.max(...paths.map(path => calculateCost(path, distances)));
    },
};

interface Distances {
    [location: string]: {
        [location: string]: number;
    };
}

function parse(input: string): Distances {
    const distances: Distances = {};

    input.split('\n').forEach(row => {
        const [from, , to, , distance] = row.split(' ');
        const distanceNum = parseInt(distance, 10);

        if (!distances[from]) {
            distances[from] = {};
        }
        distances[from][to] = distanceNum;

        if (!distances[to]) {
            distances[to] = {};
        }
        distances[to][from] = distanceNum;
    });

    return distances;
}

function calculateCost(path: string[], distances: Distances): number {
    let result = 0;

    for (let i = 1; i < path.length; i++) {
        result += distances[path[i - 1]][path[i]];
    }

    return result;
}

// Branch and bound implementation for first part, discarded because it's less efficient for such few locations

interface BNBNode {
    path: string[];
    cost: number;
}

// noinspection JSUnusedLocalSymbols
function branchAndBound(distances: Distances): number {
    let openNodes: BNBNode[] = [{ path: [], cost: 0 }];
    const locations = Object.keys(distances);
    let result = Infinity;

    while (openNodes.length > 0) {
        openNodes.sort((node1, node2) => (node1.cost > node2.cost ? 1 : -1));
        const toExpand = openNodes.splice(0, 1)[0];
        const expansions = expand(toExpand, distances);
        result = Math.min(result, ...expansions.filter(node => node.path.length === locations.length).map(node => node.cost));
        openNodes.push(...expansions.filter(node => node.path.length < locations.length));
        openNodes = openNodes.filter(node => node.cost < result);
    }

    return result;
}

function expand(node: BNBNode, distances: Distances): BNBNode[] {
    const results: BNBNode[] = [];

    Object.keys(distances).forEach(location => {
        if (node.path.includes(location)) {
            return;
        }

        results.push({
            path: [...node.path, location],
            cost: node.cost + (node.path.length > 0 ? distances[node.path[node.path.length - 1]][location] : 0),
        });
    });

    return results;
}

// End B&B
