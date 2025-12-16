export type BloomFilterReturn = "no" | "maybe";

export class BloomFilter {
    #bitsize: Uint8Array;
    #hashFunctions: Function[];

    constructor(
        bitsizeLength: number,
        hashFunctions: Function[]
    ) {
        this.#bitsize = new Uint8Array(bitsizeLength).fill(0);
        this.#hashFunctions = hashFunctions;
    }

    insert<T extends number>(value: T) {
        for (const _function of this.#hashFunctions) {
            const index = _function(value);
            this.#bitsize[index] = 1;
        }
    }

    contains<T extends number>(value: T): BloomFilterReturn {
        for (const _function of this.#hashFunctions) {
            const index = _function(value);

            if (this.#bitsize[index] === 0) {
                return "no"
            }
        }

        return "maybe"
    }
}