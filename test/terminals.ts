import Fluidpay from './../src/index'
import { testApiKey } from '../src/utils'
import { TerminalsResponse } from './../src/terminals'

test('testing handling terminals', () => {
  const key = testApiKey
  const fp = new Fluidpay({
    apiKey: key,
    localDev: true
  })

  return testGetTerminals(fp)
})

const testGetTerminals = (fp: Fluidpay) => {
  return fp.getTerminals()
    .then((res: any) => {
      const getTerRes: TerminalsResponse = res.data
      expect(getTerRes.msg).toBe('success')
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}
