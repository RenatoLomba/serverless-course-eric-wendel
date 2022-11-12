import { Rekognition, Translate } from 'aws-sdk'
import { Handler } from './handler'

const rekognitionService = new Rekognition()
const translateService = new Translate()

const handler = new Handler(
  rekognitionService, 
  translateService 
)

export const main = handler.main.bind(handler)
