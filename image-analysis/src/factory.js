const aws = require('aws-sdk')
const Handler = require('./handler')

const rekognitionService = new aws.Rekognition()
const translateService = new aws.Translate()

const handler = new Handler({ 
  rekognitionService, 
  translateService 
})

module.exports = handler.main.bind(handler)
