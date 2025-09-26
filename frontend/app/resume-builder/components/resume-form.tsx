"use client"

import type React from "react"

import { useState } from "react"
import { PlusCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResumePreview } from "./resume-preview"

type WorkExperience = {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  achievements: string
}

type Education = {
  id: string
  institution: string
  degree: string
  field: string
  graduationDate: string
  description: string
}

type FormData = {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    linkedin: string
  }
  summary: string
  workExperience: WorkExperience[]
  education: Education[]
  skills: string
}

export function ResumeForm() {
  const [activeTab, setActiveTab] = useState("form")
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
    },
    summary: "",
    workExperience: [
      {
        id: "exp-1",
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        achievements: "",
      },
    ],
    education: [
      {
        id: "edu-1",
        institution: "",
        degree: "",
        field: "",
        graduationDate: "",
        description: "",
      },
    ],
    skills: "",
  })

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: value,
      },
    })
  }

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      summary: e.target.value,
    })
  }

  const handleWorkExperienceChange = (id: string, field: keyof WorkExperience, value: string) => {
    setFormData({
      ...formData,
      workExperience: formData.workExperience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    setFormData({
      ...formData,
      education: formData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      skills: e.target.value,
    })
  }

  const addWorkExperience = () => {
    const newId = `exp-${formData.workExperience.length + 1}`
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        {
          id: newId,
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
          achievements: "",
        },
      ],
    })
  }

  const removeWorkExperience = (id: string) => {
    if (formData.workExperience.length > 1) {
      setFormData({
        ...formData,
        workExperience: formData.workExperience.filter((exp) => exp.id !== id),
      })
    }
  }

  const addEducation = () => {
    const newId = `edu-${formData.education.length + 1}`
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          id: newId,
          institution: "",
          degree: "",
          field: "",
          graduationDate: "",
          description: "",
        },
      ],
    })
  }

  const removeEducation = (id: string) => {
    if (formData.education.length > 1) {
      setFormData({
        ...formData,
        education: formData.education.filter((edu) => edu.id !== id),
      })
    }
  }

  const generateResume = () => {
    setActiveTab("preview")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.personalInfo.name}
                      onChange={handlePersonalInfoChange}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.personalInfo.location}
                      onChange={handlePersonalInfoChange}
                      placeholder="City, State"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="linkedin">LinkedIn (optional)</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      value={formData.personalInfo.linkedin}
                      onChange={handlePersonalInfoChange}
                      placeholder="linkedin.com/in/johndoe"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
                <div className="space-y-2">
                  <Label htmlFor="summary">
                    Write a concise summary of your professional background (3-5 sentences)
                  </Label>
                  <Textarea
                    id="summary"
                    value={formData.summary}
                    onChange={handleSummaryChange}
                    placeholder="Experienced software developer with 5+ years of expertise in web development..."
                    className="min-h-[100px]"
                  />
                  <p className="text-sm text-muted-foreground">
                    Tip: Include relevant keywords from the job description to improve ATS matching.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Work Experience</h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addWorkExperience}
                    className="flex items-center gap-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Experience
                  </Button>
                </div>

                {formData.workExperience.map((experience, index) => (
                  <div key={experience.id} className="mb-6 pb-6 border-b last:border-b-0 last:pb-0 last:mb-0">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Experience {index + 1}</h3>
                      {formData.workExperience.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWorkExperience(experience.id)}
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${experience.id}`}>Company</Label>
                        <Input
                          id={`company-${experience.id}`}
                          value={experience.company}
                          onChange={(e) => handleWorkExperienceChange(experience.id, "company", e.target.value)}
                          placeholder="Company Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`position-${experience.id}`}>Position</Label>
                        <Input
                          id={`position-${experience.id}`}
                          value={experience.position}
                          onChange={(e) => handleWorkExperienceChange(experience.id, "position", e.target.value)}
                          placeholder="Job Title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                        <Input
                          id={`startDate-${experience.id}`}
                          value={experience.startDate}
                          onChange={(e) => handleWorkExperienceChange(experience.id, "startDate", e.target.value)}
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                        <Input
                          id={`endDate-${experience.id}`}
                          value={experience.endDate}
                          onChange={(e) => handleWorkExperienceChange(experience.id, "endDate", e.target.value)}
                          placeholder="MM/YYYY or Present"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`description-${experience.id}`}>Job Description</Label>
                        <Textarea
                          id={`description-${experience.id}`}
                          value={experience.description}
                          onChange={(e) => handleWorkExperienceChange(experience.id, "description", e.target.value)}
                          placeholder="Describe your role and responsibilities..."
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`achievements-${experience.id}`}>Key Achievements (use bullet points)</Label>
                        <Textarea
                          id={`achievements-${experience.id}`}
                          value={experience.achievements}
                          onChange={(e) => handleWorkExperienceChange(experience.id, "achievements", e.target.value)}
                          placeholder="• Increased sales by 20%
• Led a team of 5 developers
• Implemented new system that reduced costs by 15%"
                          className="min-h-[100px]"
                        />
                        <p className="text-sm text-muted-foreground">
                          Tip: Use quantifiable achievements with metrics when possible.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Education</h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addEducation}
                    className="flex items-center gap-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Education
                  </Button>
                </div>

                {formData.education.map((education, index) => (
                  <div key={education.id} className="mb-6 pb-6 border-b last:border-b-0 last:pb-0 last:mb-0">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Education {index + 1}</h3>
                      {formData.education.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(education.id)}
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${education.id}`}>Institution</Label>
                        <Input
                          id={`institution-${education.id}`}
                          value={education.institution}
                          onChange={(e) => handleEducationChange(education.id, "institution", e.target.value)}
                          placeholder="University Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                        <Input
                          id={`degree-${education.id}`}
                          value={education.degree}
                          onChange={(e) => handleEducationChange(education.id, "degree", e.target.value)}
                          placeholder="Bachelor of Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`field-${education.id}`}>Field of Study</Label>
                        <Input
                          id={`field-${education.id}`}
                          value={education.field}
                          onChange={(e) => handleEducationChange(education.id, "field", e.target.value)}
                          placeholder="Computer Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`graduationDate-${education.id}`}>Graduation Date</Label>
                        <Input
                          id={`graduationDate-${education.id}`}
                          value={education.graduationDate}
                          onChange={(e) => handleEducationChange(education.id, "graduationDate", e.target.value)}
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`description-${education.id}`}>Additional Information (optional)</Label>
                        <Textarea
                          id={`description-${education.id}`}
                          value={education.description}
                          onChange={(e) => handleEducationChange(education.id, "description", e.target.value)}
                          placeholder="Relevant coursework, honors, activities..."
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                <div className="space-y-2">
                  <Label htmlFor="skills">List your relevant skills (separate with commas or use bullet points)</Label>
                  <Textarea
                    id="skills"
                    value={formData.skills}
                    onChange={handleSkillsChange}
                    placeholder="JavaScript, React, Node.js, Project Management, Team Leadership"
                    className="min-h-[100px]"
                  />
                  <p className="text-sm text-muted-foreground">
                    Tip: Include both technical and soft skills relevant to the position.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button size="lg" onClick={generateResume} className="px-8">
                Generate ATS-Friendly Resume
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="preview">
          <ResumePreview formData={formData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
