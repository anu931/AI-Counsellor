const steps = [
  { step: "01", title: "Tell Us About You", description: "Share your academic background, test scores, budget, and dream destinations. Our AI builds your unique profile." },
  { step: "02", title: "Discover Universities", description: "Get personalized university recommendations with fit scores. Swipe through matches like finding your perfect fit." },
  { step: "03", title: "Lock Your Choices", description: "Commit to your top universities. Our AI creates a personalized roadmap with deadlines and tasks." },
  { step: "04", title: "Apply with Confidence", description: "Follow guided steps, build your SOP, track documents, and submit applications on time." },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Your Journey in 4 Simple Steps</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From confused to confident. Our structured approach ensures you never miss a beat.
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="flex-1">
                <span className="text-6xl font-bold text-accent/20">{item.step}</span>
                <h3 className="text-2xl font-semibold mt-2 mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
              <div className="flex-1 w-full">
                <div className="aspect-video rounded-2xl bg-secondary border border-border flex items-center justify-center">
                  <span className="text-muted-foreground">Step {item.step} Preview</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}