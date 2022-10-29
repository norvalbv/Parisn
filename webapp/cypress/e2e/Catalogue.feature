Feature: I am check the catalogue page

    Background:
        Given I am on the dashboard

    Scenario: I go to the catalogue page
        When I click on the "Catalogue" nav link
        Then I should see "Shoes" on the page