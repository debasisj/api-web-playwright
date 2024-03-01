import { Page } from '@playwright/test'

export default abstract class BasePage {
  readonly page: Page
  readonly url: string

  constructor(page: Page, url: string) {
    this.page = page
    this.url = url
  }

  async goTo(path: string) {
    await this.page.goto(path, {
      waitUntil: 'domcontentloaded',
      timeout: 60 * 1000,
    })
  }

  async reload() {
    this.page.reload()
  }
}
