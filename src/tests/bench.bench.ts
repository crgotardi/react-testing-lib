const arr = [1,2,3,4,5]

/** bench */
describe('benchmarks', () => {
    bench('map', () => {
        arr.map(x => x)
    })

    bench('sort', () => {
        arr.sort(x => x)
    })
})