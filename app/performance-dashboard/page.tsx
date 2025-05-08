import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PerformanceDashboard } from "@/components/performance-dashboard"

export default function PerformanceDashboardPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-24 pb-16">
        <PerformanceDashboard />
      </div>
      <Footer />
    </main>
  )
}
