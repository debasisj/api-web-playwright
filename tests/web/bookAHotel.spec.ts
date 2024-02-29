import { test as base } from '@playwright/test'
import { SearchPage } from '../../pages/searchPage'
import { PersonalInfoPage } from '../../pages/personalInfoPage'

const noOfadults = 2

const test = base.extend<{
  searchPage: SearchPage
  personalInfoPage: PersonalInfoPage
}>({
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page)
    await searchPage.goTo()
    await searchPage.ensureHotelSearchLoaded()
    await use(searchPage)
  },
  personalInfoPage: async ({ page }, use) => {
    const personalInfoPage = new PersonalInfoPage(page)
    await use(personalInfoPage)
  },
})

test.describe('Book a hotel end to end test', () => {
  test.describe.configure({ mode: 'serial' })

  test('Should able to serach for a hotel and a room', async ({
    searchPage,
    personalInfoPage,
  }) => {
    await searchPage.fillSearchDetailsAndRetrieveHotels(noOfadults)
    await searchPage.selectAHotelFromSearch()
    await searchPage.selectARoom()
    await personalInfoPage.fillPersonalInformmation()
    await personalInfoPage.fillTravellerNames(noOfadults)
    // await personalInfoPage.selectPaymentGateway({ type: 'Stripe' })
    // await personalInfoPage.agreeAndBookConfirm()
    // await personalInfoPage.payForTheBooking()
  })
})
