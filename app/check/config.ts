import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { polygonMumbai } from 'viem/chains'

export const walletClient = createWalletClient({
  chain: polygonMumbai,
  transport:  http()
})

export const publicClient = createPublicClient({
  chain: polygonMumbai,
  transport: http()
})

export const account = privateKeyToAccount(`0x${process.env.WK}`)