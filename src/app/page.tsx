import { TokenDiscovery } from '@/components/token/TokenDiscovery'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="h-screen overflow-hidden px-2 md:px-4 lg:px-6 py-6 pb-20 flex flex-col" style={{ maxHeight: '100vh' }}>
        <div className="mx-auto max-w-[1600px] flex-1 flex flex-col min-h-0">
          <header className="flex-shrink-0 mb-6 md:mb-8 px-2 md:px-0">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Pulse</h1>
            <p className="text-sm md:text-base text-neutral-400">Live discovery of trending tokens across chains</p>
          </header>
          <div className="flex-1 min-h-0">
            <TokenDiscovery />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}


