"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, Sparkles, Shield } from "lucide-react"

interface LoginScreenProps {
  onLogin: () => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    // Simulate login process with enhanced loading
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#004A9F] via-[#0072C6] to-[#00B2A9] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-8 w-24 h-24 bg-white/5 rounded-full blur-lg animate-bounce"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-md animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-white/5 rounded-full blur-lg animate-bounce delay-500"></div>

      <div className="w-full max-w-sm relative z-10">
        {/* Enhanced Logo Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="text-white text-4xl font-bold mb-3 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              Ecobank
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
            </div>
          </div>
          <div className="text-white/90 text-base font-medium mb-2">The Pan African Bank</div>
          <div className="text-white/70 text-sm flex items-center justify-center gap-2">
            <Shield className="h-4 w-4" />
            Welcome to Ecobank Mobile!
          </div>
        </div>

        {/* Enhanced Login Card */}
        <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
          <CardContent className="p-8 space-y-6 relative">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Sign In</h2>
              <p className="text-gray-600 text-sm">Enter your credentials to continue</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Username</label>
                <Input
                  type="text"
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full h-12 rounded-xl border-2 border-gray-200 focus:border-[#004A9F] focus:ring-0 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="w-full h-12 rounded-xl border-2 border-gray-200 focus:border-[#004A9F] focus:ring-0 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-gray-300 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-gray-700 rounded-lg"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-[#A4D233] to-[#8BC220] hover:from-[#8BC220] hover:to-[#7AB01F] text-black font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-center space-y-4">
              <Button
                variant="link"
                className="text-[#004A9F] text-sm font-semibold hover:text-[#003875] transition-colors"
              >
                Forgot Password?
              </Button>
              <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="text-[#004A9F] text-xs p-0 font-semibold hover:text-[#003875] transition-colors"
                >
                  Register
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Footer */}
        <div className="text-center mt-8 text-white/70 text-xs space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-3 w-3" />
            <span>Secured by 256-bit SSL encryption</span>
          </div>
          <div>© 2024 Ecobank. All rights reserved.</div>
        </div>
      </div>
    </div>
  )
}
