import { type } from 'os'
import { UserProps } from '../utils/user.props'
const TABLE_NAME = 'USERS'

export type postResp = null | 'email' | 'username' | true | 'both'
export type authResp = string | null | undefined
export type getResp = null

export const simpleAPI = {
  post: (user: UserProps): postResp => {
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
  get: ({ username }: UserProps) => {
    try {
      const table: UserProps[] = JSON.parse(
        localStorage.getItem(TABLE_NAME) || '[]'
      )
      for (let i = 0; i < table.length; i++) {
        if (table[i].username === username) return table[i]
      }
    } catch (error) {
      console.log(error)
    }
    return null
  },
  authLogin: (
    unknownKey: string | undefined,
    password: string | undefined
  ): authResp => {
    const regexEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    try {
      const table: UserProps[] = JSON.parse(
        localStorage.getItem(TABLE_NAME) || '[]'
      )

      if (table.length === 0) return null

      let myResp = null
      if (unknownKey?.match(regexEmail)) {
        myResp = table.find((element) => {
          if (element.email === unknownKey && element.password === password)
            return element
        })
      } else {
        myResp = table.find((element) => {
          if (element.username === unknownKey && element.password === password)
            return element
        })
      }
      return myResp?.username
    } catch (error) {
      console.log(error)
    }

    return null
  },
  remove: (user: UserProps) => {
    return
  }
}
