function foo(a: number, b: string) {
    return [a, b]
}

describe('expect type of', () => {
    it('to equal type of', () => {
        expectTypeOf({ a: 1 }).toEqualTypeOf({ a: 1 })
    })

    it('to match type of', () => {
        expectTypeOf({ a: 1, b: 2 }).toMatchTypeOf({ a: 2 })
    })

    it('returns', () => {
        expectTypeOf(() => { return { a: 1 } }).returns.toEqualTypeOf({ a: 1 })
    })

    it('parameter', () => {
        expectTypeOf(foo).parameter(0).toBeNumber()
    })

    it('instance', () => {
        expectTypeOf(String).instance.toHaveProperty('length')
    })

    it('items', () => {
        expectTypeOf([1.2,3]).items.toEqualTypeOf<number>()
    })

    it('to be any', () => {
        expectTypeOf<any>().toBeAny()
    })

    it('to be unknown', () => {
        expectTypeOf('a' as unknown).toBeUnknown()
    })

    it('to be never', () => {
        expectTypeOf('a' as never).toBeNever()
    })

    it('to be function', () => {
        expectTypeOf(foo).toBeFunction()
    })

    it('to be object', () => {
        expectTypeOf({}).toBeObject()
    })

    it('to be array', () => {
        expectTypeOf([]).toBeArray()
    })

    it('to be string', () => {
        expectTypeOf('a').toBeString()
    })

    it('to be boolean', () => {
        expectTypeOf(false).toBeBoolean()
    })

    it('to be void', () => {
        const a = () => {}
        expectTypeOf(a()).toBeVoid()
    })

    it('to be symbol', () => {
        const s = Symbol
        expectTypeOf(s()).toBeSymbol()
    })

    it('to be null', () => {
        expectTypeOf(null).toBeNull()
    })

    it('to be undefined', () => {
        expectTypeOf(undefined).toBeUndefined()
    })

    it('to be nullable', () => {
        expectTypeOf<number | null>().toBeNullable()
    })

    it('to be callable with', () => {
        type foo = (a: string) => string
        // check if fn can be called with some param
        expectTypeOf<foo>().toBeCallableWith('a')
    })

    it('to have property', () => {
        // check if fn can be called with some param
        expectTypeOf({ a: 1}).toHaveProperty('a').toBeNumber()
    })

    it('assert', () => {
        assert('foo' !== 'bar', 'foo should not be equal to bar')
    })
})