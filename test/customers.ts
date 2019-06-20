import Fluidpay from './../src/index'
import {
  CreateCustomerRequest, UpdateCustomerRequest, CustomerResponse,
  CustomerAddressRequest, CustomerAddressResponse, CustomerAddressesResponse,
  CustomerPaymentRequest, CustomerPaymentResponse, CustomerPaymentsResponse
} from './../src/customers'
import { Chance } from 'chance'
import { testApiKey } from './_testkeys'

const chance = new Chance()

const creCusReq: CreateCustomerRequest = {
  description: chance.string({ pool: 'abcABC0123' }),
  payment_method: {
    card: {
      card_number: chance.cc({ type: 'Mastercard'}),
      expiration_date: '12/30'
    }
  },
  billing_address: {
    first_name: chance.first(),
    last_name: chance.last(),
    company: chance.company(),
    address_line_1: chance.address(),
    city: chance.city(),
    state: chance.state(),
    postal_code: '60601',
    country: 'US',
    email: chance.email(),
    phone: chance.phone(),
    fax: chance.phone()
  },
  shipping_address: {
    first_name: chance.first(),
    last_name: chance.last(),
    company: chance.company(),
    address_line_1: chance.address(),
    city: chance.city(),
    state: chance.state(),
    postal_code: '60601',
    country: 'US',
    email: chance.email(),
    phone: chance.phone(),
    fax: chance.phone()
  }
}

const creCusAdrReq: CustomerAddressRequest = {
  first_name: chance.first(),
  last_name: chance.last(),
  company: chance.company(),
  address_line_1: chance.address(),
  city: chance.city(),
  state: chance.state(),
  postal_code: '60601',
  country: 'US',
  email: chance.email(),
  phone: chance.phone(),
  fax: chance.phone()
}

const updCusAdrReq: CustomerAddressRequest = {
  first_name: chance.first(),
  last_name: chance.last(),
  company: chance.company(),
  address_line_1: chance.address(),
  city: chance.city(),
  state: chance.state(),
  postal_code: '60601',
  country: 'US',
  email: chance.email(),
  phone: chance.phone(),
  fax: chance.phone()
}

const creCusPayReq: CustomerPaymentRequest = {
  card_number: chance.cc({ type: 'Mastercard'}),
  expiration_date: '12/30'
}

const updCusPayReq: CustomerPaymentRequest = {
  card_number: chance.cc({ type: 'Mastercard'}),
  expiration_date: '12/31'
}

test('testing handling customer tokens', () => {
  jest.setTimeout(20000)
  const fp = new Fluidpay({
    apiKey: testApiKey,
    environment: 'development'
  })

  return testCreateCustomer(fp)
})

