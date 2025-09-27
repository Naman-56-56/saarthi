"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

export default function EditProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    profilePicture: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string | File | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Profile updated!");
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-blue-100/30 p-4">
      <Card className="w-full max-w-2xl rounded-3xl shadow-2xl border-0 bg-white/70 dark:bg-zinc-900/80 backdrop-blur-2xl">
        <CardContent className="p-10">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src={form.profilePicture ? URL.createObjectURL(form.profilePicture) : ""} />
                  <AvatarFallback className="text-xl bg-primary/10 text-primary">
                    {form.firstName && form.lastName ? `${form.firstName[0]}${form.lastName[0]}` : "U"}
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
                  onChange={(e) => handleChange("profilePicture", e.target.files?.[0] || null)}
                  className="hidden"
                />
              </div>
              <h2 className="text-2xl font-bold text-primary">Edit Profile</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={form.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="John"
                  className="h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={form.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Doe"
                  className="h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="john@example.com"
                  className="h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="h-12"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={form.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="Tell us about yourself, your interests, and career goals..."
                rows={4}
                className="resize-none"
                required
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="lg" className="rounded-xl px-8 py-3 font-bold bg-gradient-to-r from-primary to-blue-500 text-white shadow hover:from-blue-600 hover:to-primary/80 transition-all" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </motion.form>
        </CardContent>
      </Card>
    </div>
  );
}
