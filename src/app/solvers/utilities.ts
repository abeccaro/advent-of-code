export const typedKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

export function permute<T>(elements: T[]): T[][] {
    const length = elements.length;
    const result = [elements.slice()];
    const c = Array<number>(length).fill(0);
    let i = 1;
    let k: number;
    let p: T;

    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = elements[i];
            elements[i] = elements[k];
            elements[k] = p;
            ++c[i];
            i = 1;
            result.push(elements.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }

    return result;
}

export function combinations<T>(elements: T[], k: number): T[][] {
    const combs = [];
    const bitmask = Array<boolean>(elements.length).fill(true, 0, k);

    // for each bitmask obtained through permutations of k 1s and n-k 0s choose the elements where there's a 1 in
    // the bitmask and skip the others
    for (const permutation of permute(bitmask)) {
        const comb = [];

        for (let i = 0; i < elements.length; ++i) {
            if (permutation[i]) {
                comb.push(elements[i]);
            }
        }

        combs.push(comb);
    }

    return combs;
}
