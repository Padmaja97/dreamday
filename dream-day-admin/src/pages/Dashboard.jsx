import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { 
  Mail, 
  Image as ImageIcon, 
  DollarSign,
  ArrowRight,
  Sparkles,
  Video
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [managerName, setManagerName] = useState('Admin');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [inquiriesSnap, gallerySnap, packagesSnap, videosSnap, managerSnap] = await Promise.all([
          getDocs(collection(db, 'inquiries')),
          getDoc(doc(db, 'content', 'gallery')),
          getDoc(doc(db, 'content', 'packages')),
          getDoc(doc(db, 'content', 'videos')),
          getDoc(doc(db, 'content', 'manager')),
        ]);

        const galleryImages = gallerySnap.exists() ? (gallerySnap.data().images?.length || 0) : 0;
        const packageCount = packagesSnap.exists() ? Object.keys(packagesSnap.data()).length : 0;
        const videoCount = videosSnap.exists() ? (videosSnap.data().videos?.length || 0) : 0;

        setStats({
          inquiries: inquiriesSnap.size,
          gallery: galleryImages,
          packages: packageCount,
          videos: videoCount,
        });

        if (managerSnap.exists()) {
          setManagerName(managerSnap.data().name || 'Admin');
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
        setStats({ inquiries: 0, gallery: 0, packages: 0, videos: 0 });
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const quickActions = [
    { name: 'Gallery', desc: 'Upload & manage photos', href: '/gallery', icon: ImageIcon, color: 'text-info bg-info-subtle' },
    { name: 'Videos', desc: 'Upload cinematic highlights', href: '/videos', icon: Video, color: 'text-purple-500 bg-purple-500/10' },
    { name: 'Inquiries', desc: 'View new leads', href: '/inquiries', icon: Mail, color: 'text-accent bg-accent-subtle' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] p-6 lg:p-8 overflow-hidden animate-slide-up">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/[0.04] rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">Welcome back</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-text-primary tracking-tight">
            {managerName}
          </h1>
          <p className="text-sm text-text-secondary mt-1">{today}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        <StatCard
          icon={Mail}
          label="Total Inquiries"
          value={stats.inquiries}
          tintClass="text-accent bg-accent-subtle"
        />
        <StatCard
          icon={ImageIcon}
          label="Gallery Images"
          value={stats.gallery}
          tintClass="text-info bg-info-subtle"
        />
        <StatCard
          icon={Video}
          label="Videos"
          value={stats.videos}
          tintClass="text-purple-500 bg-purple-500/10"
        />
        <StatCard
          icon={DollarSign}
          label="Active Packages"
          value={stats.packages}
          tintClass="text-warning bg-warning-subtle"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-semibold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger-children">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.name}
                to={action.href}
                className="group bg-bg-surface border border-border-subtle rounded-[var(--radius-lg)] p-5 hover:border-border-default hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <div className={`w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center ${action.color} mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary mb-1">{action.name}</h3>
                <p className="text-xs text-text-secondary mb-3">{action.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-accent group-hover:gap-2 transition-all duration-200">
                  Manage <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
