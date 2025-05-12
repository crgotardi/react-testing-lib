import { cleanup, render, screen } from '@testing-library/react'
import Button from '../../components/Button/Button'

describe('configure section', () => {
    it('cleanup api', () => {
        // Unmounts React trees that were mounted with render.
        render(<Button onClick={vi.fn()}>Click me</Button>)
        cleanup()
        expect(screen.queryByText('Click me')).toBeNull()
    })
})