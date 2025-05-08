import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimationGuide } from "@/components/animation-guide"

export default function AnimationGuidePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-24 pb-16">
        <AnimationGuide />
      </div>
      <Footer />
    </main>
  )
}
