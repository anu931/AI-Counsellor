import { Brain, Target, FileText, Calculator, PenTool, Shield } from "lucide-react"

const features = [
  { icon: Brain, title: "AI Counsellor", description: "Chat with an AI that understands your academic profile, goals, and provides personalized guidance 24/7." },
  { icon: Target, title: "Smart Matching", description: "Get university recommendations based on your profile with fit scores, acceptance probability, and risk analysis." },
  { icon: FileText, title: "Application Tracker", description: "Track deadlines, documents, and tasks for each university in one organized dashboard." },
  { icon: Calculator, title: "Cost Calculator", description: "Understand the full cost including tuition, living, visa, and travel with real-time currency conversion." },
  { icon: PenTool, title: "SOP Builder", description: "AI-assisted Statement of Purpose writing tailored to each university's requirements." },
  { icon: Shield, title: "Risk Analysis", description: "Understand why a university is safe, moderate, or ambitious for your profile with actionable insights." },
]

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Everything You Need to Succeed</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From discovery to admission, our AI-powered tools guide you through every step of your university application journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}