import { obj } from './vitest'

// vi.fn -> create mock functions
const fn = vi.fn()

// vi.spyOn -> track existing methods
const sumSpy = vi.spyOn(obj, 'sum')

describe('vi utilities', () => {
    describe('mock functions and objects', () => {
        it('check is mock fn', () => {
            expect(vi.isMockFunction(fn)).toBe(true)
        })
    
        it('change env variables', () => {
            vi.stubEnv('NODE_ENV', 'production')
            expect(process.env.NODE_ENV).toBe('production')
        })
    
        it('undo changes on env variables', () => {
            vi.unstubAllEnvs()
            expect(process.env.NODE_ENV).toBe('test')
        })
    })

    describe.todo('mock modules', () => {

    })

    describe.todo('fake timers', () => {

    })

    describe.todo('miscellaneous', () => {

    })
})