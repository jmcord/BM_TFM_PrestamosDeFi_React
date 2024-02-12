import { PrestamoDetail, Owner, AltaCliente} from '../components'
import AltaPrestamista2 from '../components/AltaPrestamista2'

export default function Home() {
  return (
    <section className="flex flex-col place-items-center gap-4 py-20 px-20">
      <h1>Prestamos DeFi</h1>

      <Owner />
      <AltaPrestamista2 />
      <AltaCliente />
 
    </section>
  )
}
