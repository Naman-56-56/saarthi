"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  Briefcase,
  Bot,
  Trophy,
  BookOpen,
  Users,
  TrendingUp,
  Bell,
  PanelLeft,
  ChevronRight,
  MapPin,
  Clock,
  Target,
  CheckCircle,
  Search,
  X,
  Menu,
  GraduationCap,
  Download,
  Plus,
  FileText,
  MessageSquare,
  Building,
  Bookmark,
  Mail,
  Phone,
  Settings,
  LogOut,
  Sun,
  Moon,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Star,
  Code,
  Tag
} from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

const SarthiLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 40" className={cn("h-10 w-auto", className)} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1E40AF" />
      </linearGradient>
      <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1E40AF" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>

    <circle cx="20" cy="20" r="18" fill="url(#logoGradient)" />
    <path
      d="M12 25c0-4 3-7 8-7s8 3 8 7M20 12v8M16 16l4-4 4 4"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 12h12l-2 4H16z" fill="white" opacity="0.9" />

    <text
      x="45"
      y="16"
      fontSize="14"
      fontWeight="700"
      fill="url(#textGradient)"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      SARTHI
    </text>

    <text x="45" y="28" fontSize="8" fontWeight="500" fill="#6B7280" fontFamily="system-ui, -apple-system, sans-serif">
      PM YOJNA PORTAL
    </text>
  </svg>
)

interface Recommendation {
  title: string
  match_percentage: number
  hybrid_score: number
  department?: string
  location?: string
  company?: string
  duration?: string
  stipend?: string
  required_skills?: string
  expanded_skills_used?: string[]
}

interface ApiResponse {
  recommendations: Recommendation[]
  status: string
  input_skills: string[]
  total_recommendations: number
  error?: string
}

export default function RecommendationsPage() {
  const [skillsInput, setSkillsInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const { theme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!skillsInput.trim()) {
      setError("Please enter your skills")
      return
    }

    setLoading(true)
    setHasSearched(true)

    try {
      // Parse skills from comma-separated input
      const skills = skillsInput
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0)

      if (skills.length === 0) {
        setError("Please enter valid skills")
        setLoading(false)
        return
      }

      const response = await fetch('http://localhost:8000/api/recommend/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skills: skills,
          top_n: 5
        })
      })

      const data: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get recommendations')
      }

      if (data.status === 'success') {
        setRecommendations(data.recommendations)
      } else {
        throw new Error(data.error || 'Unknown error occurred')
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get recommendations')
      setRecommendations([])
    } finally {
      setLoading(false)
    }
  }

  const formatMatchScore = (score: number) => {
    return score.toFixed(1)
  }

  // Helper function to check if a skill matches user input
  const isSkillMatched = (skill: string, userInput: string): boolean => {
    const skillLower = skill.toLowerCase().trim()
    const userInputLower = userInput.toLowerCase()
    
    // Direct match
    if (userInputLower.includes(skillLower)) return true
    
    // Common abbreviations and synonyms
    const synonyms: Record<string, string[]> = {
      'javascript': ['js'],
      'js': ['javascript'],
      'python': ['py'],
      'typescript': ['ts'],
      'ts': ['typescript'],
      'react': ['reactjs'],
      'vue': ['vuejs'],
      'angular': ['angularjs']
    }
    
    for (const [key, values] of Object.entries(synonyms)) {
      if (skillLower === key && values.some(v => userInputLower.includes(v))) return true
      if (values.includes(skillLower) && userInputLower.includes(key)) return true
    }
    
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <SarthiLogo />
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="gap-1">
              <Bot className="h-3 w-3" />
              AI Recommendations
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                AI-Powered Job Recommendations
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Enter your skills and let our AI recommend the most suitable job opportunities for you
              </p>
            </motion.div>
          </div>

          {/* Skills Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Your Skills
                </CardTitle>
                <CardDescription>
                  Enter your skills separated by commas (e.g., Python, React, Machine Learning)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills</Label>
                    <Textarea
                      id="skills"
                      placeholder="Python, HTML, CSS, JavaScript, React, Machine Learning..."
                      value={skillsInput}
                      onChange={(e) => setSkillsInput(e.target.value)}
                      className="min-h-[100px]"
                      disabled={loading}
                    />
                  </div>
                  
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full rounded-xl"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Finding Recommendations...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Get Recommendations
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <AnimatePresence>
            {hasSearched && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Recommended Jobs
                      {recommendations.length > 0 && (
                        <Badge variant="secondary">{recommendations.length}</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      AI-powered recommendations based on your skills
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                          <p className="text-muted-foreground">Analyzing your skills and finding matches...</p>
                        </div>
                      </div>
                    ) : recommendations.length === 0 ? (
                      <div className="text-center py-12">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">No recommendations found</h3>
                        <p className="text-muted-foreground">
                          Try different skills or check if our database has relevant opportunities
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recommendations.map((job, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Card className="hover:shadow-md transition-shadow">
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex-1">
                                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                      {job.company && (
                                        <div className="flex items-center gap-1">
                                          <Building className="h-4 w-4" />
                                          {job.company}
                                        </div>
                                      )}
                                      {job.location && (
                                        <div className="flex items-center gap-1">
                                          <MapPin className="h-4 w-4" />
                                          {job.location}
                                        </div>
                                      )}
                                      {job.duration && (
                                        <div className="flex items-center gap-1">
                                          <Clock className="h-4 w-4" />
                                          {job.duration}
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                      {job.department && (
                                        <Badge variant="outline">{job.department}</Badge>
                                      )}
                                      {job.stipend && (
                                        <Badge variant="secondary">{job.stipend}</Badge>
                                      )}
                                    </div>
                                    
                                    {/* Required Skills Section */}
                                    {job.required_skills && (
                                      <div className="mt-3 pt-3 border-t">
                                        <div className="flex items-center gap-1 mb-2">
                                          <Code className="h-4 w-4 text-indigo-500" />
                                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Required Skills</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                          {job.required_skills.split(' ').filter(skill => skill.trim().length > 0).slice(0, 8).map((skill, index) => {
                                            const isMatched = isSkillMatched(skill.trim(), skillsInput);
                                            
                                            return (
                                              <Badge 
                                                key={index} 
                                                variant="outline" 
                                                className={`text-xs ${
                                                  isMatched 
                                                    ? 'bg-green-100 dark:bg-green-950 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300' 
                                                    : 'bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300'
                                                }`}
                                              >
                                                {skill.trim()}
                                                {isMatched && <CheckCircle className="ml-1 h-3 w-3" />}
                                              </Badge>
                                            );
                                          })}
                                          {job.required_skills.split(' ').filter(skill => skill.trim().length > 0).length > 8 && (
                                            <Badge variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800">
                                              +{job.required_skills.split(' ').filter(skill => skill.trim().length > 0).length - 8} more
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div className="text-right ml-4">
                                    <div className="flex items-center gap-1 mb-1">
                                      <Star className="h-4 w-4 text-yellow-500" />
                                      <span className="text-sm font-medium">Match Score</span>
                                    </div>
                                    <div className="text-2xl font-bold text-blue-600">
                                      {formatMatchScore(job.match_percentage)}%
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                      <div 
                                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${formatMatchScore(job.match_percentage)}%` }}
                                      />
                                    </div>
                                  </div>
                                  <Button className="ml-4 rounded-xl">
                                    <Bookmark className="mr-2 h-4 w-4" />
                                    Apply Now
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}