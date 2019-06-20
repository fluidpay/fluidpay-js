import Fluidpay from './../src/index'
import {
  RecurrenceRequest, RecurrenceResponse, RecurrencesResponse,
  PlanRequest, PlanResponse, PlansResponse,
  SubscriptionRequest, SubscriptionResponse, SubscriptionsResponse
} from './../src/recurring'
import { CreateCustomerRequest, CustomerResponse } from './../src/customers'
import { Chance } from 'chance'
import * as moment from 'moment'
import { testApiKey } from './_testkeys'

const chance = new Chance()

const creAonReq: RecurrenceRequest = {
  name: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
  description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
  amount: chance.natural({ max: 1000 }),
  duration: chance.natural({ max: 60 })
}

const updAonReq: RecurrenceRequest = {
  name: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
  description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
  amount: chance.natural({ max: 1000 }),
  duration: chance.natural({ max: 60 })
}

const creDisReq: RecurrenceRequest = {
  name: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
  description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
  amount: chance.natural({ max: 1000 }),
  duration: chance.natural({ max: 60 })
}

const updDisReq: RecurrenceRequest = {
  name: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
  description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
  amount: chance.natural({ max: 1000 }),
  duration: chance.natural({ max: 60 })
}

test('testing handling add ons', () => {
  jest.setTimeout(20000)
  const fp = new Fluidpay({
    apiKey: testApiKey,
    environment: 'development'
  })

  return testCreateAddOn(fp)
})

