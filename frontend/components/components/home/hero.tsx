"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Bot, Target, Users, TrendingUp, Award, Zap } from "lucide-react"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <section className="relative overflow-hidden min-h-[85vh] md:min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24 relative z-10 flex-1 flex flex-col">
          <div className="mx-auto max-w-4xl text-center flex-1 flex flex-col justify-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 md:mb-8"
            >
              <Badge variant="secondary" className="inline-flex items-center gap-2 px-3 py-1.5 text-xs md:text-sm">
                <Bot className="h-3 w-3 md:h-4 md:w-4" />
                Smart India Hackathon 2025 Project
              </Badge>
            </motion.div>

            {/* Main Heading - More compact for mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 md:mb-8"
            >
              <h1
                id="main-title"
                className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground text-balance leading-tight"
              >
                <strong>Unlock Your Future</strong> with <br />
                <span className="text-primary">AI-Powered Internships</span>
              </h1>
            </motion.div>

            {/* Description - Shorter and more focused */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-8 md:mb-12 max-w-xl md:max-w-2xl text-base md:text-lg text-muted-foreground text-pretty"
            >
              Personalized matching for your skills and goals. Let Sarthi's advanced AI connect you with the perfect PM
              internship opportunities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center gap-6 md:gap-8"
            >
              {/* CTA Buttons - More compact */}
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                <a
                  href="/get-started"
                  className="group cursor-pointer border border-border bg-card gap-2 h-[50px] md:h-[60px] flex items-center p-[8px] md:p-[10px] rounded-full hover:shadow-lg transition-all duration-300"
                >
                  <div className="border border-border bg-primary h-[34px] md:h-[40px] rounded-full flex items-center justify-center text-primary-foreground">
                    <p className="font-medium tracking-tight mr-2 ml-2 md:mr-3 md:ml-3 flex items-center gap-2 justify-center text-sm md:text-base">
                      <Target className="h-3 w-3 md:h-4 md:w-4" />
                      Get Matched Now
                    </p>
                  </div>
                  <div className="text-muted-foreground group-hover:ml-2 md:group-hover:ml-4 ease-in-out transition-all size-[20px] md:size-[24px] flex items-center justify-center rounded-full border-2 border-border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right group-hover:rotate-180 ease-in-out transition-all"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                </a>

                <a
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium text-muted-foreground border border-border rounded-full hover:text-foreground hover:border-foreground transition-colors"
                >
                  <Users className="h-3 w-3 md:h-4 md:w-4" />
                  Learn How It Works
                </a>
              </div>

              {/* Stats Section - More compact */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 mt-4 md:mt-8">
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">95%</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Match Success</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">2.5k+</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Students Placed</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">500+</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Partner Companies</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* AI Matching Preview - Compact version */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 md:mt-auto pb-4 md:pb-8"
          >
            <div className="max-w-md mx-auto bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium">AI Matching Engine</div>
                  <div className="text-xs text-muted-foreground">Analyzing your profile...</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Skills Match
                  </span>
                  <span className="text-primary font-medium">92%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Culture Fit
                  </span>
                  <span className="text-primary font-medium">88%</span>
                </div>
                <div className="mt-3 pt-2 border-t border-border/50">
                  <div className="text-xs text-center text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Bot className="w-3 h-3" />
                      Quick Apply • AI Insights
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}