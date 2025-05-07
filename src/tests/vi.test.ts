import { obj } from './vitest'

let serverIsReady = false

// vi.fn -> create mock functions
const fn = vi.fn()

// vi.spyOn -> track existing methods
const sumSpy = vi.spyOn(obj, 'sum')

describe('vi utilities', () => {
    describe('mock functions and objects', () => {
        it('check is mock fn', () => {
            expect(vi.isMockFunction(fn)).toBe(true)
        })
    
        it('mock env variables', () => {
            vi.stubEnv('NODE_ENV', 'production')
            expect(process.env.NODE_ENV).toBe('production')
        })
    
        it('unmock env variables', () => {
            vi.unstubAllEnvs()
            expect(process.env.NODE_ENV).toBe('test')
        })

        it('mock global variables', () => {
            vi.stubGlobal('serverIsReady', false)
            expect(serverIsReady).toBe(false)
        })
    
        it('unmock global variables', () => {
            vi.unstubAllGlobals()
            expect(serverIsReady).toBe(false)
        })
    })

    describe.todo('mock modules', () => {
        // mock: 
        // - only works with import keyword (not require)
        // - always hoisted
        vi.mock('./vitest', async () => {
            // import the actual module
            const originalModule = await vi.importActual('./vitest')

            // extends the module
            return { ...originalModule, get: vi.fn() }
        })
        
        // transform factory into spy object
        vi.mock('./vitest', { spy: true })

        // the same as mock but not hoisted
        vi.doMock('./vitest')

        // undo module mock 
        vi.unmock('./vitest')

        // the same but not hoisted
        vi.doUnmock('./vitest')

        // will reset modules inside context of tests (not applied for top level)
        vi.resetModules()

        // await for dynamic imports to finish (lazy loads)
        vi.dynamicImportSettled()
    })

    describe('fake timers', () => {
        it('use fake timers', () => {
            // fake timers used with timeout, interval, immediate and dates
            vi.useFakeTimers()
            // check if is fake timers
            const isFakeTimers = vi.isFakeTimers()
            expect(isFakeTimers).toBe(true)
        })

        it('use real timers', () => {
            vi.useRealTimers()
            const isFakeTimers = vi.isFakeTimers()
            expect(isFakeTimers).toBe(false)
        })

        it('get all timer count', () => {
            vi.useFakeTimers()
            setTimeout(() => true, 100)
            expect(vi.getTimerCount()).toBe(1)
        })

        it('set system time for fake timers', () => {
            vi.setSystemTime(new Date(2021, 11, 19))
            expect(new Date()).toEqual(new Date(2021, 11, 19))
        })

        it('clear all timers', () => {
            vi.clearAllTimers()
            expect(vi.getTimerCount()).toBe(0)
        })

        it('get mocked sysTime', () => {
            vi.setSystemTime(new Date(2021, 11, 19))
            const sysTime = vi.getMockedSystemTime()
            expect(sysTime).toEqual(new Date(2021, 11, 19))
        })

        it.todo('get real sysTime', () => {
            const sysTime = new Date(vi.getRealSystemTime())
            expect(sysTime).toEqual(new Date())
        })

        it('run all next Tick task queue', () => {
            vi.runAllTicks()
        })

        it('run all next Tick task queue', () => {
            vi.runAllTimers()
            vi.runAllTimersAsync()
        })

        it('run all pending timers after fakeTimer is initiated', () => {
            vi.runOnlyPendingTimers()
            vi.runOnlyPendingTimersAsync()
        })

        it('advance timers by time', () => {
            let isTrue = false
            setTimeout(() => isTrue = true, 500)
            expect(isTrue).toBe(false)
            vi.advanceTimersByTime(500)
            vi.advanceTimersByTimeAsync(500)
            expect(isTrue).toBe(true)
        })

        it('advance timers to next timer', () => {
            setInterval(() => console.log('timer', 500))
            vi.advanceTimersToNextTimer()
            vi.advanceTimersToNextTimerAsync()
        })

        it('advance timers to next timer', () => {
            setInterval(() => console.log('timer', 500))
            // similar to next timer, but with callbacks scheduled with request animation frame
            vi.advanceTimersToNextFrame()
        })
    })

    describe('miscellaneous', () => {
        it.todo('wait for it', async () => {
            new Promise((resolve) => setTimeout(() => {
                serverIsReady = true
            }, 300))
            
            //ignore errors and wait for server to be ready until timeout
            await vi.waitFor(() => {
                if (!serverIsReady) {
                    throw new Error('Server not started') 
                }

                return serverIsReady
            }, {
                timeout: 500, // default is 1000
                interval: 20, // default is 50
            })

            expect(serverIsReady).toBe(true)
        })

        it('wait for it until', async () => {
            serverIsReady = true
            
            //wait for server to be ready until timeout or any error
            await vi.waitUntil(() => {
                return serverIsReady
            }, {
                timeout: 500, // default is 1000
                interval: 20, // default is 50
            })

            expect(serverIsReady).toBe(true)
        })

        it('hoisting methods', async () => {
            vi.hoisted(() => {
                console.log('it will runs before imports')
            })
        })

        // set configs for this test file only
        vi.setConfig({
            fakeTimers: {
            now: new Date(2021, 11, 19),
            // supports the whole object
            }
        })
        vi.resetConfig()
    })
})