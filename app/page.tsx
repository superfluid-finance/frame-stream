export const runtime = 'edge'
import { URL } from '../constants'


const image = "https://i.imgflip.com/8fvahi.jpg"
const buttonText = 'Click to get stream'

export default function Home() {
  return (
    <div>
      <a href="https://superfluid.finance" target="_blank" rel="no-opener">
      <img
        src={image}
        width={400}
        height={400}
        alt='Hello world.'
      />
      </a>
    </div>
  );
}

export async function generateMetadata() {
  const meta = {
    'og:image': image,
    'fc:frame': 'vNext',
    'fc:frame:image': image,
    'fc:frame:image:aspect_ratio': '1:1',
  
    'fc:frame:post_url': `${URL}/check`,
    'fc:frame:button:1': buttonText,
    'fc:frame:button:1:action': 'post',

    'fc:frame:input:text': 'Input your wallet address here',
  }

  return {
    openGraph: {
      images: [
        {
          url: image,
          width: '1000',
          height: '1000'
        }
      ]
    },
    other: {
      ...meta
    },
  }
}