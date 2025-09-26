import { ResumeForm } from "./components/resume-form"

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">ATS-Friendly Resume Builder</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Create a resume optimized for Applicant Tracking Systems. Fill out the form below and click generate to create
          a professionally formatted, ATS-friendly resume.
        </p>
      </header>
      <main>
        <ResumeForm />
      </main>
    </div>
  )
}
