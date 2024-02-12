class PaginationPage {

    // Locators 
    getHeading() {
        return cy.get('.pt-5')
    }

    getPreviousBtn() {
        return cy.get('#previous')
    }

    getNextBtn() {
        return cy.get('#next')
    }

    getImage() {
        return cy.get('.city_image')
    }

    getCityInfo() {
        return cy.get('.city_info')
    }

    getCountryInfo() {
        return cy.get('.country_info')
    }

    getPopulationInfo() {
        return cy.get('.population_info')
    }

    // Methods

    getBtn(text) {
        switch (text) {
            case 'Previous':
                return this.getPreviousBtn()

            case 'Next':
                return this.getNextBtn()

            default:
                throw new Error(`${text} button is not found`)
        }
    }

    getInfo() {
        return cy.get('.city_info, .country_info, .population_info')
    }

}

module.exports = PaginationPage