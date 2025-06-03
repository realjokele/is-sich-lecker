import { betterAuth } from 'better-auth'
import { username, emailOTP } from 'better-auth/plugins'

import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),
  trustedOrigins: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  advanced: {
    cookiePrefix: 'tss-stack',
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: import.meta.env.PROD,
    sendResetPassword: async ({ user, url, token }, request) => {
      // await sendEmail({
      //   to: user.email,
      //   subject: "Reset your password",
      //   text: `Click the link to reset your password: ${url}`,
      // })
      console.log(user, url, token)
    },
  },
  plugins: [
    username(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        console.log('Sending verification OTP to', email)
        console.log('OTP:', otp)
        console.log('Type:', type)
      },
    }),
  ],
})
