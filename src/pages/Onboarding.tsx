import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { Button } from "../components/ui/button"
import { Sparkles, Send, User, Bot } from "lucide-react"

interface Message {
  id: number
  type: "bot" | "user"
  text: string
  options?: string[]
  inputType?: "text" | "select"
  field?: string
}

const questions: Omit<Message, "id">[] = [
  {
    type: "bot",
    text: "Hey there! I'm UniPath, your AI counsellor. I'm excited to help you find your perfect university! Let's start with your name. What should I call you?",
    inputType: "text",
    field: "name"
  },
  {
    type: "bot",
    text: "Nice to meet you! What's your current education level?",
    options: ["High School", "Bachelor's Degree", "Master's Degree", "Other"],
    inputType: "select",
    field: "educationLevel"
  },
  {
    type: "bot",
    text: "Great! What field of study are you interested in?",
    options: ["Computer Science", "Business/MBA", "Engineering", "Medicine", "Arts & Humanities", "Sciences", "Law", "Other"],
    inputType: "select",
    field: "fieldOfStudy"
  },
  {
    type: "bot",
    text: "What's your current GPA or percentage? (Enter as GPA out of 10.0 or percentage)",
    inputType: "text",
    field: "gpa"
  },
  {
    type: "bot",
    text: "Have you taken any English proficiency tests? What's your IELTS/TOEFL score? (Type 'Not yet' if you haven't)",
    inputType: "text",
    field: "englishScore"
  },
  {
    type: "bot",
    text: "Have you taken GRE/GMAT? What's your score? (Type 'Not yet' or 'Not required' if applicable)",
    inputType: "text",
    field: "testScore"
  },
  {
    type: "bot",
    text: "Which countries are you interested in studying?",
    options: ["USA", "UK", "Canada", "Australia", "Germany", "Other European"],
    inputType: "select",
    field: "targetCountries"
  },
  {
    type: "bot",
    text: "When are you planning to start your studies?",
    options: ["Jan 2026", "June 2026", "Jan 2027", "2028", "Not sure yet"],
    inputType: "select",
    field: "intakeYear"
  },
  {
    type: "bot",
    text: "What's your approximate budget for the entire program? (in USD)",
    options: ["Under $20,000", "$20,000 - $50,000", "$50,000 - $100,000", "Above $100,000", "Need scholarship"],
    inputType: "select",
    field: "budget"
  },
  {
    type: "bot",
    text: "Last question! Do you have any work experience?",
    options: ["No experience", "Less than 1 year", "1-3 years", "3-5 years", "5+ years"],
    inputType: "select",
    field: "workExperience"
  }
]

export function Onboarding() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [profile, setProfile] = useState<Record<string, string>>({})
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Start the conversation
  useEffect(() => {
    const timer = setTimeout(() => {
      addBotMessage(0)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const addBotMessage = (questionIndex: number) => {
    if (questionIndex >= questions.length) {
      // All questions answered
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setIsComplete(true)
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: `Amazing, ${profile.name || "friend"}! I've got everything I need. Your profile is ready and I'm already finding universities that match your goals. Let's head to your dashboard!`
        }])
      }, 1500)
      return
    }

    setIsTyping(true)
    setShowInput(false)
    
    setTimeout(() => {
      setIsTyping(false)
      const question = questions[questionIndex]
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: "bot",
        text: question.text,
        options: question.options,
        inputType: question.inputType,
        field: question.field
      }])
      
      // Show input after message appears
      if (question.inputType === "text") {
        setTimeout(() => setShowInput(true), 300)
      }
    }, 1200)
  }

  const handleAnswer = (answer: string) => {
    const currentQ = questions[currentQuestion]
    
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: "user",
      text: answer
    }])

    // Save to profile
    if (currentQ?.field) {
      setProfile(prev => ({ ...prev, [currentQ.field!]: answer }))
    }

    setInputValue("")
    setShowInput(false)
    
    const nextQuestion = currentQuestion + 1
    setCurrentQuestion(nextQuestion)

    // Show next question after delay
    setTimeout(() => {
      addBotMessage(nextQuestion)
    }, 600)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      handleAnswer(inputValue.trim())
    }
  }

  const handleFinish = async () => {
    if (currentUser) {
      try {
        await setDoc(doc(db, "users", currentUser.uid), {
          ...profile,
          email: currentUser.email,
          createdAt: new Date().toISOString(),
          onboardingComplete: true
        })
        console.log("Profile saved successfully!")
      } catch (error) {
        console.error("Error saving profile:", error)
      }
    }
    navigate("/dashboard")
  }

  const lastMessage = messages[messages.length - 1]
  const showOptions = lastMessage?.type === "bot" && lastMessage?.options && !isComplete

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-background" />
            </div>
            <span className="text-xl font-bold text-foreground">UniPath AI</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Step {Math.min(currentQuestion + 1, questions.length)} of {questions.length}
            </span>
            <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-500 ease-out"
                style={{ width: `${(Math.min(currentQuestion + 1, questions.length) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-4 space-y-4 pb-32">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === "bot" ? "bg-accent" : "bg-secondary border border-border"
              }`}>
                {message.type === "bot" ? (
                  <Bot className="w-5 h-5 text-background" />
                ) : (
                  <User className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className={`max-w-[75%] ${message.type === "user" ? "text-right" : ""}`}>
                <div className={`inline-block px-4 py-3 rounded-2xl ${
                  message.type === "bot" 
                    ? "bg-card border border-border text-foreground rounded-tl-sm" 
                    : "bg-accent text-background rounded-tr-sm"
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Options for current question */}
          {showOptions && (
            <div className="pl-12 flex flex-wrap gap-2">
              {lastMessage.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="px-4 py-2 text-sm bg-secondary hover:bg-accent hover:text-background border border-border hover:border-accent rounded-full text-foreground transition-all duration-200"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                <Bot className="w-5 h-5 text-background" />
              </div>
              <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {/* Complete - Go to Dashboard */}
          {isComplete && (
            <div className="flex justify-center pt-6">
              <Button size="lg" onClick={handleFinish} className="gap-2 text-base">
                Go to Dashboard <Sparkles className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Text Input Area - Fixed at bottom */}
      {showInput && !isComplete && (
        <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your answer..."
              className="flex-1 h-12 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              autoFocus
            />
            <Button type="submit" size="lg" disabled={!inputValue.trim()}>
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}