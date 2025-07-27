"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Dices } from "lucide-react";

const loginSchema = z.object({
  login: z.string().min(1, "Email or phone is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(1, "Phone number is required"),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const router = useRouter();
  const t = useTranslations("auth");

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data: LoginForm) => {
    try {
      await login(data.login, data.password);
      toast.success(t("welcomeBack"));
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message || "Login failed");
      console.error(error);
    }
  };

  const onRegister = async (data: RegisterForm) => {
    try {
      await register(data);
      toast.success(t("accountCreated"));
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message || "Registration failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-md game-card relative z-10">
        <CardHeader className="text-center">
          <div className="text-3xl"> <Dices className="w-10 h-10 text-primary" />TrueNumber</div>
          <CardTitle className="text-3xl font-bold neon-text bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {isLogin ? t("signIn") : t("signUp")}
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            {isLogin ? t("signInSubtitle") : t("signUpSubtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLogin ? (
            <form
              onSubmit={loginForm.handleSubmit(onLogin)}
              className="space-y-4"
            >
              <Input
                {...loginForm.register("login")}
                placeholder={t("loginPlaceholder")}
                error={loginForm.formState.errors.login?.message}
              />
              <Input
                {...loginForm.register("password")}
                type="password"
                placeholder={t("passwordPlaceholder")}
                error={loginForm.formState.errors.password?.message}
              />
              <Button
                type="submit"
                className="w-full h-12 text-lg btn-hover"
                isLoading={loginForm.formState.isSubmitting}
              >
                {t("signInButton")}
              </Button>
            </form>
          ) : (
            <form
              onSubmit={registerForm.handleSubmit(onRegister)}
              className="space-y-4"
            >
              <Input
                {...registerForm.register("username")}
                placeholder={t("username")}
                error={registerForm.formState.errors.username?.message}
              />
              <Input
                {...registerForm.register("email")}
                type="email"
                placeholder={t("email")}
                error={registerForm.formState.errors.email?.message}
              />
              <Input
                {...registerForm.register("phone")}
                placeholder={t("phone")}
                error={registerForm.formState.errors.phone?.message}
              />
              <Input
                {...registerForm.register("password")}
                type="password"
                placeholder={t("passwordPlaceholder")}
                error={registerForm.formState.errors.password?.message}
              />
              <Button
                type="submit"
                className="w-full h-12 text-lg rainbow-bg btn-hover"
                isLoading={registerForm.formState.isSubmitting}
              >
                <span className="mr-2">🎮</span>
                {t("createAccountButton")}
              </Button>
            </form>
          )}

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => setIsLogin(!isLogin)}
              type="button"
              className="text-accent hover:text-accent-foreground hover:bg-accent/20"
            >
              {isLogin ? t("noAccount") : t("hasAccount")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
