import { vi, expect, describe, it } from 'vitest'

const a = vi.fn()
    .mockImplementation((name: string) => {
        return name
    })

const b = vi.fn()

describe('expect api', () => {
    it('soft test', () => {
        expect.soft(true).toBe(true)
        expect(true).toBe(true)
    })

    it('not', () => {
        expect(false).not.toBe(true)
    })

    it('to be', () => {
        // primitive values or same object references
        const a = {}
        const b = a

        expect(a).toBe(b)
    })

    it('to be close to', () => {
        // float values, checking number of decimal places (5)
        expect(0.1 + 0.2).toBeCloseTo(0.3, 5)
    })

    it('to be defined', () => {
        // check if is not undefined
        expect(true).toBeDefined()
    })

    it('to be undefined', () => {
        // check if is not undefined
        expect(undefined).toBeUndefined()
    })

    it('to be truthy', () => {
        // check if is true when converted to boolean
        expect(1).toBeTruthy()
    })

    it('to be falsy', () => {
        // check if is false when converted to boolean
        expect(0).toBeFalsy()
    })

    it('to be null', () => {
        // check if is null
        expect(null).toBeNull()
    })

    it('to be NaN', () => {
        // check if is null
        expect(NaN).toBeNaN()
    })

    it('to be one of', () => {
        // check if an element is one of array values
        expect(1).toBeOneOf([1,2,3])
    })

    it('to be type of', () => {
        // check if is a specific type
        expect(1).toBeTypeOf('number')
    })

    it('to be instance of', () => {
        // check if is a specific instance
        expect(new Date()).toBeInstanceOf(Date)
    })

    it('to be greater than', () => {
        // check if is a specific instance
        expect(2).toBeGreaterThan(1)
        expect(2).toBeGreaterThanOrEqual(2)
    })

    it('to be less than', () => {
        // check if is a specific instance
        expect(1).toBeLessThan(2)
        expect(2).toBeLessThanOrEqual(2)
    })

    it('to equal', () => {
        // check if is equal or has the same structure
        expect({a: 1}).toEqual({a: 1})
        expect({a: 1}).not.toBe({a: 1})
    })

    it('to strict equal', () => {
        // check if is strict equal
        expect({a: undefined, b: 2}).toEqual({b: 2})
        expect({a: undefined, b: 2}).not.toStrictEqual({b: 2})
    })

    it('to contain', () => {
        /* 
        check if:
        - array contains element
        - string contains char
        - elements contain child
        - classList contains class
        */
        expect([1,2]).toContain(2)
    })

    it('to contain equal', () => {
        /* 
        check if:
        - array contains element
        - string contains char
        - elements contain child
        - classList contains class
        */
        expect([1,1,1,1]).toContainEqual(1)
    })

    it('to have length', () => {
        expect([1,1,1,1]).toHaveLength(4)
        expect('123').toHaveLength(3)
        expect({length: 2}).toHaveLength(2)
    })

    it('to have property', () => {
        // check key and value (optional)
        expect({length: 2}).toHaveProperty('length', 2)
    })

    it('to match', () => {
        // match regex or string
        expect('abc').toMatch('abc')
    })

    it('to match object', () => {
        // match regex or string
        const objectA = {
            a: 1,
            b: 2,
            c: {
                d: 4,
                e: 5
            }
        }

        expect(objectA).toMatchObject({ c: {d: 4, e: 5} })
    })

    it('to throw error', () => {
        function a() {
            throw new Error('custom error')
        }
        expect(a).toThrow('custom error')
    })

    it.todo('to match snapshot', () => {
        const a = { name: 'cris' }
        // match the most recent snapshot
        expect(a).toMatchSnapshot()
    })

    it('to have been called', () => {
        a()
        expect(a).toHaveBeenCalled()
        
    })

    it('to have been called n times', () => {
        a()
        expect(a).toHaveBeenCalledTimes(2)
    })

    it('to have been called with (params)', () => {
        a('b')
        expect(a).toHaveBeenCalledWith('b')
    })

    it('to have been called before', () => {
        a('a')
        b('b')
        expect(a).toHaveBeenCalledBefore(b)
    })

    it('to have been called after', () => {
        a('a')
        b('b')
        expect(b).toHaveBeenCalledAfter(a)
    })

    it('to have been called exatly once with', () => {
        a.mockClear()
        a('z')
        expect(a).toHaveBeenCalledExactlyOnceWith('z')
    })

    it('to have been last called with', () => {
        a('Laura')
        expect(a).toHaveBeenLastCalledWith('Laura')
    })

    it('to have been nth called with', () => {
        a('Laura')
        expect(a).toHaveBeenNthCalledWith(2, 'Laura')
    })

    it('to have returned', () => {
        a('Laura')
        expect(a).toHaveReturned()
    })

    it('to have returned n times', () => {
        a.mockClear()
        a('Laura')
        expect(a).toHaveReturnedTimes(1)
    })

    it('to have returned with', () => {
        a('Laura')
        expect(a).toHaveReturnedWith('Laura')
    })

    it('to have nth returned with', () => {
        a.mockClear()
        a('Laurinha')
        expect(a).toHaveNthReturnedWith(1, 'Laurinha')
    })

    it('to have resolved', async () => {
        const promise = vi.fn().mockImplementation(() => Promise.resolve(42))
        await promise()
        expect(promise).toHaveResolved()
    })

    it('to have resolved n times', async () => {
        const promise = vi.fn().mockImplementation(() => Promise.resolve(42))
        await promise()
        expect(promise).toHaveResolvedTimes(1)
    })

    it('to have resolved with', async () => {
        const promise = vi.fn().mockImplementation(() => Promise.resolve(42))
        await promise()
        expect(promise).toHaveResolvedWith(42)
    })

    it('to have last resolved with', async () => {
        const promise = vi.fn().mockImplementation(() => Promise.resolve(100))
        await promise()
        expect(promise).toHaveLastResolvedWith(100)
    })

    it('to have nth resolved with', async () => {
        const promise = vi.fn().mockImplementation(() => Promise.resolve(100))
        await promise()
        expect(promise).toHaveNthResolvedWith(1, 100)
    })

    it('to satisfy', async () => {
        expect(1).toSatisfy((number) => number % 2 !== 0)
    })

    it('resolves', async () => {
        const promise = vi.fn().mockImplementation(() => Promise.resolve(100))
        await expect(promise()).resolves.toEqual(100)
    })

    it('expect anything', async () => {
        // check if has prop
        const object = { name: 'name' }
        expect(object).toEqual({ name: expect.anything() })
    })

    it('expect anything', async () => {
        // check if has prop
        const object = { name: 'name' }
        expect(object).toEqual({ name: expect.anything() })
    })

    it('expect any', async () => {
        // check if prop is instance of specified constructor
        const object = { name: 'name' }
        expect(object).toEqual({ name: expect.any(String) })
    })

    it('match snapshot', () => {
        const string = 'Laura'
        const result = string.toUpperCase()
        expect(result).toMatchSnapshot()
        expect(result).toMatchInlineSnapshot(`"LAURA"`)
    })
})