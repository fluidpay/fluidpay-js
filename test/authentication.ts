import Fluidpay from './../src/index'
import { CreateUserRequest, UserResponse } from './../src/users'
import {
  JwtTokenRequest, ForgottenUsernameRequest, ForgottenPasswordRequest,
  GeneralResponse, JwtTokenResponse,
  Auth
} from './../src/authentication'
import { Chance } from 'chance'
import { testApiKey } from './_testkeys'

const chance = new Chance()

const username = 'A' + chance.string({ pool: 'abcABC0123', length: 10 })
const password = 'a1B!' + chance.string({ pool: 'abcABC123!@#$%^&*()[]', length: 15 })
const email = chance.email()

const tmpUsrReq: CreateUserRequest = {
  username,
  password,
  name: chance.name(),
  phone: chance.phone(),
  email,
  timezone: 'CET',
  status: 'active',
  role: 'admin'
}

const forUsrReq: ForgottenUsernameRequest = {
  email
}

const forPwReq: ForgottenPasswordRequest = {
  username
}

test('testing Auth class', () => {
  const testAuth = new Auth(1, 'myAPIkey')
  expect(testAuth.authorization).toBe('myAPIkey')
  testAuth.setAuth(2, 'myJWTToken')
  expect(testAuth.authorization).toBe('Bearer myJWTToken')
})

test('testing handling jwtTokens', () => {
  const fp = new Fluidpay({
    apiKey: testApiKey,
    environment: 'development'
  })
  return testCreateUser(fp)
})

const testCreateUser = (fp: Fluidpay) => {
  return fp.createUser(tmpUsrReq)
    .then((res: any) => {
      const createRes: GeneralResponse = res
      expect(createRes.msg).toBe('success')
      const tmpUsrRes: UserResponse = res.data
      if (tmpUsrRes && tmpUsrRes.data) {
        const id = tmpUsrRes.data.id
        return testObtainJWT(fp, id)
      }
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testObtainJWT = (fp: Fluidpay, userID: string) => {
  return fp.obtainJWT({
    username: tmpUsrReq.username,
    password: tmpUsrReq.password
  })
    .then((res: any) => {
      const tokRes: JwtTokenResponse = res
      expect(tokRes.status).toBe('success')
      return testForgottenUsername(fp, userID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testForgottenUsername = (fp: Fluidpay, userID: string) => {
  return fp.forgottenUsername(forUsrReq)
    .then((res: any) => {
      const forUsrRes: GeneralResponse = res.data
      expect(forUsrRes.msg).toBe('success')
      return testForgottenPassword(fp, userID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })


}

const testForgottenPassword = (fp: Fluidpay, userID: string) => {
  return fp.forgottenPassword(forPwReq)
    .then((res: any) => {
      const forPwRes: GeneralResponse = res
      expect(forPwRes.msg).toBe('success')
      return testDeleteUser(fp, userID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

// const testTokenLogout = (fp: Fluidpay, userID: string) => {
//   return fp.tokenLogout()
//     .then((res: any) => {
//       const logoutRes: GeneralResponse = res
//       expect(logoutRes.msg).toBe('success')
//       return testDeleteUser(fp, userID)
//     })
//     .catch((err: Error) => {
//       expect(err).toBeUndefined()
//     })
// }

const testDeleteUser = (fp: Fluidpay, userID: string) => {
  return fp.deleteUser(userID)
  .then((res: any) => {
    const deleteUserRes: GeneralResponse = res
    expect(deleteUserRes.msg).toBe('success')
  })
  .catch((err: Error) => {
    expect(err).toBeUndefined()
  })
}

