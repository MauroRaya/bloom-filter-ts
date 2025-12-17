import { describe, before, it } from "node:test";
import { BloomFilter } from "../src/bloom-filter";
import { BloomFilterReturn } from "../src/types";
import assert from "assert";

describe("BloomFilter::contains()", () => {
    let bloomFilter: BloomFilter;

    before(() => {
        bloomFilter = new BloomFilter(10, [
            (x: number) => x,
            (x: number) => (2 * x),
            (x: number) => (x * x)
        ]);

        bloomFilter.insert(10);
    });

    it("returns 'maybe' for an inserted value", () => {
        const result: BloomFilterReturn = bloomFilter.contains(10);
        assert.equal(result, "maybe");
    });

    it("returns 'no' for a value that was not inserted", () => {
        const result: BloomFilterReturn = bloomFilter.contains(9);
        assert.equal(result, "no");
    });

    it("may return 'maybe' for a value that was not inserted (false positive)", () => {
        const result: BloomFilterReturn = bloomFilter.contains(0);
        assert.equal(result, "maybe");
    });
})