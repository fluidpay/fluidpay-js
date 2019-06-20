import Fluidpay from './../src/index'
import {
  CreateCustomerRequest, CustomerResponse,
  CustomerAddressRequest, CustomerAddressResponse,
  CustomerPaymentRequest, CustomerPaymentResponse
} from './../src/customers'
import { TerminalsResponse } from './../src/terminals'
import {
  TransactionRequest, TransactionQueryRequest, TerminalResponse,
  TransactionSearchResponse, Address, TransactionCaptureRequest,
  TransactionResponse, TransactionRefundRequest
} from './../src/transactions'
import { Chance } from 'chance'
import { testApiKey } from './_testkeys'

const chance = new Chance()

const address: Address = {
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

const cardTransReq: TransactionRequest = {
  type: 'authorize',
  amount: chance.natural({ max: 9999 }),
  tax_amount: chance.natural({ max: 9999 }),
  shipping_amount: chance.natural({ max: 9999 }),
  currency: 'USD',
  description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
  order_id: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', length: 15 }),
  po_number: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', length: 15 }),
  ip_address: chance.ip(),
  email_reciept: true,
  email_address: chance.email(),
  payment_method: {
    card: {
      entry_type: 'keyed',
      number: chance.cc({ type: 'Mastercard' }),
      expiration_date: '12/30',
      cvc: chance.natural({ min: 100, max: 999 }).toString(),
      cardholder_authentication: {
        condition: '',
        eci: '',
        cavv: '',
        xid: ''
      }
    }
  },
  billing_address: address,
  shipping_address: address
}

const creCusReq: CreateCustomerRequest = {
  description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
  payment_method: {
    card: {
      card_number: chance.cc({ type: 'Mastercard' }),
      expiration_date: '12/30'
    }
  },
  billing_address: address,
  shipping_address: address
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

const creCusPayReq: CustomerPaymentRequest = {
  card_number: '4111111111111111',
  expiration_date: '12/30'
}

const queTransReq: TransactionQueryRequest = {
  transaction_id: {
    operator: '!=',
    value: 'b84vgb2j8m0jujadi4v0'
  },
  amount: {
    operator: '<',
    value: 0
  }
}

test('testing handling transactions', () => {
  jest.setTimeout(20000)
  const fp = new Fluidpay({
    apiKey: testApiKey,
    environment: 'development'
  })

  // return testCardTransaction(fp)
  return testCreateCustomer(fp)
})

const testCardTransaction = (fp: Fluidpay) => {
  return fp.doTransaction(cardTransReq)
    .then((res: any) => {
      const cardTransRes: TerminalResponse = res
      expect(cardTransRes.msg).toBe('success')

      return testCreateCustomer(fp)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testCreateCustomer = (fp: Fluidpay) => {
  return fp.createCustomer(creCusReq)
    .then((res: any) => {
      const creCusRes: CustomerResponse = res
      expect(creCusRes.msg).toBe('success')

      const cusID = (creCusRes.data as any).id
      return testCreateCustomerAddress(fp, cusID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testCreateCustomerAddress = (fp: Fluidpay, cusID: string) => {
  return fp.createCustomerAddress(creCusAdrReq, cusID)
    .then((res: any) => {
      const creCusAdrRes: CustomerAddressResponse = res
      expect(creCusAdrRes.msg).toBe('success')

      const adrID = (creCusAdrRes.data as any).id
      return testCreateCustomerPayment(fp, cusID, adrID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testCreateCustomerPayment = (fp: Fluidpay, cusID: string, adrID: string) => {
  return fp.createCustomerPayment(creCusPayReq, cusID, 'card')
    .then((res: any) => {
      const creCusPayRes: CustomerPaymentResponse = res
      expect(creCusPayRes.msg).toBe('success')

      const payID = (creCusPayRes.data as any).card.id
      return testCustomerTransaction(fp, cusID, adrID, payID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testCustomerTransaction = (fp: Fluidpay, cusID: string, adrID: string, payID: string) => {
  const custTransReq: TransactionRequest = {
    type: 'authorize',
    amount: 1112,
    tax_exempt: true,
    tax_amount: 100,
    shipping_amount: 100,
    currency: 'USD',
    description: 'test transaction',
    order_id: 'some order id',
    po_number: 'somePONumber',
    ip_address: '4.2.2.2',
    email_reciept: true,
    email_address: 'user@home.com',
    payment_method: {
      customer: {
        id: cusID,
        payment_method_type: 'card',
        payment_method_id: payID,
        billing_address_id: adrID,
        shipping_address_id: adrID
      }
    },
    billing_address: address,
    shipping_address: address
  }
  return fp.doTransaction(custTransReq)
    .then((res: any) => {
      const cusTransRes: TerminalResponse = res
      expect(cusTransRes.msg).toBe('success')

      return testGetTerminals(fp, cusTransRes)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testGetTerminals = (fp: Fluidpay, cusTransRes: TerminalResponse) => {
  return fp.getTerminals()
    .then((res: any) => {
      const getTerRes: TerminalsResponse = res
      expect(getTerRes.msg).toBe('success')
      expect(getTerRes.total_count).not.toBe(0)

      const termID = (getTerRes.data[0] as any).id

      return testTerminalTransaction(fp, termID, cusTransRes)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testTerminalTransaction = (fp: Fluidpay, termID: string, cusTransRes: TerminalResponse) => {
  const termTransReq: TransactionRequest = {
    type: 'sale',
    amount: chance.natural({ max: 9999 }),
    tax_amount: chance.natural({ max: 9999 }),
    shipping_amount: chance.natural({ max: 9999 }),
    currency: 'USD',
    description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
    order_id: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', length: 15 }),
    po_number: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', length: 15 }),
    ip_address: chance.ip(),
    email_reciept: true,
    email_address: chance.email(),
    payment_method: {
      terminal: {
        id: termID,
        expiration_date: '12/30',
        cvc: '9999',
        print_receipt: 'both',
        signature_required: true
      }
    },
    billing_address: address,
    shipping_address: address
  }
  return fp.doTransaction(termTransReq)
    .then((res: any) => {
      const termTransRes: TerminalResponse = res
      expect(termTransRes.msg).toBe('success')

      const termTransId = termTransRes.data ? termTransRes.data.id : ''


      // return testQueryTransaction(fp, termTransId, cusTransRes)
      return testVoidTransaction(fp, termTransId, cusTransRes)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testQueryTransaction = (fp: Fluidpay, termTransId: string, cusTransRes: TerminalResponse) => {
  return fp.queryTransaction(queTransReq)
    .then((res: any) => {
      const queTransRes: TransactionSearchResponse = res
      expect(queTransRes.msg).toBe('success')

      return testVoidTransaction(fp, termTransId, cusTransRes)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testVoidTransaction = (fp: Fluidpay, termTransId: string, cusTransRes: TerminalResponse) => {
  return fp.voidTransaction(termTransId)
    .then((res: any) => {
      const voidTransRes: TransactionResponse = res
      expect(voidTransRes.msg).toBe('success')

      return testCaptureTransaction(fp, cusTransRes)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testCaptureTransaction = (fp: Fluidpay, cusTransRes: TerminalResponse) => {
  const data = cusTransRes.data ? cusTransRes.data : {} as any
  const capTransReq: TransactionCaptureRequest = {
    amount: data.amount,
    tax_amount: data.tax_amount,
    tax_exempt: data.tax_exempt,
    shipping_amount: data.shipping_amount,
    order_id: data.order_id,
    po_number: data.po_number,
    ip_address: data.ip_address
  }

  return fp.captureTransaction(capTransReq, data.id)
    .then((res: any) => {
      const capTransRes: TransactionResponse = res
      expect(capTransRes.msg).toBe('success')

      // return testRefundTransaction(fp, cusTransRes)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testRefundTransaction = (fp: Fluidpay, cusTransRes: TerminalResponse) => {
  const data = cusTransRes.data ? cusTransRes.data : {} as any
  const refTransReq: TransactionRefundRequest = {
    amount: data.amount
  }
  return fp.refundTransacttion(refTransReq, data.id)
    .then((res: any) => {
      const refTransRes: TransactionResponse = res
      expect(refTransRes.msg).toBe('success')
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}
