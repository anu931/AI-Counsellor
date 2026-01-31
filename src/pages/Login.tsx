import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { Button } from "../components/ui/button"
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    try {
      setError("")
      setLoading(true)
      const userCredential = await login(email, password)
      
      // Check if user has completed onboarding
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))
      
      if (userDoc.exists() && userDoc.data().onboardingComplete) {
        navigate("/dashboard")
      } else {
        navigate("/onboarding")
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="max-w-md w-full">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-background" />
            </div>
            <span className="text-2xl font-bold text-foreground">UniPath AI</span>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Sign in to continue your university journey</p>

          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full h-12 pl-12 pr-12 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 text-base">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-muted-foreground mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-accent hover:underline">Sign up</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-card border-l border-border items-center justify-center p-16">
        <div className="max-w-md text-center">
          <div className="w-24 h-24 rounded-3xl bg-accent/20 flex items-center justify-center mx-auto mb-8">
            <Sparkles className="w-12 h-12 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Your AI Counsellor Awaits</h2>
          <p className="text-muted-foreground leading-relaxed">
            Get personalized university recommendations, track your applications, and achieve your dreams with AI-powered guidance.
          </p>
        </div>
      </div>
    </div>
  )
}