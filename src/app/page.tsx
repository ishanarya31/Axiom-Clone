import { TokenDiscovery } from '@/components/token/TokenDiscovery'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-hidden flex flex-col px-2 md:px-4 lg:px-6 py-6 pb-20">
        <div className="mx-auto max-w-[1600px] w-full flex-1 flex flex-col min-h-0">
          <header className="flex-shrink-0 mb-4 md:mb-6 px-2 md:px-0">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Pulse</h1>
            <p className="text-sm md:text-base text-neutral-400">Live discovery of trending tokens across chains</p>
          </header>
          <div className="flex-1 min-h-0">
            <TokenDiscovery />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