const testCreateCustomer = (fp: Fluidpay) => {
  return fp.createCustomer(creCusReq)
    .then((res: any) => {
      const creCusRes: CustomerResponse = res.data
      expect(creCusRes.msg).toBe('success')
      const cusID = (creCusRes.data as any).id
      return testGetCustomer(fp, cusID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testGetCustomer = (fp: Fluidpay, cusID: string) => {
  return fp.getCustomer(cusID)
    .then((res: any) => {
      const getCusRes: CustomerResponse = res.data
      expect(getCusRes.msg).toBe('success')
      return testCreateCustomerAddress(fp, cusID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testCreateCustomerAddress = (fp: Fluidpay, cusID: string) => {
  return fp.createCustomerAddress(creCusAdrReq, cusID)
    .then((res: any) => {
      const creCusAdrRes: CustomerAddressResponse = res.data
      expect(creCusAdrRes.msg).toBe('success')

      const adrID = (creCusAdrRes.data as any).id
      return testGetCustomerAddresses(fp, cusID, adrID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testGetCustomerAddresses = (fp: Fluidpay, cusID: string, adrID: string) => {
  return fp.getCustomerAddresses(cusID)
    .then((res: any) => {
      const getAllCusAdrRes: CustomerAddressesResponse = res.data
      expect(getAllCusAdrRes.msg).toBe('success')
      expect(getAllCusAdrRes.total_count).not.toBe(0)

      return testGetCustomerAddress(fp, cusID, adrID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testGetCustomerAddress = (fp: Fluidpay, cusID: string, adrID: string) => {
  return fp.getCustomerAddress(cusID, adrID)
    .then((res: any) => {
      const getCusAdrRes: CustomerAddressesResponse = res.data
      expect(getCusAdrRes.msg).toBe('success')

      return testUpdateCustomerAddress(fp, cusID, adrID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testUpdateCustomerAddress = (fp: Fluidpay, cusID: string, adrID: string) => {
  return fp.updateCustomerAddress(updCusAdrReq, cusID, adrID)
    .then((res: any) => {
      const updCusAdrRes: CustomerAddressResponse = res.data
      expect(updCusAdrRes.msg).toBe('success')

      return testCreateCustomerPayment(fp, cusID, adrID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testCreateCustomerPayment = (fp: Fluidpay, cusID: string, adrID: string) => {
  return fp.createCustomerPayment(creCusPayReq, cusID, 'card')
    .then((res: any) => {
      const creCusPayRes: CustomerPaymentResponse = res.data
      expect(creCusPayRes.msg).toBe('success')

      const payID = (creCusPayRes.data as any).card.id
      return testGetCustomerPayments(fp, cusID, adrID, payID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testGetCustomerPayments = (fp: Fluidpay, cusID: string, adrID: string, payID: string) => {
  return fp.getCustomerPayments(cusID, 'card')
    .then((res: any) => {
      const getAllCusPayRes: CustomerPaymentsResponse = res.data
      expect(getAllCusPayRes.msg).toBe('success')
      expect(getAllCusPayRes.total_count).not.toBe(0)

      return testGetCustomerPayment(fp, cusID, adrID, payID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testGetCustomerPayment = (fp: Fluidpay, cusID: string, adrID: string, payID: string) => {
  return fp.getCustomerPayment(cusID, 'card', payID)
    .then((res: any) => {
      const getCusPayRes: CustomerPaymentsResponse = res.data
      expect(getCusPayRes.msg).toBe('success')

      // return testUpdateCustomerPayment(fp, cusID, adrID, payID);
      return testUpdateCustomer(fp, cusID, adrID, payID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testUpdateCustomerPayment = (fp: Fluidpay, cusID: string, adrID: string, payID: string) => {
  return fp.updateCustomerPayment(updCusPayReq, cusID, 'card', payID)
    .then((res: any) => {
      const updCusPayRes: CustomerPaymentResponse = res.data
      expect(updCusPayRes.msg).toBe('success')

      return testUpdateCustomer(fp, cusID, adrID, payID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testUpdateCustomer = (fp: Fluidpay, cusID: string, adrID: string, payID: string) => {
  const updCusReq: UpdateCustomerRequest = {
    description: 'test update description',
    payment_method: 'card',
    payment_method_id: payID,
    billing_address_id: adrID,
    shipping_address_id: adrID
  }

  return fp.updateCustomer(updCusReq, cusID)
    .then((res: any) => {
      const updCusRes: CustomerResponse = res.data
      expect(updCusRes.msg).toBe('success')

      // return testDeleteCustomerAddress(fp, cusID, adrID, payID);
      return testDeleteCustomer(fp, cusID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testDeleteCustomerAddress = (fp: Fluidpay, cusID: string, adrID: string, payID: string) => {
  return fp.deleteCustomerAddress(cusID, adrID)
    .then((res: any) => {
      const delCusAdrRes: CustomerAddressResponse = res.data
      expect(delCusAdrRes.msg).toBe('success')

      return testDeleteCustomerPayment(fp, cusID, payID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testDeleteCustomerPayment = (fp: Fluidpay, cusID: string, payID: string) => {
  return fp.deleteCustomerPayment(cusID, 'card', payID)
    .then((res: any) => {
      const delCusPayRes: CustomerPaymentResponse = res.data
      expect(delCusPayRes.msg).toBe('success')

      return testDeleteCustomer(fp, cusID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testDeleteCustomer = (fp: Fluidpay, cusID: string) => {
  return fp.deleteCustomer(cusID)
    .then((res: any) => {
      const delCusRes: CustomerResponse = res.data
      expect(delCusRes.msg).toBe('success')
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}
