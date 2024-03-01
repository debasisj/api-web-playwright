import { test as base } from '@playwright/test'
import { SearchPage } from '../../pages/searchPage'
import { PersonalInfoPage } from '../../pages/personalInfoPage'

const data = {
  bookingDetails: [
    {
      name: 'Sydney',
      noOfAdults: 2,
    },
  ],
}

const test = base.extend<{
  searchPage: SearchPage
  personalInfoPage: PersonalInfoPage
}>({
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page)
    await searchPage.goTo(searchPage.url)
    await searchPage.ensureHotelSearchLoaded()
    await use(searchPage)
  },
  personalInfoPage: async ({ page }, use) => {
    const personalInfoPage = new PersonalInfoPage(page)
    await use(personalInfoPage)
  },
})

test.describe('Book a hotel end to end test', () => {
  data.bookingDetails.forEach((bookingDetail) => {
    test(`Should able to search for a hotel and a room in ${bookingDetail.name}`, async ({
      searchPage,
      personalInfoPage,
    }) => {
      await searchPage.fillSearchDetailsAndRetrieveHotels(
        bookingDetail.name,
        bookingDetail.noOfAdults
      )
      await searchPage.selectAHotelFromSearch()
      await searchPage.selectARoom()
      await personalInfoPage.fillPersonalInformation()
      await personalInfoPage.fillTravelerNames(bookingDetail.noOfAdults)
      // await personalInfoPage.selectPaymentGateway({ type: 'Stripe' })
      // await personalInfoPage.agreeAndBookConfirm()
      // await personalInfoPage.payForTheBooking()
    })
  })
})
