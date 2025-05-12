describe('act section', () => {
    it.todo('act api', async () => {
        //  more acc simulate how RC behave in a real browser env.
        // ensure dom updates, side effects and re-renders before run tests
        // render, fireEvent, userEvent already use act internally
        // use it when update event without these functions
        // you might need it for async ops or async logic in custom hooks

        // example sync
        act(() => {
            // update state and re-render
            updateTextContent("Updated Text (Synchronously)");
            // ...tests
        });

        // example async
        await act(async () => {
            await Promise.resolve();
            updateTextContent("Updated Text (Asynchronously)");
            // ...tests
        });
    })
})