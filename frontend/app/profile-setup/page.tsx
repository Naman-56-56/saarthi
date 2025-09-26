"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  GraduationCap,
  MapPin,
  Building,
  Upload,
  ArrowRight,
  ArrowLeft,
  Check,
  Shield,
  Mail,
  Phone,
} from "lucide-react"

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  profilePicture: File | null

  // Education
  collegeName: string
  degree: string
  branch: string
  yearOfStudy: string
  cgpa: string
  graduationYear: string

  // Location
  city: string
  state: string
  country: string

  // Professional
  bio: string
  skills: string
  github: string
  linkedin: string
  portfolio: string
}

const steps = [
  {
    id: 1,
    title: "Personal Info",
    description: "Tell us about yourself",
    icon: User,
    fields: ["firstName", "lastName", "email", "phone", "dateOfBirth", "gender", "profilePicture"],
  },
  {
    id: 2,
    title: "Education",
    description: "Your academic background",
    icon: GraduationCap,
    fields: ["collegeName", "degree", "branch", "yearOfStudy", "cgpa", "graduationYear"],
  },
  {
    id: 3,
    title: "Location",
    description: "Where are you based?",
    icon: MapPin,
    fields: ["city", "state", "country"],
  },
  {
    id: 4,
    title: "Professional",
    description: "Your skills and experience",
    icon: Building,
    fields: ["bio", "skills", "github", "linkedin", "portfolio"],
  },
  {
    id: 5,
    title: "Verification",
    description: "Verify your account",
    icon: Shield,
    fields: [],
  },
]

interface ProfileSetupProps {
  isFirstTime: boolean;
  onComplete: () => void;
}

