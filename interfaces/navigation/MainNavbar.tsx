'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Wallet, Zap, Briefcase, LayoutDashboard } from 'lucide-react';
import { WalletPopup } from '@/components/popups/WalletPopup';

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-b from-white/5 to-transparent border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Wallet className="h-6 w-6 text-amber-300 group-hover:text-amber-400 transition-colors" />
            <span className="text-xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              WorkChain
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4 items-center">
            <Link
              href="/find-talent"
              className="relative px-4 py-2.5 rounded-lg transition-all duration-300 group"
            >
              <span className="relative z-10 font-medium text-black group-hover:text-[rgb(17,24,39)] flex items-center gap-2">
                <span className="md:hidden bg-gradient-to-br from-amber-400 to-amber-600 p-1.5 rounded-md">
                  <Zap className="h-4 w-4 text-white" />
                </span>
                <span>Find Talent</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </Link>

            <Link
              href="/find-work"
              className="relative px-4 py-2.5 rounded-lg transition-all duration-300 group"
            >
              <span className="relative z-10 font-medium text-black group-hover:text-[rgb(17,24,39)] flex items-center gap-2">
                <span className="md:hidden bg-gradient-to-br from-amber-400 to-amber-600 p-1.5 rounded-md">
                  <Briefcase className="h-4 w-4 text-white" />
                </span>
                <span>Find Work</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </Link>

            <Link
              href="/dashboard"
              className="relative px-4 py-2.5 rounded-lg transition-all duration-300 group"
            >
              <span className="relative z-10 font-medium text-black group-hover:text-[rgb(17,24,39)] flex items-center gap-2">
                <span className="md:hidden bg-gradient-to-br from-amber-400 to-amber-600 p-1.5 rounded-md">
                  <LayoutDashboard className="h-4 w-4 text-white" />
                </span>
                <span>Dashboard</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </Link>
          </div>

          {/* Wallet Connection + Mobile Menu */}
          <div className="flex items-center gap-4">
            <WalletPopup />
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <span className="block">X</span> : <span className="block">Menu</span>}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-white/10">
            <Link
              href="/find-talent"
              className="block py-3 px-4 rounded-lg transition-all hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 text-black hover:text-amber-300 font-medium flex items-center gap-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <Zap className="h-5 w-5 text-amber-400" />
              Find Talent
            </Link>
            <Link
              href="/find-work"
              className="block py-3 px-4 rounded-lg transition-all hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 text-black hover:text-amber-300 font-medium flex items-center gap-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <Briefcase className="h-5 w-5 text-amber-400" />
              Find Work
            </Link>
            <Link
              href="/dashboard"
              className="block py-3 px-4 rounded-lg transition-all hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 text-black hover:text-amber-300 font-medium flex items-center gap-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard className="h-5 w-5 text-amber-400" />
              Dashboard
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default MainNavbar;
