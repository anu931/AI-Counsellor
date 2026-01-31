import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { Button } from "../components/ui/button"
import { Sparkles, LogOut, GraduationCap, MapPin, Calendar, DollarSign, Briefcase, BookOpen, Target, MessageSquare, ChevronRight, FileText, Award } from "lucide-react"

interface UserProfile {
  name: string
  educationLevel: string
  fieldOfStudy: string
  gpa: string
  englishScore: string
  testScore: string
  targetCountries: string
  intakeYear: string
  budget: string
  workExperience: string
  email: string
  onboardingComplete: boolean
}

export function Dashboard() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid))
          if (userDoc.exists()) {
            setProfile(userDoc.data() as UserProfile)
          } else {
            navigate("/onboarding")
          }
        } catch (error) {
          console.error("Error fetching profile:", error)
        }
      }
      setLoading(false)
    }
    fetchProfile()
  }, [currentUser, navigate])

  async function handleLogout() {
    await logout()
    navigate("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No profile found</p>
          <Button onClick={() => navigate("/onboarding")}>Complete Onboarding</Button>
        </div>
      </div>
    )
  }

  const profileItems = [
    { icon: GraduationCap, label: "Education", value: profile.educationLevel },
    { icon: BookOpen, label: "Field of Study", value: profile.fieldOfStudy },
    { icon: Target, label: "GPA/Percentage", value: profile.gpa },
    { icon: MapPin, label: "Target Country", value: profile.targetCountries },
    { icon: Calendar, label: "Target Intake", value: profile.intakeYear },
    { icon: DollarSign, label: "Budget", value: profile.budget },
    { icon: Briefcase, label: "Work Experience", value: profile.workExperience },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-background" />
              </div>
              <span className="text-xl font-bold text-foreground">UniPath AI</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">{currentUser?.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {profile.name}!
          </h1>
          <p className="text-muted-foreground">
            Here's your profile summary and next steps for your university journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Your Profile</h2>
                <Button variant="outline" size="sm" onClick={() => navigate("/onboarding")}>
                  Edit Profile
                </Button>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {profileItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground">{item.value || "Not set"}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Test Scores */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-lg font-medium text-foreground mb-4">Test Scores</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">IELTS/TOEFL</p>
                      <p className="font-medium text-foreground">{profile.englishScore || "Not taken"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">GRE/GMAT</p>
                      <p className="font-medium text-foreground">{profile.testScore || "Not taken"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* AI Counsellor Card */}
            <div className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">AI Counsellor</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get personalized advice and university recommendations from your AI counsellor.
              </p>
              <Button className="w-full">
                Start Chat <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Progress Card */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Profile Complete</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Discover Universities</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Lock Universities</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Start Applications</p>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-secondary/50">
                  <p className="text-2xl font-bold text-accent">0</p>
                  <p className="text-xs text-muted-foreground">Universities Matched</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary/50">
                  <p className="text-2xl font-bold text-accent">0</p>
                  <p className="text-xs text-muted-foreground">Applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}