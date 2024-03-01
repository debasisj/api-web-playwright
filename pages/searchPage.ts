import { expect, Page, Locator } from '@playwright/test'
import { getAFutureDate, wait } from '../utils'
import BasePage from './basePage'

export type BookingDetails = {
  city: string
  checkIn: string
  checkout: string
}

export class SearchPage extends BasePage {
  private readonly hotelSearch: Locator
  private readonly searchContainer: Locator
  private readonly searchCityInput: Locator
  private readonly checkInDateInput: Locator
  private readonly checkOutDateInput: Locator
  private readonly travelers: Locator
  private readonly rooms: Locator
  private readonly adults: Locator
  private readonly child: Locator
  private readonly nationality: Locator
  private readonly searchBtn: Locator
  private readonly cardItem: Locator
  constructor(page: Page) {
    super(page, '/hotels')
    this.hotelSearch = this.page.locator('#hotels-search')
    this.searchContainer = this.page.getByTitle(' Search by City')
    this.searchCityInput = this.page.locator('.select2-search__field')
    this.checkInDateInput = this.page.locator('#checkin')
    this.checkOutDateInput = this.page.locator('#checkout')
    this.travelers = this.page.locator('.travellers')
    this.rooms = this.page.locator('#hotels_rooms')
    this.adults = this.page.locator('#hotels_adults')
    this.child = this.page.locator('#hotels_childs')
    this.nationality = this.page.locator('#nationality')
    this.searchBtn = this.page.locator('.search_button')
    this.cardItem = this.page.locator('.card--item')
  }

  async ensureHotelSearchLoaded() {
    await expect(this.hotelSearch).toBeVisible()
  }

  async getNoOfSearchResults() {
    const noOfHotels = await this.cardItem.count()
    return noOfHotels
  }
  async fillSearchDetailsAndRetrieveHotels(city: string, noOfAdults: number) {
    await this.searchContainer.click()
    await this.searchCityInput.fill(city)
    await this.page
      .locator('#select2-hotels_city-results')
      .filter({ hasText: city })
      .click()
    const isHide = await this.page.getByText('Hide').isVisible()
    if (isHide) await this.page.getByText('Hide').click()
    await this.checkInDateInput.fill(getAFutureDate(3))
    await this.checkOutDateInput.fill(getAFutureDate(7))

    await this.travelers.click()
    await this.rooms.fill('1')
    await this.adults.fill(`${noOfAdults}`)
    await this.child.fill('0')
    await this.nationality.selectOption('AU')

    await this.searchBtn.click()
    await expect(this.cardItem.first()).toBeVisible()
    expect(await this.getNoOfSearchResults()).toBeGreaterThan(0)
  }

  async selectAHotelFromSearch() {
    const cnt = await this.getNoOfSearchResults()
    const nthHotel = Math.floor(Math.random() * (cnt - 1)) + 1
    await this.page
      .getByRole('link', { name: 'View More' })
      .nth(nthHotel)
      .click()
  }

  async selectARoom() {
    await this.page
      .getByRole('button')
      .filter({ hasText: 'Book Now' })
      .first()
      .click()
    await expect(this.page.getByPlaceholder('First Name').first()).toBeVisible()
  }
}
