import { Rekognition, Translate } from 'aws-sdk'

import { Handler } from './handler'

const rekognitionService = new Rekognition()
const translateService = new Translate()

const handler = new Handler(rekognitionService, translateService)

type HandlerMainFn = typeof handler.main

export const main: HandlerMainFn = handler.main.bind(handler)
