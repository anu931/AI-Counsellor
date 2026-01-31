const testimonials = [
  { name: "Priya Sharma", university: "Stanford University", quote: "UniPath AI helped me discover universities I never knew were a great fit. The AI counsellor was like having a mentor available 24/7.", avatar: "PS" },
  { name: "Ahmed Hassan", university: "University of Toronto", quote: "The risk analysis feature gave me confidence in my choices. I knew exactly where I stood with each application.", avatar: "AH" },
  { name: "Sarah Chen", university: "Imperial College London", quote: "From SOP writing to deadline tracking, everything was organized in one place. I couldn't have done it without UniPath.", avatar: "SC" },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Success Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who found their perfect university match with UniPath AI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <p className="text-muted-foreground mb-6 leading-relaxed">"{item.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-sm font-medium text-accent">
                  {item.avatar}
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.university}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}