/* eslint-disable import/first */
import aws from 'aws-sdk'

aws.config.update({
  region: 'us-east-1',
})

import { main } from '../../src'
import requestMock from '../mocks/request'

describe('Image analyser test suite', () => {
  beforeAll(() => {})

  it('should successfully analyze an image and return the results', async () => {
    const expected = {
      statusCode: 200,
      body:
        'A imagem tem\n' +
        '100.00% de ser do tipo Golden Retriever\n' +
        '100.00% de ser do tipo cão\n' +
        '100.00% de ser do tipo canino\n' +
        '100.00% de ser do tipo animal de estimação\n' +
        '100.00% de ser do tipo animal\n' +
        '100.00% de ser do tipo mamífero',
    }

    const result = await main(requestMock)

    expect(result).toStrictEqual(expected)
  })

  it('should return a status code 400 response when given an empty queryString', async () => {
    const expected = {
      statusCode: 400,
      body: 'Query param "imageUrl" is required',
    }

    const invalidRequestMock = {
      ...requestMock,
      queryStringParameters: {},
    }

    const result = await main(invalidRequestMock)

    expect(result).toStrictEqual(expected)
  })

  it('should return a status code 500 response when given an invalid image url', async () => {
    const expected = {
      statusCode: 500,
      body: 'Internal Server Error',
    }

    const invalidRequestMock = {
      ...requestMock,
      queryStringParameters: {
        imageUrl: 'test',
      },
    }

    const result = await main(invalidRequestMock)

    expect(result).toStrictEqual(expected)
  })
})
