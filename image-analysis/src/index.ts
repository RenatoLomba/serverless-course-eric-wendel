import aws from 'aws-sdk'

import { Handler } from './handler'

const rekognitionService = new aws.Rekognition()
const translateService = new aws.Translate()

const handler = new Handler(rekognitionService, translateService)

type HandlerMainFn = typeof handler.main

export const main: HandlerMainFn = handler.main.bind(handler)
