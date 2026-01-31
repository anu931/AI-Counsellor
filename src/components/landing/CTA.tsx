import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative p-12 rounded-3xl bg-card border border-border overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.7_0.15_180)_0%,_transparent_60%)] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Ready to Find Your Perfect University?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of students who have successfully navigated their university journey with UniPath AI.
            </p>
            <Link to="/signup">
              <Button size="lg" className="gap-2 text-base">
                Start Free Today <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}