import { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Save, Image as ImageIcon, Video, Edit2, X, Upload } from 'lucide-react';
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
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ image: 0, video: 0 });
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
            videoUrl: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-2.mp4",
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

  const openEditModal = () => {
    setEditForm({ ...heroData });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'video' && file.size > 20 * 1024 * 1024) {
      toast.error('Video must be under 20MB. Please compress it first.');
      return;
    }

    if (type === 'image') setUploadingImage(true);
    if (type === 'video') setUploadingVideo(true);

    try {
      const storageRef = ref(storage, `hero/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(prev => ({ ...prev, [type]: progress }));
      });

      await uploadTask;
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      
      if (type === 'image') setEditForm(prev => ({ ...prev, posterUrl: url }));
      if (type === 'video') setEditForm(prev => ({ ...prev, videoUrl: url }));
      
      toast.success(`${type === 'video' ? 'Video' : 'Image'} uploaded successfully!`);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(`Failed to upload ${type}.`);
    } finally {
      if (type === 'image') setUploadingImage(false);
      if (type === 'video') setUploadingVideo(false);
      setUploadProgress(prev => ({ ...prev, [type]: 0 }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'content', 'hero'), editForm);
      setHeroData(editForm);
      toast.success('Hero section updated successfully!');
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Error saving hero data: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading hero settings..." />;

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader 
          title="Hero Section" 
          subtitle="View and manage your website's main video banner"
        />
        <Button onClick={openEditModal} icon={Edit2}>
          Edit Hero Section
        </Button>
      </div>

      {/* Main View: Large Live Preview */}
      <div className="flex-1 min-h-[500px] bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-card)] flex flex-col animate-slide-up relative">
        <div className="absolute top-4 left-4 z-30 bg-bg-surface/80 backdrop-blur text-sm font-semibold text-text-primary px-3 py-1.5 rounded-full border border-border-subtle flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-success"></span>
          Live Preview
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
             <h2 className="text-white text-4xl sm:text-5xl font-bold tracking-tight mb-4 drop-shadow-lg">Make Your Dream Day Come True</h2>
             <p className="text-white/90 text-lg max-w-lg drop-shadow-md">Turning Your Special Moments into Unforgettable Celebrations</p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] shadow-2xl w-full max-w-xl flex flex-col animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-border-subtle">
              <h2 className="text-xl font-bold text-text-primary">Edit Hero Section</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6">
              <FormField label="Background Video (Max 20MB)" required>
                <div className="relative">
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    onChange={(e) => handleFileUpload(e, 'video')}
                    className="w-full text-sm text-text-secondary file:mr-3 file:py-2 file:px-4 file:rounded-[var(--radius-md)] file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-bg-base hover:file:bg-accent-hover file:cursor-pointer file:transition-colors"
                    disabled={uploadingVideo}
                  />
                </div>
                {uploadingVideo && (
                  <div className="w-full bg-bg-input rounded-full h-1.5 mt-2 overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: `${uploadProgress.video}%` }} />
                  </div>
                )}
                {editForm.videoUrl && !uploadingVideo && (
                  <div className="mt-2 text-xs text-success flex items-center gap-1">
                    <Video className="w-3 h-3" /> Current video attached.
                  </div>
                )}
                <p className="text-xs text-text-muted mt-1.5">Upload a lightweight .mp4 file. Must be under 20MB.</p>
              </FormField>

              <FormField label="Poster Image (Fallback)" required>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'image')}
                    className="w-full text-sm text-text-secondary file:mr-3 file:py-2 file:px-4 file:rounded-[var(--radius-md)] file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-bg-base hover:file:bg-accent-hover file:cursor-pointer file:transition-colors"
                    disabled={uploadingImage}
                  />
                </div>
                {uploadingImage && (
                  <div className="w-full bg-bg-input rounded-full h-1.5 mt-2 overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: `${uploadProgress.image}%` }} />
                  </div>
                )}
                {editForm.posterUrl && !uploadingImage && (
                  <div className="mt-2 relative w-20 h-12 rounded-md overflow-hidden border border-border-subtle">
                     <img src={editForm.posterUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <p className="text-xs text-text-muted mt-1.5">This image shows while the video is loading or on mobile devices.</p>
              </FormField>
            </form>
            
            <div className="p-6 border-t border-border-subtle flex justify-end gap-3 bg-bg-surface-hover/30 rounded-b-[var(--radius-xl)]">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Apply Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
