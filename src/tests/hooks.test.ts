// hooks
describe('testing hooks', () => {
    it('testing hooks', () => {
        expect(2 + 2).toBe(4)
        onTestFinished(() => console.log('hook fires after test'))
    })
})