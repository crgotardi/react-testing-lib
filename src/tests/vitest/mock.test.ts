import { obj } from './vitest'

/** mock functions */
// vi.fn -> create mock functions
const fn = vi.fn()
    // function to be used as mock
    .mockImplementation((pokemon: string) => pokemon)

// vi.spyOn -> track existing methods
const sumSpy = vi.spyOn(obj, 'sum')

describe('mock functions', () => {
    it('get mock name', () => {
        fn.mockName('getPokemon')
        const mockName = fn.getMockName()
        expect(mockName).toBe('getPokemon')
    })

    it('get mock implementation', () => {
        const currentImplementation = fn.getMockImplementation()
        expect(currentImplementation).toBeDefined()
    })

    it('mock once', () => {
        fn.mockImplementationOnce((pokemon: string) => 'charmander')
        const currentPokemon = fn('pikachu')
        expect(currentPokemon).toBe('charmander')
    })

    it('is receiving attributes', () => {
        fn('bulbassaur')
        expect(fn.mock.calls[1]).toEqual(['bulbassaur'])
    })

    it ('is returning result', () => {
        fn('squirtle')
        expect(fn.mock.results[2].value).toBe('squirtle')
    })

    it('temporary mock', () => {
        fn.withImplementation((pokemon: string, type: string) => type, () => {
            const type = fn('charmander', 'fire')
            expect(type).toBe('fire')
        })
    })

    it('reject value', () => {
        const asyncMock = vi.fn().mockRejectedValue(new Error('async error'))
        expect(asyncMock()).rejects.toThrow('async error')
    })

    it('reject value once', () => {
        const asyncMock = fn.mockRejectedValueOnce(new Error('async error'))
        expect(asyncMock()).rejects.toThrow('async error')
        expect(asyncMock('a')).toBe('a')
    })

    it('resolve value', () => {
        const asyncMock = vi.fn().mockResolvedValue(42)
        expect(asyncMock()).resolves.toBe(42)
    })

    it('resolve value once', () => {
        const asyncMock = fn.mockResolvedValueOnce(42)
        expect(asyncMock()).resolves.toBe(42)
        expect(asyncMock('a')).toBe('a')
    })

    it('clear mock', () => {
        expect(fn.mock.calls.length).not.toBe(0)
        fn.mockClear()
        expect(fn.mock.calls.length).toBe(0)
    })

    it('reset mock', () => {
        fn('a')
        expect(fn.mock.calls[0]).toEqual(['a'])

        // clear call and reset implementations
        fn.mockReset()

        expect(fn.mock.calls.length).toBe(0)
        expect(fn.getMockImplementation()).toBeUndefined()
    })

    it('restore mock', () => {
        // restore original spy on objects
        // can be called before each as default in config file with restoreMocks
        fn.mockRestore()
        const currentImplementation = fn.getMockImplementation()
        expect(currentImplementation).toBeUndefined()
    })

    it('return this', () => {
        const that = fn.mockReturnThis()
        expect(that).toBeTruthy()
    })

    it('mock return value', () => {
        fn.mockReturnValue('b')
        fn.mockReturnValue('c')
        fn('a')
        expect(fn.mock.results[0].value).toBe('c')
    })

    it('mock return value once', () => {
        fn.mockReset()
        fn.mockImplementation((pokemon: string) => pokemon)
        fn.mockReturnValueOnce('c')
        fn.mockReturnValueOnce('b')
        fn('a')
        fn('a')
        fn('a')
        expect(fn.mock.results[0].value).toBe('c')
        expect(fn.mock.results[1].value).toBe('b')
        expect(fn.mock.results[2].value).toBe('a')
    })

    it('list calls', () => {
        const calls = fn.mock.calls
        expect(calls.length).toBe(3)
    })

    it('get last call', () => {
        const lastCall = fn.mock.lastCall
        expect(lastCall).toEqual(['a'])
    })

    it('get results', () => {
        const results = fn.mock.results
        expect(results.length).toBe(3)
    })

    it('get settled results', async () => {
        fn.mockReset()
        // resolved or rejected responses
        fn.mockImplementation(async () => 40)
        await fn(1)
        const settledResults = fn.mock.settledResults
        expect(settledResults.length).toBe(1)
    })
})