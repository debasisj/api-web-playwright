import { fakerEN_AU as faker } from '@faker-js/faker'
import { off } from 'process'

export const wait = async (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))

export type User = {
  firstName: string
  lastName: string
  address: string
  email: string
  phone: string
}
export const user: User = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress({ useFullAddress: true }),
  email: faker.internet.email(),
  phone: faker.phone.number(),
}

export function getAFutureDate(offset: number): string {
  var currentDate = new Date(
    new Date().getTime() + offset * 24 * 60 * 60 * 1000
  )
  var day = ('0' + currentDate.getDate()).slice(-2)
  var month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
  var year = currentDate.getFullYear()
  return `${day}-${month}-${year}`
}
