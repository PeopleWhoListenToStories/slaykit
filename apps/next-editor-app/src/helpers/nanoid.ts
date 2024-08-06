import { customAlphabet } from 'nanoid'

export const generateNanoId = (): string => {
  const nanoid = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', 10)
  return nanoid()
}
