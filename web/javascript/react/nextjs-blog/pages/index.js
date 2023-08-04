import Link from 'next/link';
import Hii from '../components/Hii'

export default function Home() {
  return (<div>
    <h1>HIIIIIIIII!, HELLOOOOOOO!!</h1>
    <Hii />
    <Link href="/posts/first">HELLOO!!!!!!!</Link>
  </div>)

}
