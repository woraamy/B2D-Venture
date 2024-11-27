
describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000')
    cy.viewport(1920, 1080)

  })
})