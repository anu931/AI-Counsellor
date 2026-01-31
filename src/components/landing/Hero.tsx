import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.7_0.15_180)_0%,_transparent_70%)] opacity-10" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm text-muted-foreground">AI-Powered University Counselling</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance text-foreground">
          Your Personal AI Guide to
          <span className="block text-accent">University Success</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
          Discover your perfect university match, get personalized recommendations, and navigate your application journey with AI that understands your goals.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/signup">
            <Button size="lg" className="gap-2 text-base">
              Start Your Journey <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="gap-2 text-base">
            <Play className="w-4 h-4" /> Watch Demo
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
          <span className="text-sm text-muted-foreground">Trusted by students admitted to:</span>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-foreground">
            <span>MIT</span>
            <span>Stanford</span>
            <span>Oxford</span>
            <span>Harvard</span>
            <span>Cambridge</span>
          </div>
        </div>
      </div>
    </section>
  )
}