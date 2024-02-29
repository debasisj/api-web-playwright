import { expect, Page, Locator } from '@playwright/test'
import { getAFutureDate } from '../utils'

export type BookingDetails = {
  city: string
  checkIn: string
  checkout: string
}

export class SearchPage {
  private readonly hotelSearch: Locator
  private readonly serachContainer: Locator
  private readonly searchCityInput: Locator
  private readonly chceckInDateInput: Locator
  private readonly chceckOutDateInput: Locator
  private readonly travellers: Locator
  private readonly rooms: Locator
  private readonly adults: Locator
  private readonly childs: Locator
  private readonly nationality: Locator
  private readonly serachBtn: Locator
  private readonly cardItem: Locator
  constructor(public readonly page: Page) {
    this.hotelSearch = this.page.locator('#hotels-search')
    this.serachContainer = this.page.getByTitle(' Search by City')
    this.searchCityInput = this.page.locator('.select2-search__field')
    this.chceckInDateInput = this.page.locator('#checkin')
    this.chceckOutDateInput = this.page.locator('#checkout')
    this.travellers = this.page.locator('.travellers')
    this.rooms = this.page.locator('#hotels_rooms')
    this.adults = this.page.locator('#hotels_adults')
    this.childs = this.page.locator('#hotels_childs')
    this.nationality = this.page.locator('#nationality')
    this.serachBtn = this.page.locator('.search_button')
    this.serachBtn = this.page.locator('.search_button')
    this.cardItem = this.page.locator('.card--item')
  }

  async goTo() {
    await this.page.goto('/hotels', {
      waitUntil: 'load',
      timeout: 60 * 1000,
    })
  }

  async ensureHotelSearchLoaded() {
    await expect(this.hotelSearch).toBeVisible()
  }

  async getNoOfSerachResults() {
    const noOfHotels = await this.cardItem.count()
    return noOfHotels
  }
  async fillSearchDetailsAndRetrieveHotels(noOfAdults: number) {
    await this.serachContainer.click()
    await this.searchCityInput.fill('Sydney')
    await this.page
      .locator('#select2-hotels_city-results')
      .filter({ hasText: 'Sydney' })
      .click()

    await this.chceckInDateInput.fill(getAFutureDate(3))
    await this.chceckOutDateInput.fill(getAFutureDate(7))
    await this.travellers.click()
    await this.rooms.fill('1')
    await this.adults.fill(`${noOfAdults}`)
    await this.childs.fill('0')
    await this.nationality.selectOption('AU')
    const isHide = await this.page.getByText('Hide').isVisible()
    if (isHide) await this.page.getByText('Hide').click()
    await this.serachBtn.click()
    await expect(this.cardItem.first()).toBeVisible()
    expect(await this.getNoOfSerachResults()).toBeGreaterThan(0)
  }

  async selectAHotelFromSearch() {
    const cnt = await this.getNoOfSerachResults()
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
