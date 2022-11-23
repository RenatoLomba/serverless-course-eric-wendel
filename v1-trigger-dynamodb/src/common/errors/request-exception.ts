export class RequestException {
  constructor(public statusCode: number, public errors: unknown[]) {}
}
