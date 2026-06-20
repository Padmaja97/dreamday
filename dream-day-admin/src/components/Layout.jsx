import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  DollarSign, 
  Image as ImageIcon, 
  User, 
  MessageSquare, 
  Mail,
  LogOut,
  Menu,
  X,
  Crown,
  Video,
  Image,
  Users
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Pricing', href: '/prices', icon: DollarSign },
  { name: 'Gallery', href: '/gallery', icon: ImageIcon },
  { name: 'Videos', href: '/videos', icon: Video },
  { name: 'Hero', href: '/hero', icon: Image },
  { name: 'About', href: '/about', icon: Users },
  { name: 'Manager', href: '/manager', icon: User },
  { name: 'Inquiries', href: '/inquiries', icon: Mail },
];

const pageTitles = {
  '/': 'Dashboard',
  '/prices': 'Pricing',
  '/gallery': 'Gallery',
  '/videos': 'Video Highlights',
  '/hero': 'Hero Section',
  '/about': 'About Section',
  '/manager': 'Manager',
  '/testimonials': 'Testimonials',
  '/inquiries': 'Inquiries',
};

export default function Layout() {
  const { logout, currentUser } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  }

  return (
    <div className="min-h-screen bg-bg-base flex">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-bg-base/70 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ═══════════ SIDEBAR ═══════════ */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[260px] 
        bg-bg-surface border-r border-border-subtle
        flex flex-col
        transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-border-subtle shrink-0">
          <div className="w-8 h-8 rounded-[var(--radius-md)] bg-accent-subtle border border-accent-border flex items-center justify-center">
            <Crown className="w-4 h-4 text-accent" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-text-primary tracking-tight">Dream Day</span>
            <span className="text-[10px] font-semibold text-accent uppercase tracking-widest px-1.5 py-0.5 rounded border border-accent-border bg-accent-subtle">
              Admin
            </span>
          </div>
          {/* Mobile close */}
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="lg:hidden ml-auto w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-text-muted hover:text-text-primary hover:bg-bg-surface-hover transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group relative flex items-center gap-3 px-3 py-2.5 
                  rounded-[var(--radius-md)] text-sm font-medium
                  transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${isActive 
                    ? 'bg-accent-subtle text-accent' 
                    : 'text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent rounded-r-full" />
                )}
                <Icon className="w-[18px] h-[18px] shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Section */}
        <div className="px-3 py-4 border-t border-border-subtle shrink-0">
          {currentUser && (
            <div className="px-3 py-2 mb-2">
              <p className="text-xs text-text-muted truncate">{currentUser.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-error-subtle hover:text-error rounded-[var(--radius-md)] transition-all duration-200 cursor-pointer"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ═══════════ MAIN AREA ═══════════ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 shrink-0 flex items-center justify-between px-4 lg:px-8 border-b border-border-subtle bg-bg-surface/60 backdrop-blur-md sticky top-0 z-30">
          {/* Left: hamburger + page title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-text-primary">
              {pageTitles[location.pathname] || 'Dashboard'}
            </h2>
          </div>

          {/* Right: user avatar */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent-subtle border border-accent-border flex items-center justify-center text-xs font-semibold text-accent uppercase">
              {currentUser?.email?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
