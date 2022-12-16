/// <reference types="cypress" />
import HomePage from '../../src/pages/HomePage.js'

describe('frontendtest1.cy.js', () => {
  it('playground', () => {
    cy.mount(<HomePage/>)
    cy.get('#1').should('have.attr', 'src')
    cy.get('#2').should('have.attr', 'src')
    cy.get('#3').should('have.attr', 'src')
    cy.get('#4').should('have.attr', 'src')
    cy.get('#5').should('have.attr', 'src')

  })
})