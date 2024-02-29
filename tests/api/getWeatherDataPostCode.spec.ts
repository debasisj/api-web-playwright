import { expect, test } from '@playwright/test'
import { watherbit_api_key } from '../../playwright.config'
import { compileFunction } from 'vm'
const data = {
  cities: [
    {
      postcode: '36006',
      country: 'us',
      name: 'Billingsley',
    },
    {
      postcode: '2114',
      country: 'au',
      name: 'West Ryde',
    },
  ],
}
data.cities.forEach((city) => {
  test(`Should get weather data for ${city.name} based on post code data`, async ({
    request,
  }) => {
    const response = await request.get('/v2.0/current', {
      params: {
        postal_code: city.postcode,
        country: city.country,
        key: watherbit_api_key || '',
      },
    })
    expect(response.ok).toBeTruthy()
    const responseJson: any = await response.json()
    expect(responseJson).not.toContain('error')
    expect(responseJson.data[0].city_name).toEqual(city.name)
    expect(responseJson.data[0].app_temp).toBeTruthy()
    expect(responseJson.data[0].weather).toBeTruthy()
  })
})

test('Should not get weather data when there postcode does not belong to the country', async ({
  request,
}) => {
  const response = await request.get('/v2.0/current', {
    params: {
      postal_code: 'fhjgjhfd',
      country: 'us',
      key: watherbit_api_key || '',
    },
  })
  expect(response.ok).toBeTruthy()

  const responseJson: any = await response.json()
  expect(responseJson.data[0].city_name).toBeUndefined()
})
