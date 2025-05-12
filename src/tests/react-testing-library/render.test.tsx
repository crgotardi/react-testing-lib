import { render, screen, renderHook } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Button from '../../components/Button/Button'

describe('render section', () => {
    it('render api', async () => {
        const span = document.createElement('span')
        const onClick = vi.fn()

        // return from render function
        const {
            queryAllByTestId, // all queries to find elements...
            // ...
            container, // get the container of the Component
            baseElement, // get the base element of the Component
            debug, // return the component dom tree
            rerender, // rerender the component with another props
            unmount, // unmount the component,
            asFragment, // a DocumentFragment of rendered component. to avoid live bindings and how reacts to events.
        } = // Render component into a container which is appended to document.body
            render(<Button onClick={onClick}>Click</Button>, {
                // render props
                container: document.body.appendChild(span), // define the parent container
                wrapper: ({ children }) => { return <a>{children}</a> }, // define a wrapper for the component
                hydrate: false, // use ReactDOM.hydrate (server side rendering)
                reactStrictMode: true, // use strict mode to render
                // TODO: onCaughtError: undefined, // get error caught by error boundary
                // TODO: queries: {query: ''}, // define queries
            }
        )

        const buttonElement = screen.getByRole('button')
        await userEvent.click(buttonElement)

        expect(onClick).toHaveBeenCalled()
    })

    it.todo('render hook api', () => {
        const {
            result, // the most recently returned value
            rerender,
            unmount,
        } = renderHook(() => useLoggedInUser(), {
            initialProps: { name: 'Alice' },
            onCaughtError: undefined,
            onRecoverableError: undefined,
            wrapper: ({ children }) => <div>{children}</div>,
            reactStrictMode: true,
        })
        expect(result.current).toEqual({name: 'Alice'})
    })
})