/// <reference types="cypress" />
import SearchPage from '../../src/pages/SearchPage.js'

describe('frontendtest3.cy.js', () => {
  it('playground', () => {
    cy.mount(<SearchPage/>)
    cy.get('#1').should('contain.text', 'Search By')
    cy.get('#8').should('contain.text', 'Filter By')
    cy.get('#9').should('contain.text', 'Rank By')
    cy.get('#10').should('contain.text', 'Order By')

  })
})