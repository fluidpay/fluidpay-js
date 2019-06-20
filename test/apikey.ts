import Fluidpay from './../src/index'
import { KeyRequest, KeyResponse, KeysResponse } from './../src/apikey'
import { Chance } from 'chance'
import { testApiKey } from './_testkeys'

const chance = new Chance()

const keyReq: KeyRequest = {
  name: chance.string(),
  type: 'api'
}

test('testing handling api keys', () => {
  const fp = new Fluidpay({
    apiKey: testApiKey,
    environment: 'development'
  })

  return testCreateKey(fp)
})

const testCreateKey = (fp: Fluidpay) => {
  return fp.createKey(keyReq)
    .then((res: any) => {
      const creKeyRes: KeyResponse = res
      expect(creKeyRes.status).toBe('success')
      return testGetKeys(fp, creKeyRes.data.api_key)
    }).catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testGetKeys = (fp: Fluidpay, newKey: string) => {
  return fp.getKeys()
    .then((res: any) => {
      const getKeysRes: KeysResponse = res
      expect(getKeysRes.total_count).not.toBe(0)
      return testDeleteKey(fp, newKey)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testDeleteKey = (fp: Fluidpay, newKey: string) => {
  return fp.deleteKey(newKey)
    .then((res: any) => {
      const delKeyRes: KeyResponse = res
      expect(delKeyRes.msg).toBe('success')
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}
