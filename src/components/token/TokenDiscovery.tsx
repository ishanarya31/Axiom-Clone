"use client"
import { useCallback, useState } from 'react'
import { useTokens } from '@/hooks/useTokens'
import { TokenColumn } from './TokenColumn'
import { FilterPanel } from './FilterPanel'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function TokenDiscovery() {
  const { data, isLoading, isError, error, refetch } = useTokens()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'new' | 'final' | 'migrated'>('new')
  const [liveData, setLiveData] = useState<Record<string, { price: number; volume: number; marketCap: number; fees: number; txCount: number }>>({})

  const handleUpdateLiveData = useCallback((id: string, newData: { price: number; volume: number; marketCap: number; fees: number; txCount: number }) => {
    setLiveData(prev => ({
      ...prev,
      [id]: newData
    }))
  }, [])

  const newPairs = data?.data?.new ?? []
  const finalStretch = data?.data?.final ?? []
  const migrated = data?.data?.migrated ?? []

  return (
    <section className="h-full flex flex-col">
      {/* Tab switching for small screens */}
      <div className="flex-shrink-0 md:hidden mb-4 flex gap-2 border-b border-neutral-800">
        <button
          onClick={() => setActiveTab('new')}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
            activeTab === 'new'
              ? "text-white border-white"
              : "text-neutral-400 border-transparent hover:text-white"
          )}
        >
          New Pairs
        </button>
        <button
          onClick={() => setActiveTab('final')}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
            activeTab === 'final'
              ? "text-white border-white"
              : "text-neutral-400 border-transparent hover:text-white"
          )}
        >
          Final Stretch
        </button>
        <button
          onClick={() => setActiveTab('migrated')}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
            activeTab === 'migrated'
              ? "text-white border-white"
              : "text-neutral-400 border-transparent hover:text-white"
          )}
        >
          Migrated
        </button>
      </div>

      {/* Three Columns Layout */}
      {isLoading && (
        <div className="flex-1 min-h-0">
          <div className="h-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 md:p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 h-full">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col h-full bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden">
                  <div className="flex-shrink-0 bg-neutral-950 border-b border-neutral-800 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-20 bg-neutral-800" />
                      <Skeleton className="h-4 w-4 bg-neutral-800 rounded" />
                      <Skeleton className="h-3 w-6 bg-neutral-800 ml-auto" />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto column-scroll">
                    <div className="space-y-2 p-2">
                      {Array.from({ length: 8 }).map((_, j) => (
                        <div key={j} className="bg-neutral-900 border border-neutral-800 rounded-lg p-3">
                          <div className="flex items-start gap-3">
                            <Skeleton className="h-10 w-10 rounded-md bg-neutral-800" />
                            <div className="flex-1 space-y-2">
                              <Skeleton className="h-4 w-24 bg-neutral-800" />
                              <Skeleton className="h-3 w-32 bg-neutral-800" />
                              <div className="grid grid-cols-2 gap-2">
                                <Skeleton className="h-3 w-16 bg-neutral-800" />
                                <Skeleton className="h-3 w-16 bg-neutral-800" />
                                <Skeleton className="h-3 w-16 bg-neutral-800" />
                                <Skeleton className="h-3 w-16 bg-neutral-800" />
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <Skeleton className="h-3 w-20 bg-neutral-800" />
                                <Skeleton className="h-6 w-16 rounded-md bg-neutral-800" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isError && (
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">Failed to load. {String((error as Error)?.message)}</div>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="flex-1 min-h-0 overflow-hidden">
          <div className="h-full w-full">
            <div className={cn(
              "grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 h-full",
              "md:px-0 px-0"
            )}>
              {/* Desktop: Show all columns, Mobile: Show only active tab */}
              <div className={cn(
                activeTab === 'new' ? "block" : "hidden md:block",
                "h-full"
              )}>
                <TokenColumn
                  category="new"
                  tokens={newPairs}
                  liveData={liveData}
                  onUpdateLiveData={handleUpdateLiveData}
                />
              </div>
              <div className={cn(
                activeTab === 'final' ? "block" : "hidden md:block",
                "h-full"
              )}>
                <TokenColumn
                  category="final"
                  tokens={finalStretch}
                  liveData={liveData}
                  onUpdateLiveData={handleUpdateLiveData}
                />
              </div>
              <div className={cn(
                activeTab === 'migrated' ? "block" : "hidden md:block",
                "h-full"
              )}>
                <TokenColumn
                  category="migrated"
                  tokens={migrated}
                  liveData={liveData}
                  onUpdateLiveData={handleUpdateLiveData}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <FilterPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </section>
  )
}