export default function AnimatedProfileForm({ isFirstTime, onComplete }: ProfileSetupProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    profilePicture: null,
    collegeName: "",
    degree: "",
    branch: "",
    yearOfStudy: "",
    cgpa: "",
    graduationYear: "",
    city: "",
    state: "",
    country: "India",
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
    portfolio: "",
  })
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  // Redirect to dashboard after verification
  useEffect(() => {
    if (isVerified) {
      router.push("/dashboard");
    }
  }, [isVerified, router]);

  const handleInputChange = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otpCode]
      newOtp[index] = value
      setOtpCode(newOtp)

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const sendOtp = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8000/api/users/send-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setOtpSent(true);
      } else {
        alert(data.error || "Failed to send OTP");
      }
    } catch (err) {
      alert("Network error while sending OTP");
    }
    setIsLoading(false);
  }

  const verifyOtp = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsVerified(true)
    setIsLoading(false)

    // Complete form submission
    setTimeout(() => {
      alert("Profile created successfully!")
    }, 1000)
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = (stepId: number) => {
    const step = steps.find((s) => s.id === stepId)
    if (!step) return false

    return step.fields.every((field) => {
      if (field === "profilePicture") return true // Optional
      return formData[field as keyof FormData] !== ""
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto pt-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Complete Your Profile</h1>
          <p className="text-muted-foreground text-lg">Let's get to know you better with our step-by-step form</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              const Icon = step.icon

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <motion.div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                        isCompleted
                          ? "bg-primary border-primary text-primary-foreground"
                          : isActive
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-muted border-border text-muted-foreground",
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </motion.div>
                    <div className="mt-2 text-center">
                      <p className={cn("text-sm font-medium", isActive ? "text-primary" : "text-muted-foreground")}>
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "w-16 h-0.5 mx-4 transition-colors duration-300",
                        currentStep > step.id ? "bg-primary" : "bg-border",
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Form Content */}
        <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-xl">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-2">Personal Information</h2>
                    <p className="text-muted-foreground">Tell us about yourself</p>
                  </div>

                  {/* Profile Picture */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-4 border-primary/20">
                        <AvatarImage
                          src={formData.profilePicture ? URL.createObjectURL(formData.profilePicture) : ""}
                        />
                        <AvatarFallback className="text-xl bg-primary/10 text-primary">
                          {formData.firstName && formData.lastName
                            ? `${formData.firstName[0]}${formData.lastName[0]}`
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <Label htmlFor="profilePicture" className="absolute -bottom-2 -right-2 cursor-pointer">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
                          <Upload className="w-4 h-4" />
                        </div>
                      </Label>
                      <Input
                        id="profilePicture"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleInputChange("profilePicture", e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="John"
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Doe"
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@example.com"
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Education */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-2">Education</h2>
                    <p className="text-muted-foreground">Your academic background</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="collegeName">College/University Name *</Label>
                      <Input
                        id="collegeName"
                        value={formData.collegeName}
                        onChange={(e) => handleInputChange("collegeName", e.target.value)}
                        placeholder="IIT Delhi"
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="degree">Degree *</Label>
                      <Select value={formData.degree} onValueChange={(value) => handleInputChange("degree", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select degree" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="btech">B.Tech</SelectItem>
                          <SelectItem value="be">B.E.</SelectItem>
                          <SelectItem value="bsc">B.Sc</SelectItem>
                          <SelectItem value="bca">BCA</SelectItem>
                          <SelectItem value="mtech">M.Tech</SelectItem>
                          <SelectItem value="me">M.E.</SelectItem>
                          <SelectItem value="msc">M.Sc</SelectItem>
                          <SelectItem value="mca">MCA</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch/Specialization *</Label>
                      <Input
                        id="branch"
                        value={formData.branch}
                        onChange={(e) => handleInputChange("branch", e.target.value)}
                        placeholder="Computer Science"
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearOfStudy">Current Year *</Label>
                      <Select
                        value={formData.yearOfStudy}
                        onValueChange={(value) => handleInputChange("yearOfStudy", value)}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1st Year</SelectItem>
                          <SelectItem value="2">2nd Year</SelectItem>
                          <SelectItem value="3">3rd Year</SelectItem>
                          <SelectItem value="4">4th Year</SelectItem>
                          <SelectItem value="5">5th Year</SelectItem>
                          <SelectItem value="graduated">Graduated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cgpa">CGPA/Percentage *</Label>
                      <Input
                        id="cgpa"
                        value={formData.cgpa}
                        onChange={(e) => handleInputChange("cgpa", e.target.value)}
                        placeholder="8.5 or 85%"
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="graduationYear">Graduation Year *</Label>
                      <Input
                        id="graduationYear"
                        type="number"
                        value={formData.graduationYear}
                        onChange={(e) => handleInputChange("graduationYear", e.target.value)}
                        placeholder="2025"
                        min="2020"
                        max="2030"
                        className="h-12"
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Location */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-2">Location</h2>
                    <p className="text-muted-foreground">Where are you based?</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="New Delhi"
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        placeholder="Delhi"
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        className="h-12"
                        disabled
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Professional */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-2">Professional Information</h2>
                    <p className="text-muted-foreground">Your skills and experience</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio *</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        placeholder="Tell us about yourself, your interests, and career goals..."
                        rows={4}
                        className="resize-none"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills *</Label>
                      <Input
                        id="skills"
                        value={formData.skills}
                        onChange={(e) => handleInputChange("skills", e.target.value)}
                        placeholder="React, Python, Machine Learning, UI/UX Design (comma separated)"
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub Profile</Label>
                        <Input
                          id="github"
                          value={formData.github}
                          onChange={(e) => handleInputChange("github", e.target.value)}
                          placeholder="https://github.com/username"
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn Profile</Label>
                        <Input
                          id="linkedin"
                          value={formData.linkedin}
                          onChange={(e) => handleInputChange("linkedin", e.target.value)}
                          placeholder="https://linkedin.com/in/username"
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="portfolio">Portfolio Website</Label>
                        <Input
                          id="portfolio"
                          value={formData.portfolio}
                          onChange={(e) => handleInputChange("portfolio", e.target.value)}
                          placeholder="https://yourportfolio.com"
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: OTP Verification */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-2">Verify Your Account</h2>
                    <p className="text-muted-foreground">We'll send a verification code to secure your account</p>
                  </div>

                  {!otpSent ? (
                    <div className="max-w-md mx-auto space-y-6">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <Mail className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">We'll send a 6-digit code to:</p>
                          <p className="font-medium text-foreground">{formData.email}</p>
                        </div>
                      </div>
                      <Button onClick={sendOtp} disabled={isLoading} className="w-full h-12" size="lg">
                        {isLoading ? "Sending..." : "Send Verification Code"}
                      </Button>
                    </div>
                  ) : !isVerified ? (
                    <div className="max-w-md mx-auto space-y-6">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                          <Phone className="w-8 h-8 text-success" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Enter the 6-digit code sent to:</p>
                          <p className="font-medium text-foreground">{formData.email}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-center">
                        {otpCode.map((digit, index) => (
                          <Input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            className="w-12 h-12 text-center text-lg font-semibold"
                            maxLength={1}
                          />
                        ))}
                      </div>

                      <Button
                        onClick={verifyOtp}
                        disabled={isLoading || otpCode.some((digit) => !digit)}
                        className="w-full h-12"
                        size="lg"
                      >
                        {isLoading ? "Verifying..." : "Verify Code"}
                      </Button>

                      <div className="text-center">
                        <button onClick={() => setOtpSent(false)} className="text-sm text-primary hover:underline">
                          Didn't receive code? Send again
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-md mx-auto text-center space-y-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto"
                      >
                        <Check className="w-10 h-10 text-success" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Account Verified!</h3>
                        <p className="text-muted-foreground">Your profile has been created successfully.</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex justify-between mt-12">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="h-12 px-8 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={nextStep} disabled={!isStepValid(currentStep)} className="h-12 px-8">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}