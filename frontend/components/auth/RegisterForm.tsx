"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { registerSchema, RegisterFormData } from "@/lib/auth";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const t = useTranslations("auth");
  const { register: registerUser, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
    } catch (error) {
      // Error is handled by the register function
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          {t("registerTitle")}
        </CardTitle>
        <CardDescription>{t("registerSubtitle")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("username")}
            type="text"
            label={t("username")}
            placeholder={t("usernamePlaceholder")}
            icon={<User className="h-4 w-4" />}
            error={errors.username?.message}
          />

          <Input
            {...register("email")}
            type="email"
            label={t("email")}
            placeholder={t("emailPlaceholder")}
            icon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
          />

          <Input
            {...register("phone")}
            type="tel"
            label={t("phone")}
            placeholder={t("phonePlaceholder")}
            icon={<Phone className="h-4 w-4" />}
            error={errors.phone?.message}
          />

          <div className="relative">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              label={t("password")}
              placeholder={t("passwordPlaceholder")}
              icon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
          >
            {t("registerButton")}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-sm text-primary hover:underline"
            >
              {t("switchToLogin")}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
