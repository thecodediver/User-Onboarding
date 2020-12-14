// write tests here
// - [ ]  Get the `Name` input and type a name in it.
// - [ ]  Use an assertion to check if the text inputted contains the name you provided (Hint: use the .should assertion)
// - [ ]  Get the `Email` input and type an email address in it
// - [ ] Get the `password` input and type a password in it
// - [ ]  Set up a test that will check to see if a user can check the terms of service box
// - [ ] Check to see if a user can submit the form data
// - [ ] Check for form validation if an input is left empty
describe("User Onboarding App", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  const nameInput = () => cy.get('input[name="name"]')
  const emailInput = () => cy.get('input[name="email"]')
  const passwordInput = () => cy.get('input[name="password"]')
  const agreeInput = () => cy.get('input[name="agree"]')
  const submitBtn = () => cy.get('button[id="submit"]')

  it('Get Name, Type A Name, Test Value', () => {
    nameInput()
      .type("James")
      .should('have.value', 'James')
  })

  it('Get Email, Type An Email, Test Value', () => {
    emailInput()
      .type("jamesjlundin@gmail.com")
      .should('have.value', 'jamesjlundin@gmail.com')
  })

  it('Get Password, Type Password, Test Value', () => {
    passwordInput()
      .type("fhsnidok2!FG")
      .should('have.value', 'fhsnidok2!FG')
  })

  it('Check Checkbox', () => {
    agreeInput()
      .check()
      .should('be.checked')
      .uncheck()
      .should('not.be.checked')
  })

  it('User can fill out fields and submit form', () => {
    nameInput()
      .type("James")

    emailInput()
      .type("jamesjlundin@gmail.com")

    passwordInput()
      .type("fhsnidok2!FG")

    agreeInput()
      .check()

    submitBtn()
      .click()
    
  })

  it('If a user doesn\'t fill out a field the submit button will remain disabled', () => {
    nameInput()
      .type("James")

    emailInput()
      .type("jamesjlundin@gmail.com")


    agreeInput()
      .check()

    submitBtn()
      .should('have.attr', 'disabled')
    
  })

})