/// <reference types="cypress" />

describe('E2E test', () => {
  it('Add contacts, toggle favorites, delete contact', () => {
    cy.visit('/');
    // Add first contact
    cy.get('[data-cy="add"]').click();
    cy.get('[data-cy="name-edit"] textarea:first-of-type').type('name1');
    cy.get('[data-cy="email-edit"] input').type('email@mail.com');
    cy.get('[data-cy="phone-edit"] input').type('+1 (123) 345 6789');
    cy.get('form[data-cy="contact-form"]:first-of-type button[data-cy="edit-save"]').click();

    // Add second contact
    cy.get('[data-cy="add"]').click();
    cy.get('[data-cy="name-edit"] textarea:first-of-type').type('name2');
    cy.get('[data-cy="email-edit"] input').type('email2@mail.com');
    // No phone - it is optional
    cy.get('form[data-cy="contact-form"]:first-of-type button[data-cy="edit-save"]').click();
    // Make favorite
    cy.get('form[data-cy="contact-form"]:first-of-type button[data-cy="favorite"]').click();

    // Add third contact
    cy.get('[data-cy="add"]').click();
    cy.get('[data-cy="name-edit"] textarea:first-of-type').type('name3');
    cy.get('[data-cy="email-edit"] input').type('email3@mail.com');
    // No phone - it is optional
    cy.get('form[data-cy="contact-form"]:first-of-type button[data-cy="edit-save"]').click();

    // Toggle 'show favorites'
    cy.get('[data-cy="show-favorites-switch"] input').check();

    // Check that we only have one contact in list
    cy.get('form[data-cy="contact-form"]').within(() => {
      cy.get('[data-cy="name"]').contains('name2')
      cy.get('[data-cy="email"]').contains('email2@mail.com')
      cy.get('[data-cy="phone"]').should('be.empty')
    })

    // Delete favorite contact
    cy.get('form[data-cy="contact-form"]:first-of-type [data-cy="delete"]').click();
    // Contact deleted. No contacts in list now
    cy.get('form[data-cy="contact-form"]').should('not.exist');

    // Toggle 'show favorites' to see all contacts
    cy.get('[data-cy="show-favorites-switch"] input').uncheck();

    // Now we should see only two contacts
    cy.get('form[data-cy="contact-form"]').should(f => {
      expect(f).to.have.length(2)
    })
  })
})