const testCreateAddOn = (fp: Fluidpay) => {
  return fp.createAddOn(creAonReq)
    .then((res: any) => {
      const creAonRes: RecurrenceResponse = res
      expect(creAonRes.msg).toBe('success')
      const id = (creAonRes.data as any).id

      return testGetAddOn(fp, id)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testGetAddOn = (fp: Fluidpay, addOnID: string) => {
  return fp.getAddOn(addOnID)
    .then((res: any) => {
      const getAonRes: RecurrencesResponse = res
      expect(getAonRes.msg).toBe('success')

      return testGetAddOns(fp, addOnID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testGetAddOns = (fp: Fluidpay, addOnID: string) => {
  return fp.getAddOns()
    .then((res: any) => {
      const getAonsRes: RecurrencesResponse = res
      expect(getAonsRes.msg).toBe('success')
      expect(getAonsRes.total_count).not.toBe(0)

      return testUpdateAddOn(fp, addOnID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testUpdateAddOn = (fp: Fluidpay, addOnID: string) => {
  return fp.updateAddOn(updAonReq, addOnID)
    .then((res: any) => {
      const updAonRes: RecurrenceResponse = res
      expect(updAonRes.msg).toBe('success')

      return testDeleteAddOn(fp, addOnID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testDeleteAddOn = (fp: Fluidpay, addOnID: string) => {
  return fp.deleteAddOn(addOnID)
    .then((res: any) => {
      const delAonRes: RecurrenceResponse = res
      expect(delAonRes.msg).toBe('success')
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

test('testing handling discounts', () => {
  const fp = new Fluidpay({
    apiKey: testApiKey,
    environment: 'development'
  })

  return testCreateDiscount(fp)
})

const testCreateDiscount = (fp: Fluidpay) => {
  return fp.createDiscount(creDisReq)
    .then((res: any) => {
      const creDisRes: RecurrenceResponse = res
      expect(creDisRes.msg).toBe('success')
      const id = (creDisRes.data as any).id

      return testGetDiscount(fp, id)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testGetDiscount = (fp: Fluidpay, discID: string) => {
  return fp.getDiscount(discID)
    .then((res: any) => {
      const getDisRes: RecurrencesResponse = res
      expect(getDisRes.msg).toBe('success')

      return testGetDiscounts(fp, discID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testGetDiscounts = (fp: Fluidpay, discID: string) => {
  return fp.getDiscounts()
    .then((res: any) => {
      const getDissRes: RecurrencesResponse = res
      expect(getDissRes.msg).toBe('success')
      expect(getDissRes.total_count).not.toBe(0)

      return testUpdateDiscount(fp, discID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testUpdateDiscount = (fp: Fluidpay, discID: string) => {
  return fp.updateDiscount(updDisReq, discID)
    .then((res: any) => {
      const updDisRes: RecurrenceResponse = res
      expect(updDisRes.msg).toBe('success')

      return testDeleteDiscount(fp, discID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testDeleteDiscount = (fp: Fluidpay, discID: string) => {
  return fp.deleteDiscount(discID)
    .then((res: any) => {
      const delDisRes: RecurrenceResponse = res
      expect(delDisRes.msg).toBe('success')
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const creCusReq: CreateCustomerRequest = {
  description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
  payment_method: {
    card: {
      card_number: chance.cc({ type: 'Mastercard' }),
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

test('testing handling plans and subscriptions', () => {
  const fp = new Fluidpay({
    apiKey: testApiKey,
    environment: 'development'
  })

  return testCreateCustomer(fp)
})

const testCreateCustomer = (fp: Fluidpay) => {
  return fp.createCustomer(creCusReq)
    .then((res: any) => {
      const creCusRes: CustomerResponse = res
      expect(creCusRes.msg).toBe('success')
      const cusID = (creCusRes.data as any).id

      return testCreateAddOn2(fp, cusID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testCreateAddOn2 = (fp: Fluidpay, cusID: string) => {
  return fp.createAddOn(creAonReq)
    .then((res: any) => {
      const creAonRes: RecurrenceResponse = res
      expect(creAonRes.msg).toBe('success')
      const addOnID = (creAonRes.data as any).id

      return testCreateDiscount2(fp, cusID, addOnID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testCreateDiscount2 = (fp: Fluidpay, cusID: string, addOnID: string) => {
  return fp.createDiscount(creDisReq)
    .then((res: any) => {
      const creDisRes: RecurrenceResponse = res
      expect(creDisRes.msg).toBe('success')
      const discID = (creDisRes.data as any).id

      return testCreatePlan(fp, cusID, addOnID, discID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testCreatePlan = (fp: Fluidpay, cusID: string, addOnID: string, discID: string) => {
  const crePlaReq: PlanRequest = {
    name: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
    description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
    amount: chance.natural({ max: 1000 }),
    billing_cycle_interval: 1,
    billing_frequency: 'twice_monthly',
    billing_days: '1,15',
    duration: chance.natural({ max: 10 }),
    add_ons: [{
      id: addOnID,
      description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
      amount: chance.natural({ max: 1000 }),
      duration: chance.natural({ max: 60 })
    }],
    discounts: [{
      id: discID,
      description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
      amount: chance.natural({ max: 1000 }),
      duration: chance.natural({ max: 60 })
    }]
  }

  return fp.createPlan(crePlaReq)
    .then((res: any) => {
      const crePlaRes: PlanResponse = res
      expect(crePlaRes.msg).toBe('success')
      const plaID = (crePlaRes.data as any).id

      return testGetPlan(fp, cusID, addOnID, discID, plaID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testGetPlan = (fp: Fluidpay, cusID: string, addOnID: string, discID: string, plaID: string) => {
  return fp.getPlan(plaID)
    .then((res: any) => {
      const getPlaRes: PlansResponse = res
      expect(getPlaRes.msg).toBe('success')

      return testGetPlans(fp, cusID, addOnID, discID, plaID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testGetPlans = (fp: Fluidpay, cusID: string, addOnID: string, discID: string, plaID: string) => {
  return fp.getPlans()
    .then((res: any) => {
      const getPlasRes: PlansResponse = res
      expect(getPlasRes.msg).toBe('success')
      expect(getPlasRes.total_count).not.toBe(0)

      return testUpdatePlan(fp, cusID, addOnID, discID, plaID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testUpdatePlan = (fp: Fluidpay, cusID: string, addOnID: string, discID: string, plaID: string) => {
  const updPlaReq: PlanRequest = {
    name: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
    description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
    amount: chance.natural({ max: 1000 }),
    billing_cycle_interval: 1,
    billing_frequency: 'twice_monthly',
    billing_days: '1,15',
    duration: chance.natural({ max: 10 }),
    add_ons: [{
      id: addOnID,
      description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
      amount: chance.natural({ max: 1000 }),
      duration: chance.natural({ max: 60 })
    }],
    discounts: [{
      id: discID,
      description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
      amount: chance.natural({ max: 1000 }),
      duration: chance.natural({ max: 60 })
    }]
  }

  return fp.updatePlan(updPlaReq, plaID)
    .then((res: any) => {
      const updPlaRes: PlanResponse = res
      expect(updPlaRes.msg).toBe('success')

      return testCreateSubscription(fp, cusID, addOnID, discID, plaID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testCreateSubscription = (fp: Fluidpay, cusID: string, addOnID: string, discID: string, plaID: string) => {
  const creSubReq: SubscriptionRequest = {
    plan_id: plaID,
    description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
    customer: {
      id: cusID
    },
    amount: chance.natural({ max: 1000 }),
    billing_cycle_interval: 1,
    billing_frequency: 'twice_monthly',
    billing_days: '1,15',
    duration: chance.natural({ max: 60 }),
    next_bill_date: moment().add(1, 'days').format('YYYY-MM-DD'),
    discounts: [{
      id: discID,
      name: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
      description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
      amount: chance.natural({ max: 1000 }),
      duration: chance.natural({ max: 60 })
    }]
  }

  return fp.createSubscription(creSubReq)
    .then((res: any) => {
      const creSubRes: SubscriptionResponse = res
      expect(creSubRes.msg).toBe('success')
      const subID = creSubRes.data.id

      return testGetSubscription(fp, cusID, addOnID, discID, plaID, subID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testGetSubscription = (fp: Fluidpay, cusID: string, addOnID: string, discID: string, plaID: string, subID: string) => {
  return fp.getSubscription(subID)
    .then((res: any) => {
      const getSubRes: SubscriptionsResponse = res
      expect(getSubRes.msg).toBe('success')

      return testUpdateSubscription(fp, cusID, addOnID, discID, plaID, subID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testUpdateSubscription = (fp: Fluidpay, cusID: string, addOnID: string, discID: string, plaID: string, subID: string) => {
  const updSubReq: SubscriptionRequest = {
    plan_id: plaID,
    description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
    customer: {
      id: cusID
    },
    amount: chance.natural({ max: 1000 }),
    billing_cycle_interval: 1,
    billing_frequency: 'twice_monthly',
    billing_days: '1,15',
    duration: chance.natural({ max: 60 }),
    next_bill_date: moment().add(1, 'days').format('YYYY-MM-DD'),
    discounts: [{
      id: discID,
      name: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
      description: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }),
      amount: chance.natural({ max: 1000 }),
      duration: chance.natural({ max: 60 })
    }]
  }

  return fp.updateSubscription(updSubReq, subID)
    .then((res: any) => {
      const updSubRes: SubscriptionResponse = res
      expect(updSubRes.msg).toBe('success')

      return testDeleteSubscription(fp, cusID, addOnID, discID, plaID, subID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testDeleteSubscription = (fp: Fluidpay, cusID: string, addOnID: string, discID: string, plaID: string, subID: string) => {
  return fp.deleteSubscription(subID)
    .then((res: any) => {
      const delSubRes: SubscriptionResponse = res
      expect(delSubRes.msg).toBe('success')

      return testDeletePlan(fp, cusID, addOnID, discID, plaID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testDeletePlan = (fp: Fluidpay, cusID: string, addOnID: string, discID: string, plaID: string) => {
  return fp.deletePlan(plaID)
    .then((res: any) => {
      const delPlaRes: PlanResponse = res
      expect(delPlaRes.msg).toBe('success')

      return testDeleteAddOn2(fp, cusID, addOnID, discID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testDeleteAddOn2 = (fp: Fluidpay, cusID: string, addOnID: string, discID: string) => {
  return fp.deleteAddOn(addOnID)
    .then((res: any) => {
      const delAonRes: RecurrenceResponse = res
      expect(delAonRes.msg).toBe('success')

      return testDeleteDiscount2(fp, cusID, discID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testDeleteDiscount2 = (fp: Fluidpay, cusID: string, discID: string) => {
  return fp.deleteDiscount(discID)
    .then((res: any) => {
      const delDisRes: RecurrenceResponse = res
      expect(delDisRes.msg).toBe('success')

      return testDeleteCustomer(fp, cusID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testDeleteCustomer = (fp: Fluidpay, cusID: string) => {
  return fp.deleteCustomer(cusID)
    .then((res: any) => {
      const delCusRes: CustomerResponse = res
      expect(delCusRes.msg).toBe('success')
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}
