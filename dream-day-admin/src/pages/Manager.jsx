import { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Camera, Save, User } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import FormField, { Input, Textarea } from '../components/FormField';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../hooks/useToast';

export default function Manager() {
  const [data, setData] = useState({ name: 'Mr. Ayush Kale', bio: '', imageUrl: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, 'content', 'manager');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        }
      } catch (err) {
        console.error("Error fetching manager data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `manager/${Date.now()}_${file.name}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      const url = await getDownloadURL(uploadTask.ref);
      setData(prev => ({ ...prev, imageUrl: url }));
      toast.success('Photo uploaded! Click Save to apply.');
    } catch (err) {
      console.error("Upload error:", err);
      toast.error('Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'content', 'manager'), data);
      toast.success('Manager profile updated successfully!');
    } catch (err) {
      toast.error('Error saving profile: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading profile..." />;

  return (
    <div>
      <PageHeader title="Manager Profile" subtitle="Edit the manager profile displayed on your website" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl animate-slide-up">
        {/* Left: Photo Card */}
        <div className="lg:col-span-1">
          <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-6 flex flex-col items-center">
            {/* Avatar */}
            <div className="w-36 h-36 rounded-full bg-bg-input border-[3px] border-accent overflow-hidden relative group shadow-[var(--shadow-gold)]">
              {data.imageUrl || 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/ayush-kale.jpg' ? (
                <img src={data.imageUrl || 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/ayush-kale.jpg'} alt="Manager" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-12 h-12 text-text-muted" />
                </div>
              )}
              <label className="absolute inset-0 bg-bg-base/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-300">
                {uploading ? (
                  <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                ) : (
                  <>
                    <Camera className="w-5 h-5 text-accent mb-1" />
                    <span className="text-xs font-medium text-accent">Change</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            </div>
            
            <h3 className="mt-4 text-base font-semibold text-text-primary text-center">{data.name || 'Manager'}</h3>
            <p className="text-xs text-text-muted mt-0.5">Profile Photo</p>
          </div>
        </div>

        {/* Right: Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-6">
            <h3 className="text-base font-semibold text-text-primary mb-5">Profile Details</h3>
            <form onSubmit={handleSave} className="space-y-5">
              <FormField label="Full Name">
                <Input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Mr. Ayush Kale"
                />
              </FormField>

              <FormField label="Bio / Content">
                <Textarea
                  rows="6"
                  value={data.bio}
                  onChange={(e) => setData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Write a brief bio about the manager..."
                />
                <div className="mt-1.5 text-right">
                  <span className="text-xs text-text-muted">{data.bio?.length || 0} characters</span>
                </div>
              </FormField>

              <div className="pt-2">
                <Button type="submit" icon={Save} disabled={saving || uploading}>
                  {saving ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
