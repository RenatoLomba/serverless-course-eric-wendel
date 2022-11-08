export async function handler(event: unknown, context: unknown) {
  console.log('EVENT', JSON.stringify(event, null, 2))
  console.log('CONTEXT', context)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World from CLI UPDATED!'
    })
  }
}
