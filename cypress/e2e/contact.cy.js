/// <reference types="Cypress" />

describe('contacts', () => {
    beforeEach(()=>{
        cy.visit('/about');
    })
    it('form submission', () => {
      cy.getbyID('contact-input-message').type('Testing Cypress'); // using custom query
      cy.get('[data-cy="contact-input-name"]').type('Surya');
      cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
      cy.get('@submitBtn').then((el)=>{
        expect(el.attr('disabled')).to.be.undefined;
        expect(el.text()).to.be.eq('Send Message')
      })      
      cy.get('[data-cy="contact-input-email"]').type('snandipati@gmail.com{enter}');
      cy.get('@submitBtn').click();
      cy.get('@submitBtn').then((res)=>{
        expect(res.attr('disabled'));
        expect(res.text()).to.be.equal('Sending...')
      })
    //   cy.get('@submitBtn').contains('Sending...');
    //   cy.get('@submitBtn').should('have.attr','disabled');
    })

    it('form validation',()=>{
        cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
        // cy.get('@submitBtn').click();
        cy.submitForm(); // using custom command
        cy.get('@submitBtn').then((res)=>{
            expect(res.attr('disabled')).to.be.undefined;
            expect(res.text()).to.not.equal('Sending...');
          })

        cy.get('[data-cy="contact-input-message"]').as('input');
        cy.get('@input').focus().blur();
        cy.get('@input')
            .parent()
                .should('have.attr','class').should('match',/invalid/)
        
        // .then((el)=>{
        //     expect(el.attr('class')).to.contain('invalid')
        // })

        cy.get('[data-cy="contact-input-name"]').as('name');
        cy.get('@name').focus().blur();
        cy.get('@name').parent() .should('have.attr','class').should('match',/invalid/)
        
        // .then((res)=>{
        //     expect(res.attr('class')).to.contains('invalid')
        // })  
        
        cy.get('[data-cy="contact-input-email"]').as('email');
        cy.get('@email').focus().blur();
        cy.get('@email').parent() .should('have.attr','class').should('match',/invalid/)
        // .then((res)=>{
        //     expect(res.attr('class')).to.contains('invalid')
        // })
    })
})