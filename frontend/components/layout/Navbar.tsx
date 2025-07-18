'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, 
  Gamepad2, 
  History, 
  User, 
  LogOut, 
  Menu, 
  X,
  Shield,
  Dice1,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';
import { LanguageSwitch } from './LanguageSwitch';

export function Navbar() {
  const t = useTranslations('navigation');
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('home'), href: '/dashboard', icon: Home },
    { name: t('game'), href: '/game', icon: Gamepad2 },
    { name: t('history'), href: '/history', icon: History },
    { name: t('profile'), href: '/profile', icon: User },
  ];

  const adminNavigation = [
    { name: t('admin'), href: '/admin', icon: Shield },
  ];

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="relative">
                <Dice1 className="h-8 w-8 text-primary" />
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 text-warning" />
                </motion.div>
              </div>
              <span className="text-xl font-bold text-primary">TrueNumber</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    icon={<item.icon className="h-4 w-4" />}
                  >
                    {item.name}
                  </Button>
                </Link>
              );
            })}

            {user?.role === 'ADMIN' && adminNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    icon={<item.icon className="h-4 w-4" />}
                  >
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* User info */}
            <div className="hidden md:flex items-center space-x-2">
              <Badge variant="outline" className="text-sm">
                {user?.username}
              </Badge>
              {user?.role === 'ADMIN' && (
                <Badge variant="destructive" className="text-xs">
                  Admin
                </Badge>
              )}
            </div>

            <LanguageSwitch />
            <ThemeToggle />

            {/* Logout button - Desktop */}
            <div className="hidden md:block">
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                icon={<LogOut className="h-4 w-4" />}
              >
                Logout
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                icon={isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              >
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* User info mobile */}
              <div className="flex items-center space-x-2 p-2">
                <Badge variant="outline">
                  {user?.username}
                </Badge>
                {user?.role === 'ADMIN' && (
                  <Badge variant="destructive" className="text-xs">
                    Admin
                  </Badge>
                )}
              </div>

              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                      icon={<item.icon className="h-4 w-4" />}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Button>
                  </Link>
                );
              })}

              {user?.role === 'ADMIN' && adminNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                      icon={<item.icon className="h-4 w-4" />}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Button>
                  </Link>
                );
              })}

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-destructive"
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                icon={<LogOut className="h-4 w-4" />}
              >
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}