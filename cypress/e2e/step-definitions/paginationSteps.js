const { Given, Then, When } = require("@badeball/cypress-cucumber-preprocessor");
const PaginationPage = require('../../pages/PaginationPage')

import { recurse } from 'cypress-recurse'



const paginationPage = new PaginationPage()
Given("the user is on {string}", (url) => {
    cy.visit(url)
})


Then(/^the user should see the "([^"]*)" heading$/, (header) => {
	paginationPage.getHeading().should('include.text' ,header)
});


Then(/^the user should see the "([^"]*)" paragraph$/, (paragraph) => {
	paginationPage.getHeading().should('include.text', paragraph)
});


Then(/^the user should see the "([^"]*)" button is disabled$/, (text) => {
	paginationPage.getBtn(text).should('not.be.enabled')
});


Then(/^the user should see the "([^"]*)" button is enabled$/, (text) => {
	paginationPage.getBtn(text).should('be.enabled')
});


When(/^the user clicks on the "([^"]*)" button$/, (text) => {
	paginationPage.getBtn(text).click()
});


When(/^the user clicks on the "([^"]*)" button till it becomes disabled$/, (text) => {
    cy.on('fail', () => {
        return paginationPage.getBtn(text).should('not.be.enabled');
    })
    recurse(
        () => paginationPage.getBtn(text).should('be.enabled'),
        Cypress._.isEmpty, 
        {
            post() {
                paginationPage.getBtn(text).click()
            },
            delay: 1_000,
            limit: 10,
            timeout: 20_000,
            log: false,
        },
    )
});




Then(/^the user should see "([^"]*)" City with the info below and an image$/, (city, dataTable) => {
	const arr = dataTable.rawTable.flat()

    paginationPage.getCityInfo().should('contain', city)

    paginationPage.getInfo().each(($el, index) => {
        cy.wrap($el).should('have.text', arr[index])
    })

    paginationPage.getImage().should('be.visible')
});
