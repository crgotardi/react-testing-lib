import { configure } from '@testing-library/react'

describe('configure section', () => { 
    it('configure api', () => {
        configure({
            reactStrictMode: true
        })
    })
})