import { main } from '../../src'
import requestMock from '../mocks/request'

describe('Image analyser test suite', () => {
  it('should successfully analyze an image and return the results', async () => {
    const expected = {
      statusCode: 200,
      body: '',
    }

    const result = await main(requestMock)

    expect(result).toStrictEqual(expected)
  })
  it.todo(
    'should return a status code 400 response when given an empty queryString',
  )
  it.todo(
    'should return a status code 400 response when given an invalid image url',
  )
})
