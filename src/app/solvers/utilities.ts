export function permute<T>(elements: T[]): T[][] {
    const length = elements.length;
    const result = [elements.slice()];
    const c = new Array(length).fill(0);
    let i = 1;
    let k;
    let p;

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

export const typedKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;
