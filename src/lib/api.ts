import { type } from 'os'
import { UserProps } from '../utils/user.props'
import { EMAIL_REGEX, USERNAME_REGEX } from './../components/SignUpForm'
const TABLE_NAME = 'USERS'

export type signUpResp = null | 'email' | 'username' | true | 'both'
export type authResp = string | null | undefined
export type getResp = null

export const simpleAPI = {
  isAuthenticated: false,
  signUp: (user: UserProps): signUpResp => {
    try {
      const table: UserProps[] = JSON.parse(
        localStorage.getItem(TABLE_NAME) || '[]'
      )

      const testIfUserIsRepeated = table.find(
        (element) => element.username === user.username
      )
      const testIfEmailIsRepeated = table.find(
        (element) => element.email === user.email
      )

      if (testIfUserIsRepeated && testIfEmailIsRepeated) return 'both'
      if (testIfUserIsRepeated) return 'username'
      if (testIfEmailIsRepeated) return 'email'

      table.push(user)
      localStorage.setItem(TABLE_NAME, JSON.stringify(table))

      return true
    } catch (error) {
      console.log(error)
      return null
    }
  },
  signIn: (key: string, password: string): UserProps | null | false => {
    const table: UserProps[] = JSON.parse(
      localStorage.getItem(TABLE_NAME) || '[]'
    )
    if (table.length === 0) return null

    let query: UserProps | undefined = undefined

    if (key.match(EMAIL_REGEX)) {
      query = table.find((element) => {
        if (element.email === key) return element
      })
    }

    if (key.match(USERNAME_REGEX)) {
      query = table.find((element) => {
        if (element.username === key) return element
      })
    }

    if (query != undefined && query.password === password) return query
    if (query != undefined && query.password !== password) return false
    else return null
  },
  log(callback: VoidFunction) {
    simpleAPI.isAuthenticated = true
    setTimeout(callback, 100)
  },
  logout(callback: VoidFunction) {
    simpleAPI.isAuthenticated = false
    setTimeout(callback, 100)
  }
}
