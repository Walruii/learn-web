import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import './globals.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
// import { SessionProvider } from "next-auth/react"

// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   )
// }

export const metadata = {
  title: 'Secrets',
  description: 'Share secrets the anon way',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className="h-100">
      <body className="d-flex flex-column h-100">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
