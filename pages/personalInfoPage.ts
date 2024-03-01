import { expect, Page, Locator } from '@playwright/test'
import { user } from '../utils'
import BasePage from './basePage'

export interface PaymentGateway {
  type: 'Stripe' | 'Paypal' | 'Bank Transfer'
}
export class PersonalInfoPage extends BasePage {
  private readonly firstName: Locator
  private readonly lastName: Locator
  private readonly email: Locator
  private readonly phone: Locator
  private readonly address: Locator
  private readonly country: Locator
  private readonly agreeChkBox: Locator
  private readonly bookingConfirmBtn: Locator
  private readonly proceedBtn: Locator

  constructor(page: Page) {
    super(page, '')
    this.firstName = this.page.getByPlaceholder('First Name').first()
    this.lastName = this.page.getByPlaceholder('Last Name').first()
    this.email = this.page.getByPlaceholder('Email').first()
    this.phone = this.page.getByPlaceholder('Phone').first()
    this.address = this.page.getByPlaceholder('Address').first()
    this.country = this.page.locator('.country').last()
    this.agreeChkBox = this.page.locator('#agreechb').first()
    this.agreeChkBox = this.page
      .getByText(' Booking Confirm', { exact: true })
      .first()
    this.proceedBtn = this.page.locator(`input[value='Proceed']`).first()
  }

  async fillPersonalInformation() {
    await this.firstName.fill(user.firstName)
    await this.lastName.fill(user.lastName)
    await this.email.fill(user.email)
    await this.phone.fill(user.phone)
    await this.address.fill(user.address)
    //await this.country.selectOption('AU')
  }
  async fillTravelerNames(num: number) {
    for (let i = 1; i <= num; i++) {
      this.page.locator(`[name=firstname_${i}]`).fill(user.firstName)
      this.page.locator(`[name=lastname_${i}]`).fill(user.lastName)
    }
  }

  async selectPaymentGateway(paymentGateway: PaymentGateway) {
    switch (paymentGateway.type) {
      case 'Stripe':
        await this.page.locator('#gateway_stripe').click()
        break
      case 'Paypal':
        await this.page.locator('#gateway_paypal').click()
        break
      case 'Bank Transfer':
        await this.page.locator('#gateway_bank_transfer').click()
        break
    }
  }

  async agreeAndBookConfirm() {
    await this.agreeChkBox.click()
    await this.bookingConfirmBtn.click()
    await expect(this.page.getByText('Payment Status')).toBeVisible()
  }
  async payForTheBooking() {
    await this.proceedBtn.click()
  }
}
