import Fluidpay from './../src/index'
import { testApiKey } from '../src/utils'
import { CreateUserRequest, UserResponse } from './../src/users'
import {
  JwtTokenRequest, ForgottenUsernameRequest, ForgottenPasswordRequest,
  GeneralResponse, JwtTokenResponse,
  Auth
} from './../src/authentication'
import { Chance } from 'chance'

const chance = new Chance()

const username = 'A' + chance.string({ pool: 'abcABC0123', length: 10 })
const password = 'a1B!' + chance.string({ pool: 'abcABC123!@#$%^&*()[]', length: 15 })
const email = chance.email()

const tmpUsrReq: CreateUserRequest = {
  username,
  name: chance.name(),
  phone: chance.phone(),
  email,
  timezone: 'CET',
  password,
  status: 'active',
  role: 'admin'
}

const tokReq: JwtTokenRequest = {
  username,
  password
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
  const key = testApiKey
  const fp = new Fluidpay({
    apiKey: key,
    localDev: true
  })
  return testCreateUser(fp)
})

const testCreateUser = (fp: Fluidpay) => {
  return fp.createUser(tmpUsrReq)
    .then((res: any) => {
      const tmpUsrRes: UserResponse = res.data
      if (tmpUsrRes && tmpUsrRes.data) {
        const id = tmpUsrRes.data.id
        setTimeout(() => {
          return testObtainJWT(fp, id)
        }, 10)
      }
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}

const testObtainJWT = (fp: Fluidpay, userID: string) => {
  return fp.obtainJWT(tokReq)
    .then((res: any) => {
      const tokRes: JwtTokenResponse = res.data
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
      const forPwRes: GeneralResponse = res.data
      expect(forPwRes.msg).toBe('success')
      return testDeleteUser(fp, userID)
    })
    .catch((err: Error) => {
      expect(err).toBeUndefined()
    })
}


const testDeleteUser = (fp: Fluidpay, userID: string) => {
  return fp.deleteUser(userID)
  .then((res: any) => {
    const deleteUserRes: GeneralResponse = res.data
    expect(deleteUserRes.msg).toBe('success')
    // return testTokenLogout(fp)
  })
  .catch((err: Error) => {
    expect(err).toBeUndefined()
  })
}

// const testTokenLogout = (fp: Fluidpay, userID: string) => {
//   fp.obtainJWT(tokReq)
//     .then((res: any) => {
//       const loginRes: GeneralResponse = res.data
//       expect(loginRes.msg).toBe('success')
//       return fp.tokenLogout()
//     })
//     .then((res: any) => {
//       const logoutRes: GeneralResponse = res.data
//       expect(logoutRes.msg).toBe('success')
//       return
//     })
//     .catch((err: Error) => {
//       expect(err).toBeUndefined()
//     })
// }
