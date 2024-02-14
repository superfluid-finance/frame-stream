import { NextResponse } from 'next/server'
import { kv } from "@vercel/kv";
import { followingQuery, walletQuery } from '../api'
import { init, fetchQuery } from "@airstack/node";
import { account, walletClient, publicClient } from './config' 
import ABI from './abi.json'

// USDC contract address on Base
const contractAddress = "0xcfA132E353cB4E398080B9700609bb008eceB125"
const fDAIxAddress = "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f"

init(process.env.AIRSTACK_KEY || '')

let image
const notFollowingImage = "https://i.imgur.com/u2cnAbH.png"
const wrongImage = "https://i.imgflip.com/8fttpq.jpg"
const winner = 'https://i.imgflip.com/8ftu0d.jpg'

image = wrongImage

const _html = (img) => `
<!DOCTYPE html>
<html>
  <head>
    <title>Frame</title>
    <mega property="og:image" content="${img}" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${img}" />
    <meta property="fc:frame:image:aspect_ratio" content="1:1" />
  </head>
</html>
`

export async function POST(req) {  
  const data = await req.json()

  const { untrustedData } = data
  const { inputText, fid } = untrustedData

  const _query = followingQuery(fid)
  const { data: results } = await fetchQuery(_query, {
    id: fid
  })

  const _query2 = walletQuery(fid)
  const { data: results2 } = await fetchQuery(_query2, {
    id: fid
  })

  const socials = results2.Socials.Social
  const address = socials[0].userAssociatedAddresses[0]

  if (!results.Wallet.socialFollowers.Follower) {
    return new NextResponse(_html(notFollowingImage))
  }
  
  if (inputText.toLowerCase() === process.env.GDA_ADDRESS?.toLowerCase()) {
    image = winner
    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'setFlowrate',
      account,
      args: [fDAIxAddress,address,3802258237],
    })
    await walletClient.writeContract(request)
  }

  return new NextResponse(_html(image))
}

export const dynamic = 'force-dynamic'