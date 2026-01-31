import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Button } from "../components/ui/button"
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowLeft, User, Check } from "lucide-react"

export function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { signup } = useAuth()
    const navigate = useNavigate()

    const passwordChecks = [
        { label: "At least 8 characters", valid: password.length >= 8 },
        { label: "Contains a number", valid: /\d/.test(password) },
        { label: "Contains uppercase", valid: /[A-Z]/.test(password) },
    ]

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()

  if (password !== confirmPassword) {
    return setError("Passwords do not match")
  }

  if (password.length < 8) {
    return setError("Password must be at least 8 characters")
  }
  
  try {
    setError("")
    setLoading(true)
    await signup(email, password)
    navigate("/onboarding")
  } catch (err: any) {
    setError(err.message || "Failed to create an account")
    setLoading(false)
  }
}
    return (
        <div className="min-h-screen bg-background flex">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex flex-1 bg-card border-r border-border items-center justify-center p-16">
                <div className="max-w-md">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Start Your Journey Today</h2>
                    <div className="space-y-6">
                        {[
                            "AI-powered university matching",
                            "Personalized application roadmap",
                            "24/7 counsellor support",
                            "Cost & scholarship calculator"
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                                    <Check className="w-5 h-5 text-accent" />
                                </div>
                                <span className="text-foreground">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
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

                    <h1 className="text-3xl font-bold text-foreground mb-2">Create your account</h1>
                    <p className="text-muted-foreground mb-8">Let's get you started on your university journey</p>

                    {error && (
                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>
                        </div>

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
                                    placeholder="Create a password"
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
                            <div className="flex gap-4 mt-3">
                                {passwordChecks.map((check, i) => (
                                    <div key={i} className={`flex items-center gap-1 text-xs ${check.valid ? "text-green-400" : "text-muted-foreground"}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${check.valid ? "bg-green-400" : "bg-muted-foreground"}`} />
                                        {check.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                    required
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full h-12 text-base">
                            {loading ? "Creating account..." : "Create Account"}
                        </Button>
                    </form>

                    <p className="text-center text-muted-foreground mt-8">
                        Already have an account?{" "}
                        <Link to="/login" className="text-accent hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}