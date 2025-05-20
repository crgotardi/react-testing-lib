import { beforeAll, describe, it } from "vitest"
import App from "../../App"
import { fireEvent, render, screen } from "@testing-library/react"

beforeAll(() => {
    render(<App />)
})

describe('events api', () => {
    it('fire event', () => {
        fireEvent(
            screen.getByText('send'),
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            }),
        )
        
        fireEvent.click(screen.getByText('submit'), {
            target: {
                value: 'button'
            }
        })
    })
})