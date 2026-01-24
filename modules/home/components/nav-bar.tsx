"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

type NavLink = {
  label: string;
  href: string;
};

const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
];

const NavLink = ({ label, href }: NavLink) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
};

const AuthButtons = () => (
  <>
    <SignedOut>
      <SignInButton mode="modal">
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200"
        >
          Sign in
        </Button>
      </SignInButton>
      <SignUpButton mode="modal">
        <Button
          size="sm"
          className="bg-amber-500 hover:bg-amber-600 text-white border-0 transition-all duration-200 shadow-lg shadow-amber-500/25"
        >
          Sign up
        </Button>
      </SignUpButton>
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </>
);

const Logo = () => (
  <Link
    href="/"
    className="text-amber-500 text-2xl font-black hover:scale-110 transition-transform duration-300"
    aria-label="Home"
  >
    **
  </Link>
);

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-md">
      <div className="flex flex-col space-y-4 py-2">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}
        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
          <ModeToggle />
          <AuthButtons />
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
      <div className="relative flex items-center justify-between px-6 py-3 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-md">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          <AuthButtons />
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      </div>
    </nav>
  );
};

export default Navbar;
