"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Folder, Mic } from "lucide-react"
import { LiquidMetal, PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { apiPost } from "@/lib/api";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function ChatInterface() {
  const [isFocused, setIsFocused] = useState(false)
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const userMsg = {
      id: uuidv4(),
      content: message,
      role: "user" as const,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setMessage("");
    try {
  const res = await apiPost<{ answer: string }>("/api/gemini-answer", { message });
      setMessages(prev => [
        ...prev,
        {
          id: uuidv4(),
          content: res.answer,
          role: "assistant" as const,
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: uuidv4(),
          content: "Sorry, I couldn't get a response from Gemini.",
          role: "assistant" as const,
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
      <div className="w-full max-w-4xl flex justify-start mb-4">
        <Link href="/dashboard">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded shadow text-xs h-7 min-w-[90px] transition-all">
            ← Back to Dashboard
          </button>
        </Link>
      </div>
      {/* Daksh.ai Branding and Description */}
      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-orange-600">Daksh.ai</h1>
        <p className="mb-4 text-gray-300">
          Welcome to <span className="font-semibold text-orange-400">Daksh.ai</span>, your AI-powered career assistant. Ask anything about your career, jobs, or skills!
        </p>
      </div>
      <div className="w-full max-w-4xl relative">
        <div className="flex flex-row items-center mb-2">
          {/* Shader Circle */}
          <motion.div
            id="circle-ball"
            className="relative flex items-center justify-center z-10"
            animate={{
              y: isFocused ? 50 : 0,
              opacity: isFocused ? 0 : 100,
              filter: isFocused ? "blur(4px)" : "blur(0px)",
              rotate: isFocused ? 180 : 0,
            }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            <div className="z-10 absolute bg-white/5 h-11 w-11 rounded-full backdrop-blur-[3px]">
              <div className="h-[2px] w-[2px] bg-white rounded-full absolute top-4 left-4  blur-[1px]" />
              <div className="h-[2px] w-[2px] bg-white rounded-full absolute top-3 left-7  blur-[0.8px]" />
              <div className="h-[2px] w-[2px] bg-white rounded-full absolute top-8 left-2  blur-[1px]" />
              <div className="h-[2px] w-[2px] bg-white rounded-full absolute top-5 left-9 blur-[0.8px]" />
              <div className="h-[2px] w-[2px] bg-white rounded-full absolute top-7 left-7  blur-[1px]" />
            </div>
            <LiquidMetal
              style={{ height: 80, width: 80, filter: "blur(14px)", position: "absolute" }}
              colorBack="hsl(0, 0%, 0%, 0)"
              colorTint="hsl(29, 77%, 49%)"
              repetition={4}
              softness={0.5}
              shiftRed={0.3}
              shiftBlue={0.3}
              distortion={0.1}
              contour={1}
              shape="circle"
              offsetX={0}
              offsetY={0}
              scale={0.58}
              rotation={50}
              speed={5}
            />
            <LiquidMetal
              style={{ height: 80, width: 80 }}
              colorBack="hsl(0, 0%, 0%, 0)"
              colorTint="hsl(29, 77%, 49%)"
              repetition={4}
              softness={0.5}
              shiftRed={0.3}
              shiftBlue={0.3}
              distortion={0.1}
              contour={1}
              shape="circle"
              offsetX={0}
              offsetY={0}
              scale={0.58}
              rotation={50}
              speed={5}
            />
          </motion.div>
          <motion.p
            className="text-white/40 text-[10px] font-light z-10"
            animate={{
              y: isFocused ? 50 : 0,
              opacity: isFocused ? 0 : 100,
              filter: isFocused ? "blur(4px)" : "blur(0px)",
            }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            Hey there! I'm here to help with anything you need
          </motion.p>
        </div>
        {/* Chat Messages Section - moved here and fixed */}
  <div className="mb-6 max-h-[32rem] overflow-y-auto flex flex-col gap-2 px-2 scrollbar-hide hide-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div className={
                (msg.role === "user"
                  ? "bg-orange-500 text-white"
                  : "bg-zinc-800 text-orange-200") +
                " px-4 py-2 rounded-lg max-w-lg break-words shadow text-xs prose prose-invert prose-p:my-1 prose-li:my-0 prose-ul:pl-4 prose-ol:pl-4"
              }>
                {msg.role === "assistant" ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          <motion.div
            className="absolute w-full h-full z-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isFocused ? 1 : 0 }}
            transition={{
              duration: 0.8, 
            }}
          >
            <PulsingBorder
              style={{ height: "146.5%", minWidth: "143%" }}
              colorBack="hsl(0, 0%, 0%)"
              roundness={0.18}
              thickness={0}
              softness={0}
              intensity={0.3}
              bloom={2}
              spots={2}
              spotSize={0.25}
              pulse={0}
              smoke={0.35}
              smokeSize={0.4}
              scale={0.7}
              rotation={0}
              offsetX={0}
              offsetY={0}
              speed={1}
              colors={[
                "hsl(29, 70%, 37%)",
                "hsl(32, 100%, 83%)",
                "hsl(4, 32%, 30%)",
                "hsl(25, 60%, 50%)",
                "hsl(0, 100%, 10%)",
              ]}
            />
          </motion.div>

          <motion.div
            className="relative bg-[#040404] rounded-2xl p-4 z-10"
            animate={{
              borderColor: isFocused ? "#BA9465" : "#3D3D3D",
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            style={{
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            {/* Message Input */}
            <form className="relative mb-6" onSubmit={handleSend}>
              <Textarea
                placeholder="Type your message..."
                className="min-h-[40px] h-10 resize-none bg-transparent border-none text-white text-base placeholder:text-zinc-500 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none [&:focus]:ring-0 [&:focus]:outline-none [&:focus-visible]:ring-0 [&:focus-visible]:outline-none"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <Button
                type="submit"
                className="absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                disabled={!message.trim()}
              >
                Send
              </Button>
            </form>

            <div className="flex items-center justify-between">
              {/* Left side icons */}
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 hover:text-white p-0"
                >
                  <Brain className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white p-0"
                >
                  <Link className="h-4 w-4" href={""} />
                </Button>
                {/* Center model selector */}
                <div className="flex items-center">
                  <Select defaultValue="gpt-4">
                    <SelectTrigger className="bg-zinc-900 border-[#3D3D3D] text-white hover:bg-zinc-700 text-xs rounded-full px-2 h-8 min-w-[150px]">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">⚡</span>
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 z-30 border-[#3D3D3D] rounded-xl z-30">
                      <SelectItem value="gemini-2.5-pro" className="text-white hover:bg-zinc-700 rounded-lg">
                        Gemini 2.5 Pro
                      </SelectItem>
                      <SelectItem value="gpt-4" className="text-white hover:bg-zinc-700 rounded-lg">
                        GPT-4
                      </SelectItem>
                      <SelectItem value="claude-3" className="text-white hover:bg-zinc-700 rounded-lg">
                        Claude 3
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right side icons */}
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white p-0"
                >
                  <Folder className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 rounded-full bg-orange-200 hover:bg-orange-300 text-orange-800 p-0"
                >
                  <Mic className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
