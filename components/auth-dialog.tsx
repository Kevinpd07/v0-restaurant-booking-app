"use client"

import { useState } from "react"
import { Mail, Lock, User, Phone, LogIn, UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserStore } from "@/lib/user-store"
import { toast } from "sonner"

export function AuthDialog() {
  const { authDialogOpen, closeAuthDialog, login, register } = useUserStore()
  const [tab, setTab] = useState<string>("login")

  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [loginError, setLoginError] = useState("")
  const [registerError, setRegisterError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    if (!loginForm.email || !loginForm.password) {
      setLoginError("Please fill in all fields")
      return
    }
    const result = login(loginForm.email, loginForm.password)
    if (result.success) {
      toast.success("Welcome back!")
      setLoginForm({ email: "", password: "" })
    } else {
      setLoginError(result.error || "Login failed")
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterError("")
    if (
      !registerForm.name ||
      !registerForm.email ||
      !registerForm.phone ||
      !registerForm.password
    ) {
      setRegisterError("Please fill in all fields")
      return
    }
    if (registerForm.password.length < 6) {
      setRegisterError("Password must be at least 6 characters")
      return
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError("Passwords do not match")
      return
    }
    const result = register(
      registerForm.name,
      registerForm.email,
      registerForm.phone,
      registerForm.password
    )
    if (result.success) {
      toast.success("Account created successfully! Welcome!")
      setRegisterForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      })
    } else {
      setRegisterError(result.error || "Registration failed")
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeAuthDialog()
      setLoginError("")
      setRegisterError("")
    }
  }

  return (
    <Dialog open={authDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            Sign In to Order
          </DialogTitle>
          <DialogDescription>
            Log in or create an account to add items to your cart and place
            orders
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="gap-1.5">
              <LogIn className="h-4 w-4" />
              Sign In
            </TabsTrigger>
            <TabsTrigger value="register" className="gap-1.5">
              <UserPlus className="h-4 w-4" />
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {loginError}
                </div>
              )}
              <div className="space-y-2">
                <Label
                  htmlFor="login-email"
                  className="flex items-center gap-1.5 text-card-foreground"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="login-password"
                  className="flex items-center gap-1.5 text-card-foreground"
                >
                  <Lock className="h-4 w-4 text-primary" />
                  Password
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Your password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Sign In
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                {"Don't have an account? "}
                <button
                  type="button"
                  onClick={() => setTab("register")}
                  className="font-medium text-primary hover:underline"
                >
                  Create one
                </button>
              </p>
            </form>
          </TabsContent>

          <TabsContent value="register" className="mt-4">
            <form onSubmit={handleRegister} className="space-y-4">
              {registerError && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {registerError}
                </div>
              )}
              <div className="space-y-2">
                <Label
                  htmlFor="reg-name"
                  className="flex items-center gap-1.5 text-card-foreground"
                >
                  <User className="h-4 w-4 text-primary" />
                  Full Name
                </Label>
                <Input
                  id="reg-name"
                  placeholder="John Doe"
                  value={registerForm.name}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="reg-email"
                  className="flex items-center gap-1.5 text-card-foreground"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  Email
                </Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerForm.email}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="reg-phone"
                  className="flex items-center gap-1.5 text-card-foreground"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  Phone
                </Label>
                <Input
                  id="reg-phone"
                  type="tel"
                  placeholder="+34 600 000 000"
                  value={registerForm.phone}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="reg-password"
                  className="flex items-center gap-1.5 text-card-foreground"
                >
                  <Lock className="h-4 w-4 text-primary" />
                  Password
                </Label>
                <Input
                  id="reg-password"
                  type="password"
                  placeholder="Min. 6 characters"
                  value={registerForm.password}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="reg-confirm"
                  className="flex items-center gap-1.5 text-card-foreground"
                >
                  <Lock className="h-4 w-4 text-primary" />
                  Confirm Password
                </Label>
                <Input
                  id="reg-confirm"
                  type="password"
                  placeholder="Repeat your password"
                  value={registerForm.confirmPassword}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Create Account
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setTab("login")}
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </button>
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
