import Fluidpay from './../src/index'
import { TerminalsResponse } from './../src/terminals'
import { testApiKey } from './_testkeys'

test('testing handling terminals', () => {
  const fp = new Fluidpay({
    apiKey: testApiKey,
    environment: 'development'
  })

  return testGetTerminals(fp)
})

const testGetTerminals = (fp: Fluidpay) => {
  return fp.getTerminals()
    .then((res: any) => {
      const getTerRes: TerminalsResponse = res
      expect(getTerRes.status).toBe('success')
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}
