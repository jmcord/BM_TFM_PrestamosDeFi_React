import {Header, Footer} from '../components'

export default function Home() {
  return (
    <section className="flex flex-col place-items-center gap-4 py-20 px-20">
      <h1>Prestamos DeFi</h1>
      <Header />
      <Footer />
    </section>
  )
}
