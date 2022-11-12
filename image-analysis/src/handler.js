module.exports = class Handler {
  constructor({
    rekognitionService,
    translateService
  }) {
    this.rekognitionService = rekognitionService
    this.translateService = translateService
  }

  async main(event) {
    console.log('EVENT', event)

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello Image Analysis!'
      }, null, 2)
    }
  }
}
