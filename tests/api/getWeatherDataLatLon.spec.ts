import { expect, test } from '@playwright/test'
import { watherbit_api_key } from '../../playwright.config'
const data = {
  cities: [
    {
      lat: '32.6596',
      lon: '-86.7178',
      name: 'Billingsley',
    },
    {
      lat: '-33.8054',
      lon: '151.0739',
      name: 'West Ryde',
    },
  ],
}
data.cities.forEach((city) => {
  test(`Get weather data for ${city.name} based on latitude and longitude data`, async ({
    request,
  }) => {
    const response = await request.get('/v2.0/current', {
      params: {
        lat: city.lat,
        lon: city.lon,
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
