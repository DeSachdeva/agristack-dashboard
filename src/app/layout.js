import './globals.css'

export const metadata = {
  title: 'AgriStack Dashboard | Ministry of Agriculture, GoI',
  description: 'Use Case Command Centre — Digital Agriculture Mission, Government of India',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
