import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

const LOGIN_ATTEMPTS_LIMIT = 3

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const updateLoginAttempt: MutationResolvers['updateLoginAttempt'] =
  async ({ email }) => {
    // get the current attempt count
    const user = await db.user.findUnique({
      where: { email },
    })

    // increment the attempt count
    if (user.attempts < LOGIN_ATTEMPTS_LIMIT) {
      const updatedUser = await db.user.update({
        data: {
          attempts: user.attempts + 1,
        },
        where: { email },
      })
      return updatedUser
    } // Set the unlockedAt time - Now plus 15 minutes
    else {
      const updatedUser = await db.user.update({
        data: {
          unlockedAt: new Date(Date.now() + 15 * 60000),
        },
        where: { email },
      })
      return updatedUser
    }
  }
