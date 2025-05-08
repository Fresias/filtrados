import { ShopSection } from "@/components/shop-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function TiendaPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-24">
        <ShopSection />
      </div>
      <Footer />
    </main>
  )
}
