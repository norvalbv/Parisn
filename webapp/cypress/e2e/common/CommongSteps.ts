import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the dashboard', () => {
  // This visit link is temp.
  cy.visit('http://127.0.0.1:5173/home');
});

When('I click on the {string} nav link', (string: string) => {
  cy.get(`[data-testid="${string} Nav Link"]`).first().click();
});

Then('I should see {string} on the page', (string: string) => {
  cy.get(`[data-testid="${string}"]`).contains(string);
});
