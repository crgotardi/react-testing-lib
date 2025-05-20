// types

// getBy: => node, => error (0 or +1 findings)
// getAllBy: => [nodes], => error (0 findings)

// queryBy: => node, => error (+1 findings) => null (0 findings)
// queryAllBy: => [nodes], => [] (0 findings)

// findBy: => => Promise (1000ms) => resolve (1 findings) => reject (0 or +1 findings)
// findAllBy: => => Promise (1000ms) => [resolve] (1 or more findings) => reject (0 findings)


// priority

// 1. Accessibility
    // 1. getByRole: for element exposed in a11y tree. Often used w/ name op: getByRole('button', {name: /submit/i})
    // 2. getByLabelText: really good for form fields.
    // 3. getByPlaceholderText: not a subs. for label. if it's all you have, it's better than alternatives.
    // 4. getByText: out of forms, can be used to non-interactive els (divs, spans, paragraphs).
    // 5. getByDisplayValue: current value of a form el. useful navigating page w/ filled-in values.
    
// 2. Semantic
    // 1. getByAltText: If your el is one which supports alt text (img, area, input, and any custom element)
    // 2. getByTitle: title attr isn't read by screenreaders, and isn't visible by default for sighted users
    
// 3. Test IDs
// 1. getByTestId: The user cannot see (or hear) these, only recommended when you can't match by role or text;
    
import { getByLabelText } from '@testing-library/dom'
import { render, screen, cleanup, configure } from '@testing-library/react'
import App from '../../App'
import { afterAll, beforeAll } from 'vitest'

configure({
    reactStrictMode: true,
    testIdAttribute: 'data-testingid' // default: testid
})

beforeEach(() => {
    render(<App />)
})

afterAll(() => {
    cleanup()
})

describe('queries api', () => {
    it('with screen', () => {
        const inputNode1 = screen.getByLabelText('Username')
    })

    it('without screen', () => {
        const container = document.querySelector('#app')
        const inputNode2 = getByLabelText(container, 'Username')
    })

    it('matching strings', () => {
        // string
        screen.getByText('Hello World') // full string match
        screen.getByText('llo worl', { exact: false }) // substring match, ignore case

        // regex
        screen.getByText(/world/i) // substring match, ignore case
        screen.getByText(/^hello world$/i) // full string match, ignore case

        // custom function:
        screen.getByText((content, element) => content.startsWith('Hello'))
    })

    it('get by role', () => {
        /* getByRole(
            container: HTMLElement, // If using `screen`, skip it
            role: string,
            options?: {
                hidden?: boolean = false, (aria-hidden)
                name?: TextMatch, 
                description?: TextMatch, (aria-describedby)
                selected?: boolean, (aria-selected)
                busy?: boolean, (aria-busy)
                checked?: boolean, (aria-checked)
                pressed?: boolean, (aria-pressed)
                suggest?: boolean, (disable the ability to throw suggestions for a specific query)
                current?: boolean | string, (aria-current)
                expanded?: boolean, (aria-expanded)
                queryFallbacks?: boolean, (fallback roles)
                level?: number, (heading or aria-level)
                value?: { (range widget)
                    min?: number,
                    max?: number,
                    now?: number,
                    text?: TextMatch,
                }
            }
        ) */
        screen.getByRole('button', {name: /send/i})
    })

    it('get by label text', () => {
        screen.getByLabelText('Hello World', {
            selector: 'input', // query a specific element
            exact: false
        })
    })

    it('get by placeholder text', () => {
        screen.getByPlaceholderText('placeholder', {
            exact: false
        })
    })

    it('get by text', () => {
        screen.getByText('text', {
            // selector: 'p',
            exact: false,
            ignore: 'p'
        })
    })

    it('get by display value', () => {
        // input, textarea, or select
        screen.getByDisplayValue('abc', {
            exact: false,
        })
    })

    it('get by alt text', () => {
        // input, textarea, or select
        screen.getByAltText('Incredibles', {
            exact: false,
        })
    })

    it('get by title', async () => {
        // input, textarea, or select
        screen.getByTitle('text', {
            exact: false,
        })
        screen.queryByTitle('text', {
            exact: false,
        })
        await screen.findByTitle('text', {
            exact: false,
        })
    })

    it('get by test id', () => {
        // input, textarea, or select
        screen.getByTestId('test-id', {
            exact: false,
        })
    })
})