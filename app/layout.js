
import Nav from './nav/nav';
import { Providers } from './context/providers';
import Wrapper from "./Wrapper";
import './styles/globals.css';

export const metadata = {
  title: 'Health Hub',
  description: 'Track your health from everywhere',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
      <link rel='icon' href='/favicon.ico'/>
      </head>
      <body style={{ overflow: "visible" }}>
        <Providers>
          <Nav />
          <Wrapper>
          {children}
          </Wrapper>
          </Providers>
        </body>
    </html>
  )
}
