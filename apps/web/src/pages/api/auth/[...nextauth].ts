import type { StdSignDoc } from '@cosmjs/amino'
import { encodeSecp256k1Pubkey, pubkeyToAddress } from '@cosmjs/amino'
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare, hash } from 'bcrypt'
import * as util from 'ethereumjs-util'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'

import { verify } from '../../../../verify'
import { prisma } from '../../../server/db/client'

interface KeplrSignatureObj {
	signature: { signature: string }
	signed: StdSignDoc
	pk: number[]
}

export const authOptions: NextAuthOptions = {
	pages: {
		newUser: '/',
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
	},
	adapter: PrismaAdapter(prisma),
	events: {
		async createUser(message) {
			await prisma.pointDisbursement.create({
				data: {
					amount: 100,
					message: `Welcome to Delvit!`,
					kind: 'SYSTEM',
					userId: message.user.id,
				},
			})
		},
	},
	providers: [
		CredentialsProvider({
			id: 'metamask',
			name: 'Metamask',
			credentials: {
				signature: {
					label: 'metaMaskSignature',
					type: 'text',
					placeholder: 'signature',
				},
				address: {
					label: 'ethAddress',
					type: 'text',
					placeholder: 'address',
				},
			},
			async authorize(credentials, _req) {
				if (credentials === undefined) {
					return null
				}

				const { address, signature } = credentials

				let nonceStr = 'Login to DLV'
				nonceStr = '\x19Ethereum Signed Message:\n' + nonceStr.length + nonceStr
				const nonce = util.keccak(Buffer.from(nonceStr, 'utf-8'))
				const { v, r, s } = util.fromRpcSig(signature)
				const pubKey = util.ecrecover(util.toBuffer(nonce), v, r, s)
				const addrBuf = util.pubToAddress(pubKey)
				const sigAddress = util.bufferToHex(addrBuf)

				if (address !== sigAddress) {
					return null
				}

				const acct = await prisma.web3Account.findUnique({
					where: {
						provider_address: {
							address,
							provider: 'eth',
						},
					},
					include: {
						user: true,
					},
				})

				if (acct === null) {
					const newUser = await prisma.user.create({
						data: {
							name: address,
						},
					})

					// Create the new acct
					await prisma.web3Account.create({
						data: {
							address,
							provider: 'eth',
							userId: newUser.id,
						},
					})

					return {
						id: newUser.id,
						name: newUser.name,
					}
				}

				const myUser = acct.user

				return {
					id: myUser.id,
					name: myUser.name,
				}
			},
		}),
		CredentialsProvider({
			name: 'Keplr',
			credentials: {
				keplr: {
					label: 'keplrSignature',
					type: 'text',
					placeholder: 'JSON string of Signature',
				},
			},
			async authorize(credentials, _req) {
				const obj = JSON.parse(credentials!.keplr) as KeplrSignatureObj
				const { signature, signed } = obj
				const pubKey = new Uint8Array(obj.pk)

				const result = await verify(signature, signed, pubKey)

				if (!result) {
					return null
				}

				const key = encodeSecp256k1Pubkey(pubKey)
				const addressHex = pubkeyToAddress(key, 'cosmos')

				const acct = await prisma.web3Account.findUnique({
					where: {
						provider_address: {
							address: addressHex,
							provider: 'keplr',
						},
					},
					include: {
						user: true,
					},
				})

				if (acct === null) {
					const newUser = await prisma.user.create({
						data: {
							name: addressHex,
						},
					})

					// Create the new acct
					await prisma.web3Account.create({
						data: {
							address: addressHex,
							provider: 'keplr',
							userId: newUser.id,
						},
					})

					return {
						id: newUser.id,
						name: newUser.name,
					}
				}

				const myUser = acct.user

				return {
					id: myUser.id,
					name: myUser.name,
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
		// GithubProvider({
		//   clientId: process.env.GITHUB_ID || '',
		//   clientSecret: process.env.GITHUB_SECRET || ''
		// }),
		// FacebookProvider({
		//   clientId: process.env.FACEBOOK_CLIENT_ID || '',
		//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET || ''
		// })
		EmailProvider({
			server: process.env.EMAIL_SERVER || '',
			from: process.env.EMAIL_FROM || '',
		}),
		// CredentialsProvider({
		//   // The name to display on the sign in form (e.g. "Sign in with...")
		//   name: "Email",
		//   // `credentials` is used to generate a form on the sign in page.
		//   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
		//   // e.g. domain, username, password, 2FA token, etc.
		//   // You can pass any HTML attribute to the <input> tag through the object.
		//   credentials: {
		//     email: { label: "Email", type: "text", placeholder: "johndoe@email.com" },
		//     password: { label: "Password", type: "password", }
		//   },
		//   async authorize(credentials) {
		//     const user = await prisma.user.findUnique({
		//       where: {
		//         email: credentials?.email,
		//       },
		//     })

		//     if (user && user.password) {
		//       // Any object returned will be saved in `user` property of the JWT
		//       const valid = await compare(credentials?.password ?? '', user.password)
		//       return valid ? user : null
		//     } else if (user) {
		//       // return error if user exists but user does not have a password (account created via another means)
		//       return null
		//       // If you return null then an error will be displayed advising the user to check their details.
		//       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
		//     }
		//     else {
		//       // no user, allow creating new account
		//       const user = await prisma.user.create({
		//         data: {
		//           email: credentials?.email,
		//           password: await hash(credentials?.password ?? '', 10)
		//         }
		//       })

		//       return user
		//     }
		//   }
		// })
	],
	callbacks: {
		async session(x) {
			x.session.userId = x.token.sub ?? ''
			return Promise.resolve(x.session)
		},
	},
}

export default NextAuth(authOptions)
