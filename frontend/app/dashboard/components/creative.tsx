"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import ProfileEditModal from "./profile-edit-modal"
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
} from "lucide-react"
import Link from "next/link"

const SarthiLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 40" className={cn("h-10 w-auto", className)} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background circle with gradient */}
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

    {/* Logo icon - stylized 'S' with graduation cap */}
    <circle cx="20" cy="20" r="18" fill="url(#logoGradient)" />
    <path
      d="M12 25c0-4 3-7 8-7s8 3 8 7M20 12v8M16 16l4-4 4 4"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 12h12l-2 4H16z" fill="white" opacity="0.9" />

    {/* SARTHI text */}
    <text
      x="45"
      y="16"
      fontSize="14"
      fontWeight="700"
      fill="url(#textGradient)"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      SAARTHI
    </text>

    {/* PM Yojna subtitle */}
    <text x="45" y="28" fontSize="8" fontWeight="500" fill="#6B7280" fontFamily="system-ui, -apple-system, sans-serif">
      PM YOJNA PORTAL
    </text>
  </svg>
)

export function Saarthi() {
  // Fix for next-themes hydration: only use theme after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [selectedInternship, setSelectedInternship] = useState("all")
  const [notifications] = useState(3)
  const [activeTab, setActiveTab] = useState("dashboard") // Added activeTab state
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false)
  
  // Theme hook
  const { theme, resolvedTheme, setTheme } = useTheme()
  
  // User data state
  const [user, setUser] = useState<any>(null)
  const [userLoading, setUserLoading] = useState(true)
  const [userError, setUserError] = useState<string | null>(null)
  const [userStats, setUserStats] = useState<any>(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)
  
  type Internship = {
    title: string
    department: string
    location: string
    duration: string
    stipend: string
    skills: string[]
    featured: boolean
    type: string
    applicants: number
    deadline: string
  }

  const [internships, setInternships] = useState<Internship[]>([])

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setUserLoading(true)
        const response = await fetch("http://localhost:8000/api/users/me/", {
          credentials: "include",
        })
        
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
          setUserError(null)
        } else if (response.status === 401) {
          // User not authenticated, redirect to login
          window.location.href = "/login"
        } else {
          setUserError("Failed to fetch user data")
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        setUserError("Network error")
      } finally {
        setUserLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // Fetch user stats
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setStatsLoading(true)
        const response = await fetch("http://localhost:8000/api/users/stats/", {
          credentials: "include",
        })
        
        if (response.ok) {
          const statsData = await response.json()
          setUserStats(statsData)
          setStatsError(null)
        } else if (response.status === 401) {
          // User not authenticated, will be handled by user data fetch
          setStatsError("Authentication required")
        } else {
          setStatsError("Failed to fetch user stats")
        }
      } catch (error) {
        console.error("Error fetching user stats:", error)
        setStatsError("Network error")
      } finally {
        setStatsLoading(false)
      }
    }

    fetchUserStats()
  }, [])

  // Helper function to get user's initials
  const getUserInitials = () => {
    if (!user) return "U"
    
    if (user.first_name && user.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`
    } else if (user.username) {
      return user.username.slice(0, 2).toUpperCase()
    }
    return "U"
  }

  // Helper function to get user's full name
  const getUserFullName = () => {
    if (!user) return "User"
    
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`
    } else if (user.first_name) {
      return user.first_name
    } else if (user.username) {
      return user.username
    }
    return "User"
  }

  // Helper function to get user's display title
  const getUserTitle = () => {
    if (!user) return "Student"
    
    if (user.degree && user.branch) {
      return `${user.degree} ${user.branch} Student`
    } else if (user.degree) {
      return `${user.degree} Student`
    }
    return "Student"
  }

  // Helper function to get user's location
  const getUserLocation = () => {
    if (!user) return ""
    
    if (user.college_name && user.city) {
      return `${user.college_name} • ${user.city}`
    } else if (user.college_name) {
      return user.college_name
    } else if (user.city && user.state) {
      return `${user.city}, ${user.state}`
    } else if (user.city) {
      return user.city
    }
    return ""
  }

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  // Fetch internships from the backend API
  async function fetchInternships(page = 1) {
    try {
      console.log(`Fetching internships: page=${page}`)
      const response = await fetch(`http://localhost:8000/api/internships?page=${page}&page_size=10`)
      console.log(`Response status: ${response.status}`)
      if (response.ok) {
        const data = await response.json()
        console.log("Fetched data:", data)

        // Append new internships to the existing list
        setInternships((prev) => [...prev, ...data.internships])

        // Update hasMore based on API response
        const morePagesAvailable = data.page * 10 < data.total // Ensure batch size of 10
        setHasMore(morePagesAvailable)
        console.log("Updated hasMore:", morePagesAvailable)
      } else {
        console.error("Failed to fetch internships", response.statusText)
      }
    } catch (error) {
      console.error("Error fetching internships:", error)
    }
  }

  useEffect(() => {
    fetchInternships()
  }, [])

  // Add more detailed logs to debug infinite scroll
  const handleScroll = () => {
    console.log("Scroll event triggered")
    console.log("Window height + scrollTop:", window.innerHeight + document.documentElement.scrollTop)
    console.log("Document height:", document.documentElement.offsetHeight)
    console.log("hasMore state:", hasMore)

    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMore
    ) {
      console.log("Fetching next page")
      setPage((prev) => {
        console.log("Incrementing page from:", prev, "to:", prev + 1)
        return prev + 1
      }) // Increment page to fetch next set of data
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasMore])

  useEffect(() => {
    if (page > 1) {
      console.log(`Fetching internships for page: ${page}`); // Debug log for page updates
      fetchInternships(page)
    }
  }, [page])

  // Leaderboard data
  const leaderboardData = [
    { rank: 1, name: "Priya Sharma", score: 2850, skills: ["Web Dev", "AI/ML"], applications: 12, avatar: "PS" },
    { rank: 2, name: "Rahul Kumar", score: 2720, skills: ["Data Science", "Python"], applications: 10, avatar: "RK" },
    { rank: 3, name: "Ananya Singh", score: 2680, skills: ["UI/UX", "Design"], applications: 8, avatar: "AS" },
    { rank: 4, name: "Arjun Patel", score: 2540, skills: ["Backend", "DevOps"], applications: 9, avatar: "AP" },
    { rank: 5, name: "Sneha Reddy", score: 2420, skills: ["Mobile Dev", "React"], applications: 7, avatar: "SR" },
  ]

  // Sidebar items for government portal
  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <Home />,
      isActive: true,
    },
    {
      title: "Internships",
      icon: <Briefcase />,
      badge: "12",
      items: [
        { title: "Browse All", url: "#", badge: "156" },
        { title: "Applied", url: "#", badge: "3" },
        { title: "Saved", url: "#", badge: "5" },
        { title: "Recommended", url: "#", badge: "8" },
        { title: "Interview Scheduled", url: "#", badge: "2" },
        { title: "Offers Received", url: "#", badge: "1" },
      ],
    },
    {
      title: "AI Assistant",
      icon: <Bot />,
      badge: "New",
      items: [
        { title: "Career Guidance", url: "#" },
        { title: "Skill Assessment", url: "#" },
        { title: "Interview Prep", url: "#" },
        { title: "Resume Builder", url: "/resume-builder" },
        { title: "Application Review", url: "#" },
        { title: "Mock Interviews", url: "#" },
      ],
    },
    {
      title: "Leaderboard",
      icon: <Trophy />,
      badge: "Top 5%",
      items: [
        { title: "Overall Ranking", url: "#" },
        { title: "Skill-wise", url: "#" },
        { title: "Department-wise", url: "#" },
        { title: "Monthly Leaders", url: "#" },
        { title: "Achievement Board", url: "#" },
      ],
    },
    {
      title: "Learning",
      icon: <BookOpen />,
      items: [
        { title: "Skill Courses", url: "#", badge: "24" },
        { title: "Certifications", url: "#", badge: "8" },
        { title: "Webinars", url: "#", badge: "Live" },
        { title: "Resources", url: "#" },
        { title: "Study Groups", url: "#" },
        { title: "Mentorship Program", url: "#" },
      ],
    },
    {
      title: "Community",
      icon: <Users />,
      items: [
        { title: "Discussion Forum", url: "#", badge: "45" },
        { title: "Mentorship", url: "#" },
        { title: "Success Stories", url: "#" },
        { title: "Events", url: "#", badge: "3" },
        { title: "Study Groups", url: "#" },
        { title: "Alumni Network", url: "#" },
      ],
    },
    {
      title: "Analytics",
      icon: <TrendingUp />,
      items: [
        { title: "Application Insights", url: "#" },
        { title: "Skill Progress", url: "#" },
        { title: "Performance Reports", url: "#" },
        { title: "Goal Tracking", url: "#" },
      ],
    },
  ]

  const internshipOptions = [
    { id: "all", name: "All Internships", count: 156 },
    { id: "tech", name: "Technology & IT", count: 45 },
    { id: "finance", name: "Finance & Banking", count: 32 },
    { id: "health", name: "Healthcare", count: 28 },
    { id: "education", name: "Education", count: 25 },
    { id: "defense", name: "Defense & Security", count: 26 },
  ]

  const skillBasedLeaderboard = {
    tech: [
      {
        rank: 1,
        name: "Priya Sharma",
        score: 2850,
        skills: ["React", "Node.js", "Python", "AI/ML"],
        matchingSkills: ["React", "Python"],
        learningSkills: ["Docker", "Kubernetes"],
        applications: 12,
        avatar: "PS",
        skillMatch: 85,
      },
      {
        rank: 2,
        name: "Rahul Kumar",
        score: 2720,
        skills: ["Data Science", "Python", "TensorFlow", "SQL"],
        matchingSkills: ["Python", "SQL"],
        learningSkills: ["React", "AWS"],
        applications: 10,
        avatar: "RK",
        skillMatch: 78,
      },
      {
        rank: 3,
        name: "Ananya Singh",
        score: 2680,
        skills: ["UI/UX", "Figma", "React", "TypeScript"],
        matchingSkills: ["React", "TypeScript"],
        learningSkills: ["Next.js", "GraphQL"],
        applications: 8,
        avatar: "AS",
        skillMatch: 72,
      },
      {
        rank: 4,
        name: "Arjun Patel",
        score: 2540,
        skills: ["Backend", "DevOps", "AWS", "Docker"],
        matchingSkills: ["AWS", "Docker"],
        learningSkills: ["Microservices", "Redis"],
        applications: 9,
        avatar: "AP",
        skillMatch: 68,
      },
      {
        rank: 5,
        name: "Sneha Reddy",
        score: 2420,
        skills: ["Mobile Dev", "React Native", "Flutter"],
        matchingSkills: ["React Native"],
        learningSkills: ["Swift", "Kotlin"],
        applications: 7,
        avatar: "SR",
        skillMatch: 65,
      },
    ],
    finance: [
      {
        rank: 1,
        name: "Vikram Shah",
        score: 2650,
        skills: ["Financial Analysis", "Excel", "Python", "SQL"],
        matchingSkills: ["Financial Analysis", "Excel"],
        learningSkills: ["R", "Tableau"],
        applications: 8,
        avatar: "VS",
        skillMatch: 88,
      },
      {
        rank: 2,
        name: "Meera Gupta",
        score: 2580,
        skills: ["Accounting", "SAP", "Financial Modeling"],
        matchingSkills: ["Accounting", "SAP"],
        learningSkills: ["Power BI", "VBA"],
        applications: 6,
        avatar: "MG",
        skillMatch: 82,
      },
    ],
  }

  const [progress, setProgress] = useState(0)
  // Simulate progress loading
  useEffect(() => {
    const timer = setTimeout(() => setProgress(85), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users/logout/", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        // Redirect to login page after successful logout
        window.location.href = "/login";
      } else {
        console.error("Failed to log out", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Helper function to get user's phone number
  // Try to get from localStorage (resume builder form), fallback to user.phone_number
  const getUserPhoneNumber = () => {
    if (typeof window !== "undefined") {
      try {
        const resumeForm = localStorage.getItem("resumeForm");
        if (resumeForm) {
          const parsed = JSON.parse(resumeForm);
          if (parsed?.personalInfo?.phone) {
            return parsed.personalInfo.phone;
          }
        }
      } catch (e) {
        // ignore JSON parse errors
      }
    }
    if (!user) return "No phone number";
    return user.phone_number || "No phone number";
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 z-50 w-72 border-r bg-card backdrop-blur-sm lg:relative lg:translate-x-0"
          >
            <div className="flex h-16 items-center justify-between border-b px-6 bg-card">
              <div className="flex items-center gap-3">
                <SarthiLogo />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="h-[calc(100vh-4rem)] px-4 py-4 bg-card">
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <div key={item.title}>
                    <Button
                      variant={item.isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 rounded-xl px-3 py-2.5 text-left font-medium hover:bg-accent/50",
                        item.isActive && "bg-primary/10 text-primary",
                      )}
                      onClick={() => item.items && toggleExpanded(item.title)}
                    >
                      {item.icon}
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto rounded-lg text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {item.items && (
                        <ChevronRight
                          className={cn("h-4 w-4 transition-transform", expandedItems[item.title] && "rotate-90")}
                        />
                      )}
                    </Button>
                    {item.items && expandedItems[item.title] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-6 mt-2 space-y-1"
                      >
                        {item.items.map((subItem) => (
                          <Button
                            key={subItem.title}
                            variant="ghost"
                            className="w-full justify-start gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent/30"
                          >
                            <span className="flex-1">{subItem.title}</span>
                            {"badge" in subItem && subItem.badge && (
                              <Badge variant="outline" className="ml-auto rounded text-xs">
                                {subItem.badge}
                              </Badge>
                            )}
                          </Button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </nav>
            </ScrollArea>
          </motion.aside>
        )}
      </AnimatePresence>

      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-24 items-center border-b bg-background/80 px-4 md:px-8 shadow-sm">
          <button
            aria-label="Open sidebar menu"
            className="mr-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-background border border-border shadow-sm hover:bg-primary/10 active:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-150 group"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            tabIndex={0}
            type="button"
          >
            {sidebarOpen ? (
              <PanelLeft className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            ) : (
              <span className="flex flex-col items-center justify-center w-6 h-6">
                <span className="block w-6 h-0.5 bg-muted-foreground rounded transition-all group-hover:bg-primary mb-[5px]"></span>
                <span className="block w-6 h-0.5 bg-muted-foreground rounded transition-all group-hover:bg-primary mb-[5px]"></span>
                <span className="block w-6 h-0.5 bg-muted-foreground rounded transition-all group-hover:bg-primary"></span>
              </span>
            )}
            <style jsx>{`
              button:active {
                transform: scale(0.96);
                box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
              }
            `}</style>
          </button>
          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 bg-gradient-to-r from-primary/10 via-card/80 to-blue-100/40 border border-primary/20 rounded-xl px-2 py-1 sm:rounded-2xl sm:px-6 sm:py-3 shadow min-h-[36px] w-full max-w-[220px] sm:max-w-xs md:max-w-lg lg:max-w-2xl">
              <Avatar className="h-6 w-6 sm:h-10 sm:w-10 md:h-12 md:w-12 border border-primary shadow mb-0.5 sm:mb-0">
                <AvatarImage 
                  src={user?.profile_picture ? `http://localhost:8000${user.profile_picture}` : "/placeholder.svg?height=24&width=24"} 
                  alt={getUserFullName()} 
                />
                <AvatarFallback className="text-xs sm:text-base md:text-lg">{getUserInitials()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left w-full">
                <h1 className="text-xs sm:text-lg md:text-2xl font-semibold sm:font-bold md:font-extrabold text-primary flex items-center gap-1 sm:gap-2">
                  {userLoading 
                    ? "Loading..." 
                    : userError 
                      ? "Welcome back!" 
                      : `Welcome back, ${getUserFullName()}!`
                  }
                </h1>
                <p className="text-[10px] sm:text-base md:text-lg text-muted-foreground mt-0.5 font-normal sm:font-medium w-full">
                  {userError 
                    ? `Error: ${userError}` 
                    : "Track your internship journey"
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl"
                      onClick={() => { window.location.href = "/ai-career-chat"; }}
                    >
                      <Bot className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>AI Assistant</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-xl"
                      onClick={() => {
                        if (!mounted) return;
                        console.log("Theme toggle clicked. theme:", theme, "resolvedTheme:", resolvedTheme);
                        setTheme(theme === "dark" ? "light" : "dark");
                      }}
                      disabled={!mounted}
                    >
                      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Toggle theme</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-xl relative">
                      <Bell className="h-5 w-5" />
                      {notifications > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {notifications}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9 border-2 border-primary">
                      <AvatarImage 
                        src={user?.profile_picture ? `http://localhost:8000${user.profile_picture}` : "/placeholder.svg?height=40&width=40"} 
                        alt={getUserFullName()} 
                      />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">
                        {userLoading 
                          ? "Loading..." 
                          : userError 
                            ? "User" 
                            : getUserFullName()
                        }
                      </p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {userLoading 
                          ? "Loading..." 
                          : userError 
                            ? "Error loading email" 
                            : user?.email || "No email"
                        }
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsProfileEditOpen(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Edit Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download Resume</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Main Content Area */}
          <main className="flex-1 overflow-auto">
            <div className="flex h-full">
              {/* Center Content */}
              <div className="flex-1 p-6">
                <Tabs defaultValue="dashboard" className="h-full" value={activeTab} onValueChange={setActiveTab}>
                  <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex w-full max-w-3xl items-center gap-2 bg-card/80 rounded-2xl shadow-lg p-1 border border-border/50">
                      <TabsList className="flex flex-1 gap-1 bg-transparent">
                        <TabsTrigger value="dashboard" className="rounded-xl px-5 py-2 font-semibold text-base transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                          Dashboard
                        </TabsTrigger>
                        <TabsTrigger value="internships" className="rounded-xl px-5 py-2 font-semibold text-base transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                          Internships
                        </TabsTrigger>
                        <TabsTrigger value="leaderboard" className="rounded-xl px-5 py-2 font-semibold text-base transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                          Leaderboard
                        </TabsTrigger>
                        <TabsTrigger value="ai-assistant" className="rounded-xl px-5 py-2 font-semibold text-base transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                          AI Assistant
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-2 flex items-center">
                        <Button className="rounded-xl px-4 py-2 font-semibold text-base bg-gradient-to-r from-primary to-blue-500 text-white shadow-md hover:from-blue-600 hover:to-primary/80 transition-all flex items-center gap-2">
                          <Download className="h-5 w-5" />
                          Export Profile
                        </Button>
                      </div>
                    </div>
                    <div className="hidden md:flex gap-2">
                      <Link href="/recommendations">
                        <Button className="rounded-xl">
                          <Plus className="mr-2 h-4 w-4" />
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TabsContent value="dashboard" className="space-y-8 mt-0">
                        {/* Hero Section */}
                        <section>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-blue-600 to-indigo-600 p-8 text-primary-foreground"
                          >
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                              <div className="space-y-4">
                                <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">
                                  PM Yojna Initiative
                                </Badge>
                                <h2 className="text-3xl font-bold">Shape India's Future</h2>
                                <p className="max-w-[600px] text-white/90">
                                  Join government internships and contribute to nation-building while gaining valuable
                                  experience and skills for your career.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                  <Button className="rounded-xl bg-white text-primary hover:bg-white/90">
                                    Browse Internships
                                  </Button>
                                  <Button
                                    variant="outline"
                                    className="rounded-xl border-white/20 text-white hover:bg-white/10 bg-transparent"
                                  >
                                    <Bot className="mr-2 h-4 w-4" />
                                    Ask AI Assistant
                                  </Button>
                                </div>
                              </div>
                              <div className="hidden md:block">
                                <div className="relative">
                                  <div className="h-32 w-32 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                    <GraduationCap className="h-16 w-16 text-white" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </section>

                        {/* Stats Cards */}
                        <section className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
                          {/* Applications Card */}
                          <Card className="rounded-2xl border-0 shadow-md bg-white/90 dark:bg-card p-4 flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 text-primary rounded-xl p-2 flex items-center justify-center">
                                <Briefcase className="h-6 w-6" />
                              </div>
                              <span className="text-sm font-medium text-muted-foreground">Applications</span>
                            </div>
                            <div className="flex flex-col gap-0.5 pl-1">
                              <span className="text-2xl font-extrabold text-foreground">
                                {statsLoading ? "..." : userStats?.stats?.applications?.total || 0}
                              </span>
                              <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
                                +{statsLoading ? "..." : userStats?.stats?.applications?.this_month || 0} this month
                              </span>
                            </div>
                          </Card>
                          {/* Ranking Card */}
                          <Card className="rounded-2xl border-0 shadow-md bg-white/90 dark:bg-card p-4 flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                              <div className="bg-yellow-100 text-yellow-600 rounded-xl p-2 flex items-center justify-center">
                                <Trophy className="h-6 w-6" />
                              </div>
                              <span className="text-sm font-medium text-muted-foreground">Ranking</span>
                            </div>
                            <div className="flex flex-col gap-0.5 pl-1">
                              <span className="text-2xl font-extrabold text-foreground">
                                #{statsLoading ? "..." : userStats?.stats?.ranking?.position || "N/A"}
                              </span>
                              <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                                Top {statsLoading ? "..." : userStats?.stats?.ranking?.percentile || "N/A"}% nationwide
                              </span>
                            </div>
                          </Card>
                          {/* Skills Score Card */}
                          <Card className="rounded-2xl border-0 shadow-md bg-white/90 dark:bg-card p-4 flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                              <div className="bg-green-100 text-green-600 rounded-xl p-2 flex items-center justify-center">
                                <Target className="h-6 w-6" />
                              </div>
                              <span className="text-sm font-medium text-muted-foreground">Skills Score</span>
                            </div>
                            <div className="flex flex-col gap-0.5 pl-1">
                              <span className="text-2xl font-extrabold text-foreground">
                                {statsLoading ? "..." : userStats?.stats?.skills_score?.total?.toLocaleString() || 0}
                              </span>
                              <span className="text-xs text-green-700 dark:text-green-400 font-semibold">
                                +{statsLoading ? "..." : userStats?.stats?.skills_score?.this_week || 0} this week
                              </span>
                            </div>
                          </Card>
                          {/* Success Rate Card */}
                          <Card className="rounded-2xl border-0 shadow-md bg-white/90 dark:bg-card p-4 flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-100 text-blue-600 rounded-xl p-2 flex items-center justify-center">
                                <TrendingUp className="h-6 w-6" />
                              </div>
                              <span className="text-sm font-medium text-muted-foreground">Success Rate</span>
                            </div>
                            <div className="flex flex-col gap-0.5 pl-1">
                              <span className="text-2xl font-extrabold text-foreground">
                                {statsLoading ? "..." : userStats?.stats?.success_rate?.percentage || 0}%
                              </span>
                              <span className={`text-xs font-semibold ${statsLoading ? '' : userStats?.stats?.success_rate?.status === 'above_average' ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                {statsLoading 
                                  ? "Loading..." 
                                  : userStats?.stats?.success_rate?.status === 'above_average' 
                                    ? "Above average" 
                                    : "Average"
                                }
                              </span>
                            </div>
                          </Card>
                        </section>

                        {/* Quick Actions */}
                        <section className="space-y-4">
                          <h2 className="text-2xl font-semibold">Quick Actions</h2>
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
                            {/* AI Career Chat */}
                            <Link href="/ai-career-chat" className="group">
                              <Card className="rounded-2xl border-0 shadow-md bg-white/90 dark:bg-card p-5 flex flex-col items-center gap-3 cursor-pointer transition-transform duration-150 group-hover:scale-[1.04] group-active:scale-95 group-hover:shadow-lg">
                                <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                                  <Bot className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="text-base font-bold text-foreground">AI Career Chat</h3>
                                <p className="text-xs text-muted-foreground font-medium">Get instant guidance</p>
                              </Card>
                            </Link>
                            {/* Skill Assessment */}
                            <div className="group">
                              <Card className="rounded-2xl border-0 shadow-md bg-white/90 dark:bg-card p-5 flex flex-col items-center gap-3 cursor-pointer transition-transform duration-150 group-hover:scale-[1.04] group-active:scale-95 group-hover:shadow-lg">
                                <div className="h-14 w-14 rounded-full bg-green-200/60 flex items-center justify-center group-hover:bg-green-300/80 transition-colors">
                                  <Target className="h-7 w-7 text-green-700" />
                                </div>
                                <h3 className="text-base font-bold text-foreground">Skill Assessment</h3>
                                <p className="text-xs text-muted-foreground font-medium">Test your abilities</p>
                              </Card>
                            </div>
                            {/* Resume Builder */}
                            <Link href="/resume-builder" className="group">
                              <Card className="rounded-2xl border-0 shadow-md bg-white/90 dark:bg-card p-5 flex flex-col items-center gap-3 cursor-pointer transition-transform duration-150 group-hover:scale-[1.04] group-active:scale-95 group-hover:shadow-lg">
                                <div className="h-14 w-14 rounded-full bg-yellow-200/60 flex items-center justify-center group-hover:bg-yellow-300/80 transition-colors">
                                  <FileText className="h-7 w-7 text-yellow-700" />
                                </div>
                                <h3 className="text-base font-bold text-foreground">Resume Builder</h3>
                                <p className="text-xs text-muted-foreground font-medium">Create perfect resume</p>
                              </Card>
                            </Link>
                            {/* Mock Interview */}
                            <div className="group">
                              <Card className="rounded-2xl border-0 shadow-md bg-white/90 dark:bg-card p-5 flex flex-col items-center gap-3 cursor-pointer transition-transform duration-150 group-hover:scale-[1.04] group-active:scale-95 group-hover:shadow-lg">
                                <div className="h-14 w-14 rounded-full bg-blue-200/60 flex items-center justify-center group-hover:bg-blue-300/80 transition-colors">
                                  <MessageSquare className="h-7 w-7 text-blue-700" />
                                </div>
                                <h3 className="text-base font-bold text-foreground">Mock Interview</h3>
                                <p className="text-xs text-muted-foreground font-medium">Practice interviews</p>
                              </Card>
                            </div>
                          </div>
                        </section>

                        {/* Featured Internships */}
                        <section className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold">Featured Internships</h2>
                            <Button variant="outline" className="rounded-xl bg-transparent">
                              View All
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {(() => {
                              const featured = internships.filter((internship) => internship.featured);
                              if (featured.length === 0) {
                                return (
                                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-muted-foreground bg-muted/40 rounded-2xl border border-dashed border-border">
                                    <span className="text-2xl font-bold mb-2">No Featured Internships</span>
                                    <span className="text-sm">Check back later for new opportunities!</span>
                                  </div>
                                );
                              }
                              return featured.map((internship, index) => (
                                <motion.div
                                  key={`${internship.title}-${index}`}
                                  whileHover={{ scale: 1.025, y: -6 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Card className="overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-xl hover:ring-2 hover:ring-primary/30 transition-all duration-200 bg-white/95 dark:bg-card group">
                                    <div className="flex flex-col h-full">
                                      <div className="flex items-center justify-between px-6 pt-6 pb-2">
                                        <div className="flex flex-col gap-1">
                                          <span className="inline-flex items-center gap-2">
                                            <Building className="h-4 w-4 text-primary" />
                                            <span className="text-base font-semibold text-foreground">{internship.title}</span>
                                          </span>
                                          <span className="text-xs text-muted-foreground font-medium">{internship.department}</span>
                                        </div>
                                        <Badge className="rounded-xl bg-primary/10 text-primary font-semibold text-xs px-3 py-1">Featured</Badge>
                                      </div>
                                      <div className="px-6 pb-4 flex flex-col gap-3 flex-1">
                                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                          <span className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            {internship.location}
                                          </span>
                                          <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {internship.duration}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-lg font-bold text-success">{internship.stipend}</span>
                                          <span className="text-xs text-muted-foreground">Stipend</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                          {internship.skills.slice(0, 4).map((skill) => (
                                            <Badge key={skill} variant="outline" className="rounded-lg text-xs px-2 py-0.5 bg-primary/5 border-primary/10 text-primary font-medium">
                                              {skill}
                                            </Badge>
                                          ))}
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                          <span className="text-xs text-muted-foreground">Deadline:</span>
                                          <span className="text-xs font-semibold text-destructive">
                                            {new Date(internship.deadline).toLocaleDateString()}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3 px-6 pb-5 pt-2 mt-auto">
                                        <Link href="/recommendations" className="flex-1">
                                          <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-blue-500 text-white font-bold shadow hover:from-blue-600 hover:to-primary/80 transition-all py-2 text-base">
                                            Apply Now
                                          </Button>
                                        </Link>
                                        <Button variant="outline" size="icon" className="rounded-xl bg-white/80 dark:bg-card border border-border hover:bg-primary/10 transition-colors">
                                          <Bookmark className="h-5 w-5 text-primary" />
                                        </Button>
                                      </div>
                                    </div>
                                  </Card>
                                </motion.div>
                              ));
                            })()}
                          </div>
                        </section>

                        {/* Your Progress */}
                        <section className="space-y-4">
                          <h2 className="text-2xl font-semibold">Your Progress</h2>
                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <Card className="rounded-2xl">
                              <CardHeader>
                                <CardTitle className="text-lg">Application Pipeline</CardTitle>
                                <CardDescription>Track your internship applications</CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Applied</span>
                                  <span className="text-sm font-medium">
                                    {statsLoading 
                                      ? "..." 
                                      : `${userStats?.stats?.applications?.total || 0} applications`
                                    }
                                  </span>
                                </div>
                                <Progress value={100} className="h-2" />

                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Under Review</span>
                                  <span className="text-sm font-medium">
                                    {statsLoading 
                                      ? "..." 
                                      : `${Math.max(0, (userStats?.stats?.applications?.total || 0) - 2)} applications`
                                    }
                                  </span>
                                </div>
                                <Progress 
                                  value={statsLoading ? 50 : Math.max(10, ((userStats?.stats?.applications?.total || 0) - 2) / (userStats?.stats?.applications?.total || 1) * 100)} 
                                  className="h-2" 
                                />

                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Interview Scheduled</span>
                                  <span className="text-sm font-medium">
                                    {statsLoading 
                                      ? "..." 
                                      : `${Math.max(0, Math.floor((userStats?.stats?.applications?.total || 0) * 0.25))} applications`
                                    }
                                  </span>
                                </div>
                                <Progress 
                                  value={statsLoading ? 25 : Math.max(5, Math.floor((userStats?.stats?.applications?.total || 0) * 0.25) / (userStats?.stats?.applications?.total || 1) * 100)} 
                                  className="h-2" 
                                />

                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Offers Received</span>
                                  <span className="text-sm font-medium">
                                    {statsLoading 
                                      ? "..." 
                                      : `${Math.max(0, Math.floor((userStats?.stats?.applications?.total || 0) * 0.1))} applications`
                                    }
                                  </span>
                                </div>
                                <Progress 
                                  value={statsLoading ? 8 : Math.max(2, Math.floor((userStats?.stats?.applications?.total || 0) * 0.1) / (userStats?.stats?.applications?.total || 1) * 100)} 
                                  className="h-2" 
                                />
                              </CardContent>
                            </Card>

                            <Card className="rounded-2xl">
                              <CardHeader>
                                <CardTitle className="text-lg">Monthly Goals</CardTitle>
                                <CardDescription>Your targets for this month</CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">Applications Target</span>
                                    <span className="text-sm font-medium">
                                      {statsLoading 
                                        ? "..." 
                                        : `${userStats?.stats?.applications?.total || 0}/${Math.max(5, (userStats?.stats?.applications?.total || 0) + 3)}`
                                      }
                                    </span>
                                  </div>
                                  <Progress 
                                    value={statsLoading ? 50 : Math.min(100, ((userStats?.stats?.applications?.total || 0) / Math.max(5, (userStats?.stats?.applications?.total || 0) + 3)) * 100)} 
                                    className="h-2" 
                                  />
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">Profile Completion</span>
                                    <span className="text-sm font-medium">
                                      {statsLoading 
                                        ? "..." 
                                        : `${userStats?.stats?.profile_completion || 0}%/100%`
                                      }
                                    </span>
                                  </div>
                                  <Progress 
                                    value={statsLoading ? 60 : userStats?.stats?.profile_completion || 0} 
                                    className="h-2" 
                                  />
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">Skill Progress</span>
                                    <span className="text-sm font-medium">
                                      {statsLoading 
                                        ? "..." 
                                        : userStats?.skills_progress?.length > 0
                                          ? `${Math.round(userStats.skills_progress.reduce((acc: number, skill: any) => acc + skill.progress, 0) / userStats.skills_progress.length)}%`
                                          : "0%"
                                      }
                                    </span>
                                  </div>
                                  <Progress 
                                    value={statsLoading 
                                      ? 40 
                                      : userStats?.skills_progress?.length > 0
                                        ? Math.round(userStats.skills_progress.reduce((acc: number, skill: any) => acc + skill.progress, 0) / userStats.skills_progress.length)
                                        : 0
                                    } 
                                    className="h-2" 
                                  />
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">Network Connections</span>
                                    <span className="text-sm font-medium">8/10</span>
                                  </div>
                                  <Progress value={80} className="h-2" />
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </section>

                        {/* Upcoming Events */}
                        <section className="space-y-4">
                          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <Card className="rounded-2xl border-2 hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                    <Badge variant="outline" className="rounded-lg text-xs">
                                      Tomorrow
                                    </Badge>
                                  </div>
                                  <div>
                                    <h3 className="font-medium">AI in Government Webinar</h3>
                                    <p className="text-sm text-muted-foreground">
                                      Learn about AI applications in public sector
                                    </p>
                                  </div>
                                  <div className="text-xs text-muted-foreground">2:00 PM - 3:30 PM</div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="rounded-2xl border-2 hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-success"></div>
                                    <Badge variant="outline" className="rounded-lg text-xs">
                                      This Week
                                    </Badge>
                                  </div>
                                  <div>
                                    <h3 className="font-medium">Mock Interview Session</h3>
                                    <p className="text-sm text-muted-foreground">Practice with industry experts</p>
                                  </div>
                                  <div className="text-xs text-muted-foreground">Friday, 4:00 PM</div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="rounded-2xl border-2 hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-warning"></div>
                                    <Badge variant="outline" className="rounded-lg text-xs">
                                      Next Week
                                    </Badge>
                                  </div>
                                  <div>
                                    <h3 className="font-medium">Career Fair 2024</h3>
                                    <p className="text-sm text-muted-foreground">
                                      Meet recruiters from top departments
                                    </p>
                                  </div>
                                  <div className="text-xs text-muted-foreground">March 15-16</div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </section>
                      </TabsContent>

                      <TabsContent value="internships" className="space-y-6 mt-0">
                        {/* Search and Filters */}
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Search internships..." className="rounded-xl pl-9" />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" className="rounded-xl bg-transparent">
                              All Departments
                            </Button>
                            <Button variant="outline" className="rounded-xl bg-transparent">
                              Technical
                            </Button>
                            <Button variant="outline" className="rounded-xl bg-transparent">
                              Research
                            </Button>
                            <Button variant="outline" className="rounded-xl bg-transparent">
                              Social
                            </Button>
                          </div>
                        </div>

                        {/* All Internships */}
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                          {internships.map((internship, index) => (
                            <motion.div
                              key={`${internship.title}-${index}`}
                              whileHover={{ scale: 1.02, y: -5 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Card className="overflow-hidden rounded-2xl border hover:border-primary/50 transition-all duration-300">
                                <CardHeader className="pb-3">
                                  <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                      <CardTitle className="text-lg">{internship.title}</CardTitle>
                                      <CardDescription className="flex items-center gap-1">
                                        <Building className="h-3 w-3" />
                                        {internship.department}
                                      </CardDescription>
                                    </div>
                                    <div className="flex gap-1">
                                      {internship.featured && (
                                        <Badge className="rounded-xl bg-primary/10 text-primary">Featured</Badge>
                                      )}
                                      <Badge variant="outline" className="rounded-xl">
                                        {internship.type}
                                      </Badge>
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {internship.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {internship.duration}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Users className="h-3 w-3" />
                                      {internship.applicants} applied
                                    </div>
                                  </div>
                                  <div className="text-lg font-semibold text-success">{internship.stipend}</div>
                                  <div className="flex flex-wrap gap-1">
                                    {internship.skills.map((skill) => (
                                      <Badge key={skill} variant="outline" className="rounded-lg text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Deadline: {new Date(internship.deadline).toLocaleDateString()}
                                  </div>
                                </CardContent>
                                <CardFooter className="flex gap-2">
                                  <Link href="/recommendations" className="flex-1">
                                    <Button className="w-full rounded-xl">Apply Now</Button>
                                  </Link>
                                  <Button variant="outline" size="icon" className="rounded-xl bg-transparent">
                                    <Bookmark className="h-4 w-4" />
                                  </Button>
                                </CardFooter>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="leaderboard" className="space-y-6 mt-0">
                        <div className="flex items-center justify-between">
                          <h2 className="text-2xl font-semibold">Skill-Based Leaderboard</h2>
                          <div className="flex gap-2">
                            <Select value={selectedInternship} onValueChange={setSelectedInternship}>
                              <SelectTrigger className="w-48 rounded-xl">
                                <SelectValue placeholder="Select internship category" />
                              </SelectTrigger>
                              <SelectContent>
                                {internshipOptions.map((option) => (
                                  <SelectItem key={option.id} value={option.id}>
                                    {option.name} ({option.count})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid gap-6">
                          {/* Skills Required Section */}
                          <Card className="rounded-2xl">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5" />
                                Skills Required for{" "}
                                {internshipOptions.find((opt) => opt.id === selectedInternship)?.name}
                              </CardTitle>
                              <CardDescription>Top skills companies are looking for in this category</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-2">
                                {selectedInternship === "tech" && (
                                  <>
                                    <Badge variant="secondary" className="rounded-lg">
                                      React
                                    </Badge>
                                    <Badge variant="secondary" className="rounded-lg">
                                      Python
                                    </Badge>
                                    <Badge variant="secondary" className="rounded-lg">
                                      Node.js
                                    </Badge>
                                    <Badge variant="secondary" className="rounded-lg">
                                      AWS
                                    </Badge>
                                    <Badge variant="secondary" className="rounded-lg">
                                      Docker
                                    </Badge>
                                    <Badge variant="secondary" className="rounded-lg">
                                      TypeScript
                                    </Badge>
                                    <Badge variant="secondary" className="rounded-lg">
                                      SQL
                                    </Badge>
                                  </>
                                )}
                                {selectedInternship === "finance" && (
                                  <>
                                    <Badge variant="secondary" className="rounded-lg">
                                      Financial Analysis
                                    </Badge>
                                    <Badge variant="secondary" className="rounded-lg">
                                      Excel
                                    </Badge>
                                    <Badge variant="secondary" className="rounded-lg">
                                      SAP
                                    </Badge>
                                    <Badge variant="secondary" className="rounded-lg">
                                      Python
                                    </Badge>
                                    <Badge variant="secondary" className="rounded-lg">
                                      Accounting
                                    </Badge>
                                    <Badge variant="secondary" className="rounded-lg">
                                      Financial Modeling
                                    </Badge>
                                  </>
                                )}
                              </div>
                            </CardContent>
                          </Card>

                          {/* Leaderboard */}
                          <Card className="rounded-2xl">
                            <CardHeader>
                              <CardTitle>Top Performers - Skill Match Rankings</CardTitle>
                              <CardDescription>Ranked by skill compatibility and learning progress</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {(
                                skillBasedLeaderboard[selectedInternship as keyof typeof skillBasedLeaderboard] ||
                                skillBasedLeaderboard.tech
                              ).map((user) => (
                                <div
                                  key={user.rank}
                                  className="flex items-center gap-4 p-4 rounded-xl border hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                                    {user.rank}
                                  </div>
                                  <Avatar className="h-12 w-12">
                                    <AvatarFallback>{user.avatar}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{user.name}</span>
                                      <Badge variant="outline" className="rounded text-xs">
                                        {user.skillMatch}% match
                                      </Badge>
                                    </div>

                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2 text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <span className="text-muted-foreground">Has:</span>
                                        <div className="flex gap-1">
                                          {user.matchingSkills.map((skill) => (
                                            <Badge
                                              key={skill}
                                              variant="secondary"
                                              className="rounded text-xs bg-green-100 text-green-700"
                                            >
                                              {skill}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2 text-sm">
                                        <BookOpen className="h-4 w-4 text-blue-500" />
                                        <span className="text-muted-foreground">Learning:</span>
                                        <div className="flex gap-1">
                                          {user.learningSkills.map((skill) => (
                                            <Badge
                                              key={skill}
                                              variant="outline"
                                              className="rounded text-xs bg-blue-50 text-blue-700 border-blue-200"
                                            >
                                              {skill}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="text-right space-y-1">
                                    <div className="font-bold text-primary">{user.score}</div>
                                    <div className="text-xs text-muted-foreground">points</div>
                                    <div className="text-xs text-muted-foreground">
                                      {user.applications} applications
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </CardContent>
                          </Card>

                          {/* What Others Are Learning */}
                          <Card className="rounded-2xl">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                What Others Are Learning
                              </CardTitle>
                              <CardDescription>Popular skills being learned by top performers</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <h4 className="font-medium text-sm">Trending Skills</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                      <span>Docker & Kubernetes</span>
                                      <Badge variant="secondary" className="rounded">
                                        +45% learners
                                      </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                      <span>AWS Cloud</span>
                                      <Badge variant="secondary" className="rounded">
                                        +38% learners
                                      </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                      <span>Next.js</span>
                                      <Badge variant="secondary" className="rounded">
                                        +32% learners
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <h4 className="font-medium text-sm">High Demand Skills</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                      <span>Microservices</span>
                                      <Badge variant="outline" className="rounded">
                                        85% job match
                                      </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                      <span>GraphQL</span>
                                      <Badge variant="outline" className="rounded">
                                        78% job match
                                      </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                      <span>Redis</span>
                                      <Badge variant="outline" className="rounded">
                                        72% job match
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>

                      <TabsContent value="ai-assistant" className="space-y-6 mt-0">
                        <Card className="rounded-2xl">
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                <Bot className="h-5 w-5" />
                              </div>
                              <div>
                                <CardTitle>AI Career Assistant</CardTitle>
                                <CardDescription>Get personalized guidance for your internship journey</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              <Card className="rounded-xl border-2 hover:border-primary/50 transition-colors cursor-pointer">
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-3">
                                    <Target className="h-8 w-8 text-primary" />
                                    <div>
                                      <h3 className="font-medium">Skill Assessment</h3>
                                      <p className="text-sm text-muted-foreground">
                                        Evaluate your skills and get recommendations
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                              <Card className="rounded-xl border-2 hover:border-primary/50 transition-colors cursor-pointer">
                                <CardContent className="p-4">
                                  <Link href="/resume-builder" className="flex items-center gap-3">
                                    <FileText className="h-8 w-8 text-primary" />
                                    <div>
                                      <h3 className="font-medium">Resume Builder</h3>
                                      <p className="text-sm text-muted-foreground">
                                        Create a professional resume with AI help
                                      </p>
                                    </div>
                                  </Link>
                                </CardContent>
                              </Card>
                              <Card className="rounded-xl border-2 hover:border-primary/50 transition-colors cursor-pointer">
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-3">
                                    <MessageSquare className="h-8 w-8 text-primary" />
                                    <div>
                                      <h3 className="font-medium">Interview Prep</h3>
                                      <p className="text-sm text-muted-foreground">
                                        Practice with AI-powered mock interviews
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                              <Card className="rounded-xl border-2 hover:border-primary/50 transition-colors cursor-pointer">
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-3">
                                    <BookOpen className="h-8 w-8 text-primary" />
                                    <div>
                                      <h3 className="font-medium">Career Guidance</h3>
                                      <p className="text-sm text-muted-foreground">
                                        Get personalized career path recommendations
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>

                            <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                              <div className="flex items-start gap-3">
                                <Bot className="h-6 w-6 text-primary mt-1" />
                                <div className="flex-1">
                                  <p className="text-sm">
                                    <strong>AI Suggestion:</strong> Based on your profile, you're a great fit for the
                                    "Digital India Initiative" internship. Your web development skills align perfectly
                                    with their requirements. Would you like me to help you prepare your application?
                                  </p>
                                  <div className="flex gap-2 mt-3">
                                    <Button size="sm" className="rounded-lg">
                                      Help me apply
                                    </Button>
                                    <Button size="sm" variant="outline" className="rounded-lg bg-transparent">
                                      Show more suggestions
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>
              </div>

              {/* Right Sidebar - Profile */}
              <aside className="hidden xl:block w-80 border-l bg-card/50 p-6">
                <div className="space-y-6">
                  {/* Profile Card */}
                  <Card className="rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-20 w-20 border-4 border-primary">
                          <AvatarImage 
                            src={user?.profile_picture ? `http://localhost:8000${user.profile_picture}` : "/placeholder.svg?height=80&width=80"} 
                            alt="Profile" 
                          />
                          <AvatarFallback className="text-lg">{getUserInitials()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {userLoading 
                              ? "Loading..." 
                              : userError 
                                ? "User" 
                                : getUserFullName()
                            }
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {userLoading 
                              ? "Loading..." 
                              : userError 
                                ? "Student" 
                                : getUserTitle()
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {userLoading 
                              ? "Loading..." 
                              : userError 
                                ? "Location not available" 
                                : getUserLocation()
                            }
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Trophy className="h-4 w-4 text-primary" />
                          <span>
                            {statsLoading 
                              ? "Loading rank..." 
                              : userStats?.stats?.ranking?.position 
                                ? `Rank #${userStats.stats.ranking.position} • Top ${userStats.stats.ranking.percentile}%`
                                : "Rank not available"
                            }
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Info */}
                  <Card className="rounded-2xl shadow-md border-2 border-muted bg-gradient-to-br from-white via-slate-50 to-slate-100">
                    <CardHeader className="pb-2 border-b border-muted/30">
                      <CardTitle className="text-base font-semibold tracking-wide text-primary flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary" />
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                      {/* Email Row */}
                      <div className="flex items-center gap-4 text-base font-medium">
                        <div className="flex items-center gap-2 min-w-[32px]">
                          <Mail className="h-5 w-5 text-blue-500" />
                        </div>
                        <span className="flex-1 truncate">
                          {userLoading
                            ? <span className="text-muted-foreground">Loading...</span>
                            : userError
                              ? <span className="text-destructive">Error loading email</span>
                              : user?.email || <span className="text-muted-foreground">No email</span>
                          }
                        </span>
                        <span className="flex items-center gap-1">
                          <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs bg-green-100 text-green-700 border-green-200">Verified</Badge>
                        </span>
                      </div>
                      {/* Phone Row */}
                      <div className="flex items-center gap-4 text-base font-medium">
                        <div className="flex items-center gap-2 min-w-[32px]">
                          <Phone className="h-5 w-5 text-amber-500" />
                        </div>
                        <span className="flex-1 truncate">
                          {userLoading
                            ? <span className="text-muted-foreground">Loading...</span>
                            : userError
                              ? <span className="text-destructive">Error loading phone</span>
                              : getUserPhoneNumber() && getUserPhoneNumber() !== "No phone number"
                                ? getUserPhoneNumber()
                                : <span className="text-muted-foreground">No phone number</span>
                          }
                        </span>
                        <span className="flex items-center gap-1">
                          {(getUserPhoneNumber() && getUserPhoneNumber() !== "No phone number") ? (
                            <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs bg-green-100 text-green-700 border-green-200">Verified</Badge>
                          ) : (
                            <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs bg-gray-100 text-gray-500 border-gray-200">Not set</Badge>
                          )}
                        </span>
                      </div>
                      {/* Location Row */}
                      <div className="flex items-center gap-4 text-base font-medium">
                        <div className="flex items-center gap-2 min-w-[32px]">
                          <MapPin className="h-5 w-5 text-emerald-500" />
                        </div>
                        <span className="flex-1 truncate">
                          {userLoading
                            ? <span className="text-muted-foreground">Loading...</span>
                            : userError
                              ? <span className="text-destructive">Location not available</span>
                              : (user?.city && user?.state)
                                ? `${user.city}, ${user.state}`
                                : user?.city
                                  ? user.city
                                  : <span className="text-muted-foreground">Location not set</span>
                          }
                        </span>
                        <span className="flex items-center gap-1">
                          {(user?.city && user?.state) || user?.city ? (
                            <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs bg-green-100 text-green-700 border-green-200">Set</Badge>
                          ) : (
                            <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs bg-gray-100 text-gray-500 border-gray-200">Not set</Badge>
                          )}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skills Progress */}
                  <Card className="rounded-2xl">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Skill Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {statsLoading ? (
                        <div className="space-y-4">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Loading...</span>
                                <span>...</span>
                              </div>
                              <Progress value={50} className="h-2" />
                            </div>
                          ))}
                        </div>
                      ) : userStats?.skills_progress?.length > 0 ? (
                        userStats.skills_progress.map((skill: any, index: number) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{skill.name}</span>
                              <span>{skill.progress}%</span>
                            </div>
                            <Progress value={skill.progress} className="h-2" />
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground text-center py-4">
                          Add skills to your profile to see progress
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="rounded-2xl">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {statsLoading ? (
                        <div className="space-y-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-3 text-sm">
                              <div className="h-2 w-2 rounded-full bg-muted mt-2"></div>
                              <div className="flex-1">
                                <p>Loading...</p>
                                <p className="text-xs text-muted-foreground">...</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : userStats?.recent_activity?.length > 0 ? (
                        userStats.recent_activity.map((activity: any, index: number) => (
                          <div key={index} className="flex items-start gap-3 text-sm">
                            <div className={`h-2 w-2 rounded-full mt-2 ${
                              activity.color === 'primary' ? 'bg-primary' :
                              activity.color === 'success' ? 'bg-success' :
                              activity.color === 'warning' ? 'bg-warning' :
                              activity.color === 'info' ? 'bg-info' : 'bg-muted'
                            }`}></div>
                            <div className="flex-1">
                              <p>{activity.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {activity.description} • {activity.time}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground text-center py-4">
                          Start your journey to see activities here
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Recent Achievements */}
                  <Card className="rounded-2xl">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Recent Achievements</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {statsLoading ? (
                        <div className="space-y-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-muted/5">
                              <div className="h-6 w-6 bg-muted rounded" />
                              <div className="flex-1">
                                <p className="text-sm font-medium">Loading...</p>
                                <p className="text-xs text-muted-foreground">...</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : userStats?.achievements?.length > 0 ? (
                        userStats.achievements.map((achievement: any, index: number) => (
                          <div key={index} className={`flex items-center gap-3 p-2 rounded-lg ${
                            achievement.color === 'primary' ? 'bg-primary/5' :
                            achievement.color === 'success' ? 'bg-success/5' :
                            achievement.color === 'warning' ? 'bg-warning/5' :
                            achievement.color === 'info' ? 'bg-info/5' : 'bg-muted/5'
                          }`}>
                            {achievement.icon === 'trophy' ? (
                              <Trophy className={`h-6 w-6 ${
                                achievement.color === 'primary' ? 'text-primary' :
                                achievement.color === 'success' ? 'text-success' :
                                achievement.color === 'warning' ? 'text-warning' :
                                achievement.color === 'info' ? 'text-info' : 'text-muted-foreground'
                              }`} />
                            ) : achievement.icon === 'target' ? (
                              <Target className={`h-6 w-6 ${
                                achievement.color === 'primary' ? 'text-primary' :
                                achievement.color === 'success' ? 'text-success' :
                                achievement.color === 'warning' ? 'text-warning' :
                                achievement.color === 'info' ? 'text-info' : 'text-muted-foreground'
                              }`} />
                            ) : achievement.icon === 'users' ? (
                              <Users className={`h-6 w-6 ${
                                achievement.color === 'primary' ? 'text-primary' :
                                achievement.color === 'success' ? 'text-success' :
                                achievement.color === 'warning' ? 'text-warning' :
                                achievement.color === 'info' ? 'text-info' : 'text-muted-foreground'
                              }`} />
                            ) : (
                              <Trophy className={`h-6 w-6 ${
                                achievement.color === 'primary' ? 'text-primary' :
                                achievement.color === 'success' ? 'text-success' :
                                achievement.color === 'warning' ? 'text-warning' :
                                achievement.color === 'info' ? 'text-info' : 'text-muted-foreground'
                              }`} />
                            )}
                            <div className="flex-1">
                              <p className="text-sm font-medium">{achievement.title}</p>
                              <p className="text-xs text-muted-foreground">{achievement.description}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground text-center py-4">
                          Complete your profile to unlock achievements
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <Button 
                      className="w-full rounded-xl justify-start bg-transparent" 
                      variant="outline"
                      onClick={() => setIsProfileEditOpen(true)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button className="w-full rounded-xl justify-start bg-transparent" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </Button>
                    <Button className="w-full rounded-xl justify-start bg-transparent" variant="outline">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>

        {/* Profile Edit Modal */}
        <ProfileEditModal 
          isOpen={isProfileEditOpen} 
          onClose={() => setIsProfileEditOpen(false)} 
        />
      </div>
    </div>
  )
}

