
/** setup and teardown */
// Runs before each test
beforeEach(async (test) => {
    console.log('before each test', test.task.name)
})

// Runs before each test
afterEach(async (test) => {
    console.log('after each test', test.task.name)
})

beforeAll(async () => {
    console.log('before all tests')
})

afterAll(async () => {
    console.log('after all tests')
})

describe('testing setup', () => {
    it('run test', () => {
        expect(true).toBe(true)
    })
})