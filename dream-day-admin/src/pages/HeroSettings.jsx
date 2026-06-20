import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Image as ImageIcon, Video } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import FormField, { Input } from '../components/FormField';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../hooks/useToast';

export default function HeroSettings() {
  const [heroData, setHeroData] = useState({
    videoUrl: '',
    posterUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fetchHeroData() {
      try {
        const docRef = doc(db, 'content', 'hero');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHeroData(docSnap.data());
        } else {
          setHeroData({
            videoUrl: "/images/video-2.mp4",
            posterUrl: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/blue-stage-new.jpg"
          });
        }
      } catch (err) {
        console.error("Error fetching hero data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHeroData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeroData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'content', 'hero'), heroData);
      toast.success('Hero section updated successfully!');
    } catch (err) {
      toast.error('Error saving hero data: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading hero settings..." />;

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Hero Section" 
        subtitle="Manage the background video and image shown at the very top of your Home page"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Form */}
        <form onSubmit={handleSave} className="bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-card)] space-y-6 animate-slide-up">
          
          <div className="space-y-4">
            <FormField label="Background Video URL" required>
              <div className="relative">
                <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input
                  type="text"
                  name="videoUrl"
                  value={heroData.videoUrl}
                  onChange={handleChange}
                  placeholder="https://.../video.mp4"
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-text-muted mt-1.5">Direct link to an .mp4 file. Keep it lightweight for fast loading.</p>
            </FormField>

            <FormField label="Poster Image URL (Fallback)" required>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input
                  type="text"
                  name="posterUrl"
                  value={heroData.posterUrl}
                  onChange={handleChange}
                  placeholder="https://.../image.jpg"
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-text-muted mt-1.5">This image shows while the video is loading or on mobile devices.</p>
            </FormField>
          </div>

          <div className="pt-4 border-t border-border-subtle">
            <Button type="submit" icon={Save} disabled={saving} className="w-full">
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>

        {/* Live Preview */}
        <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-card)] flex flex-col h-[500px] animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="p-4 border-b border-border-subtle bg-bg-surface-hover/50 shrink-0">
            <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              Live Preview
            </h3>
          </div>
          <div className="flex-1 relative bg-black">
            {heroData.posterUrl && (
              <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url('${heroData.posterUrl}')` }}></div>
            )}
            {heroData.videoUrl && (
              <video 
                src={heroData.videoUrl} 
                poster={heroData.posterUrl} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover z-10"
              />
            )}
            {/* Fake Hero Overlay for realism */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-center justify-center p-6 text-center">
               <h2 className="text-white text-3xl font-bold tracking-tight mb-2">Make Your Dream Day Come True</h2>
               <p className="text-white/80 text-sm max-w-sm">Turning Your Special Moments into Unforgettable Celebrations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
