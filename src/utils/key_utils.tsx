export function generateUniqueKey(): string {
  const timestamp = new Date().getTime()
  const random = Math.floor(Math.random() * 1000000) // Número aleatorio entre 0 y 999999
  return `${timestamp}-${random}`
}
