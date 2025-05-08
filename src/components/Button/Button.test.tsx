import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Button from './Button'
import { expect } from 'vitest'

describe('button component', () => {
    it('render the component', () => {
        render(<Button>Click</Button>)
        const buttonElement = screen.getByRole('button')
        expect(buttonElement).toBeDefined()
    })

    it('call function on click', async () => {
        const onClick = vi.fn()
        render(<Button>Click</Button>)
        const buttonElement = screen.getByRole('button')
        await userEvent.click(buttonElement)
        expect(onClick).toHaveBeenCalled()
    })
})