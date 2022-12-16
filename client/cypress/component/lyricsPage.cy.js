/// <reference types="cypress" />
import LyricsPage from '../../src/pages/LyricsPage.js'

describe('frontendtest2.cy.js', () => {
  it('playground', () => {
    cy.mount(<LyricsPage/>)
    cy.get('#1').should('contain.text', 'Song')
    cy.get('#2').should('contain.text', 'Artist')
    cy.get('#3').should('contain.text', 'Search')
    cy.get('#4').should('contain.text', 'Title')
    cy.get('#5').should('contain.text', 'Artist')
    cy.get('#6').should('contain.text', 'Year')
    cy.get('#7').should('contain.text', 'Album')

  })
})