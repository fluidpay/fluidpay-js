import Fluidpay from './../src/index'
import { testApiKey } from '../src/utils'
import { CreateUserRequest, ChangePasswordRequest, UpdateUserRequest, UserResponse, UsersResponse } from './../src/users'
import { KeyRequest, KeyResponse } from './../src/apikey'
import { Chance } from 'chance'

const chance = new Chance()

const username = 'A' + chance.string({ pool: 'abcABC0123', length: 10 })
const password = 'a1B!' + chance.string({ pool: 'abcABC123!@#$%^&*()[]', length: 15 })

const creUsrReq: CreateUserRequest = {
  username,
  name: chance.name(),
  phone: chance.phone(),
  email: chance.email(),
  timezone: 'CET',
  password,
  status: 'active',
  role: 'admin'
}

const chPwReq: ChangePasswordRequest = {
  username,
  current_password: password,
  new_password: chance.string()
}

const updUsrReq: UpdateUserRequest = {
  name: chance.name(),
  phone: chance.phone(),
  email: chance.email(),
  timezone: 'CET',
  status: 'active',
  role: 'admin'
}

test('testing handling users', () => {
  const key = testApiKey
  const fp = new Fluidpay({
    apiKey: key,
    localDev: true
  })

  return testCurrentUser(fp)
})

const testCurrentUser = (fp: Fluidpay) => {
  return fp.getCurrentUser()
    .then((res: any) => {
      const currUsrRes: UserResponse = res.data
      expect(currUsrRes.msg).toBe('success')

      return testGetUsers(fp)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testGetUsers = (fp: Fluidpay) => {
  return fp.getUsers()
    .then((res: any) => {
      const getUsrsRes: UsersResponse = res.data
      expect(getUsrsRes.total_count).not.toBe(0)

      return testCreateUser(fp)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testCreateUser = (fp: Fluidpay) => {
  return fp.createUser(creUsrReq)
    .then((res: any) => {
      const creUsrRes: UserResponse = res.data
      expect(creUsrRes.msg).toBe('success')

      const userID = (creUsrRes.data as any).id
      return testGetUser(fp, userID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testGetUser = (fp: Fluidpay, userID: string) => {
  return fp.getUser(userID)
    .then((res: any) => {
      const getUsrRes: UserResponse = res.data
      expect(getUsrRes.msg).toBe('success')

      // return testChangePassword(fp, userID)
      return testUpdateUser(fp, userID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testChangePassword = (fp: Fluidpay, userID: string) => {
  return fp.changePassword(chPwReq)
    .then((res: any) => {
      const chPwRes: UserResponse = res.data
      expect(chPwRes.msg).toBe('success')

      return testUpdateUser(fp, userID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testUpdateUser = (fp: Fluidpay, userID: string) => {
  return fp.updateUser(updUsrReq, userID)
    .then((res: any) => {
      const updUsrRes: UserResponse = res.data
      expect(updUsrRes.msg).toBe('success')

      return testDeleteUser(fp, userID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testDeleteUser = (fp: Fluidpay, userID: string) => {
  return fp.deleteUser(userID)
    .then((res: any) => {
      const delUsrRes = res.data
      expect(delUsrRes.msg).toBe('success')
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}
