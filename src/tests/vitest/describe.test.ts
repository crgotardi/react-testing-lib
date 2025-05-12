/** test (it) and describe */
// All tests will be started in parallel (describe.concurrent)
describe('operations', () => {
    // Runs in parallel (it.concurrent)
    it.concurrent('concurrent', () => {
        expect(2 + 2).toBe(4)
    })

    // Runs in parallel (it.concurrent)
    it.concurrent('concurrent', async () => {
        expect(2 + 2).toBe(4)
    })

    it('subtract 2 numbers', async () => {
        expect(2 - 2).toBe(0)
    })

    // Skip this test
    it.skip.concurrent('skip this test', async () => {
        expect(2 - 2).toBe(0)
    })

    // Skip if conditional is true
    it.skipIf(2 + 2 === 4).concurrent('skip this test with conditional', async () => {
        expect(2 - 2).toBe(0)
    })

    // Run if conditional is true
    it.runIf(2 + 2 === 4).concurrent('run this test with conditional', async () => {
        expect(2 - 2).toBe(0)
    })
    
    // Runs only this test
    /* it.only.concurrent('only this test', async () => {
        expect(2 - 2).toBe(0)
    }) */

    // Set test as todo
    it.todo.concurrent('todo this test', async () => {
        expect(2 - 2).toBe(0)
    })

    // test each
    it.each([
        [1, 1, 2],
        [1, 2, 3],
        [2, 1, 3],
    ])('each(%i, %i) -> %i', (a, b, expected) => {
        expect(a + b).toBe(expected)
    })

    // test each with obj
    it.each([
        { a: 1, b: 1, expected: 2 },
        { a: 1, b: 2, expected: 3 },
        { a: 2, b: 1, expected: 3 },
    ])('each with obj($a, $b) -> $expected', ({ a, b, expected }) => {
        expect(a + b).toBe(expected)
    })
})