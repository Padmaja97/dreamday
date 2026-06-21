import { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Save, Plus, Trash2, Edit2, X, Star, User, Upload, Image as ImageIcon } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import FormField, { Input, Textarea } from '../components/FormField';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { useToast } from '../hooks/useToast';

const defaultTestimonials = [
  { id: 't1', name: 'Amit Deshpande', location: 'Event — Nagpur', text: 'Excellent coordination! Mr. Ayush Kale managed the entire sangeet and catering display flawlessly. The guest comments on the food were incredible!', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-1.jpg?v=9', pfp: '/images/boy_avatar.png' },
  { id: 't2', name: 'Neha Kulkarni', location: 'Event — Nagpur', text: 'They transformed a simple banquet hall into a royal wedding palace. The gold frame elements and fresh flowers were outstanding. Highly recommended luxury planner in Nagpur!', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9', pfp: '/images/girl_avatar.png' },
  { id: 't3', name: 'Rajesh Sen', location: 'Event — Nagpur', text: 'Top tier professionalism. Easy booking, premium catering setup, and gorgeous lighting design. The team was prompt and executed exactly what we signed on.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-3.jpg?v=9', pfp: '/images/boy_avatar.png' },
  { id: 't4', name: 'Priya Sharma', location: 'Event — Nagpur', text: 'Dream Day Events made my haldi ceremony look like a movie set. The vibrant yellow themes and floral props were perfect!', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-5.jpg?v=9', pfp: '/images/girl_avatar.png' },
  { id: 't5', name: 'Vikram Joshi', location: 'Event — Nagpur', text: 'Hosted our corporate gala with them. The stage branding and AV setup were top-notch. Our executives were extremely impressed.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-14.jpg', pfp: '/images/boy_avatar.png' },
  { id: 't6', name: 'Sneha Patel', location: 'Event — Nagpur', text: 'The reception decor was breathtaking! Ambient lighting, elegant drapes, and the lounge setup added so much class to our night.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-red.jpg', pfp: '/images/girl_avatar.png' },
  { id: 't7', name: 'Rahul Mehta', location: 'Event — Nagpur', text: 'Gourmet catering that truly delivers on taste and presentation. Their hospitality staff was courteous and professional.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-10.jpg', pfp: '/images/boy_avatar.png' },
  { id: 't8', name: 'Anjali Verma', location: 'Event — Nagpur', text: 'From planning to execution, every detail was handled with precision. Thank you for making our dream day come true.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-stage-green.jpg', pfp: '/images/girl_avatar.png' },
  { id: 't9', name: 'Siddharth Rao', location: 'Event — Nagpur', text: 'We had a themed birthday party for our daughter and the balloon decor was so creative and beautifully done. She loved it!', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-12.jpg', pfp: '/images/boy_avatar.png' },
  { id: 't10', name: 'Kavita Iyer', location: 'Event — Nagpur', text: 'Highly impressed with their outdoor lawn styling. The beachside sky-blue decor for our anniversary was a hit among guests.', img: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/blue-stage-new.jpg', pfp: '/images/girl_avatar.png' }
];

export default function TestimonialsSettings() {
  const [testimonials, setTestimonials] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [uploadingPfp, setUploadingPfp] = useState(false);
  const [uploadProgressImg, setUploadProgressImg] = useState(0);
  const [uploadProgressPfp, setUploadProgressPfp] = useState(0);
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const docRef = doc(db, 'content', 'testimonials');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().testimonials && docSnap.data().testimonials.length > 0) {
          setTestimonials(docSnap.data().testimonials);
        } else {
          await setDoc(docRef, { testimonials: defaultTestimonials });
          setTestimonials(defaultTestimonials);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }

      try {
        const galRef = doc(db, 'content', 'gallery');
        const galSnap = await getDoc(galRef);
        if (galSnap.exists() && galSnap.data().images) {
          setGalleryImages(galSnap.data().images);
        }
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const openNewModal = () => {
    setEditForm({
      id: `t-${Date.now()}`,
      name: '',
      location: 'Event — Nagpur',
      text: '',
      img: '',
      pfp: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (t) => {
    setEditForm({ ...t });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'img') setUploadingImg(true);
    if (type === 'pfp') setUploadingPfp(true);

    try {
      const storageRef = ref(storage, `testimonials/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (type === 'img') setUploadProgressImg(progress);
        if (type === 'pfp') setUploadProgressPfp(progress);
      });

      await uploadTask;
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      
      if (type === 'img') setEditForm(prev => ({ ...prev, img: url }));
      if (type === 'pfp') setEditForm(prev => ({ ...prev, pfp: url }));
      
      toast.success(`${type === 'img' ? 'Event Image' : 'Profile Picture'} uploaded successfully!`);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(`Failed to upload ${type === 'img' ? 'Event Image' : 'Profile Picture'}.`);
    } finally {
      if (type === 'img') { setUploadingImg(false); setUploadProgressImg(0); }
      if (type === 'pfp') { setUploadingPfp(false); setUploadProgressPfp(0); }
    }
  };

  const handleSaveForm = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isExisting = testimonials.some(t => t.id === editForm.id);
      let updatedTestimonials;
      
      if (isExisting) {
        updatedTestimonials = testimonials.map(t => t.id === editForm.id ? editForm : t);
      } else {
        updatedTestimonials = [editForm, ...testimonials];
      }

      await setDoc(doc(db, 'content', 'testimonials'), { testimonials: updatedTestimonials });
      setTestimonials(updatedTestimonials);
      toast.success('Testimonial saved successfully!');
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Error saving testimonial: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const updatedTestimonials = testimonials.filter(t => t.id !== id);
      await setDoc(doc(db, 'content', 'testimonials'), { testimonials: updatedTestimonials });
      setTestimonials(updatedTestimonials);
      toast.success('Testimonial deleted successfully.');
    } catch (err) {
      toast.error('Error deleting testimonial.');
    }
  };

  if (loading) return <LoadingSpinner message="Loading testimonials..." />;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader 
          title="Manage Testimonials" 
          subtitle="Add or edit client reviews shown on the Home page"
        />
        <Button onClick={openNewModal} icon={Plus}>
          Add New Review
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <EmptyState
          icon={Star}
          title="No testimonials found"
          description="You haven't added any client reviews yet."
          actionLabel="Add Review"
          onAction={openNewModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 stagger-children">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-bg-surface border border-border-subtle rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-card)] flex flex-col group relative">
              <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEditModal(t)} className="w-8 h-8 rounded-full bg-bg-surface border border-border-subtle text-info flex items-center justify-center hover:bg-info-subtle hover:border-info/30 transition-colors shadow-sm">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(t.id)} className="w-8 h-8 rounded-full bg-bg-surface border border-border-subtle text-error flex items-center justify-center hover:bg-error-subtle hover:border-error/30 transition-colors shadow-sm">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="h-32 w-full relative bg-bg-input">
                {t.img ? (
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted">
                    <ImageIcon className="w-6 h-6 opacity-30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent"></div>
              </div>
              
              <div className="px-5 pb-5 pt-0 flex flex-col flex-1 relative z-10">
                <div className="flex items-center gap-3 -mt-6 mb-4">
                  <img 
                    src={t.pfp || '/images/boy_avatar.png'} 
                    alt="PFP" 
                    className="w-12 h-12 rounded-full border-2 border-bg-surface object-cover bg-bg-input" 
                  />
                  <div className="mt-6">
                    <h4 className="text-sm font-bold text-text-primary leading-tight">{t.name}</h4>
                    <p className="text-[10px] text-text-secondary">{t.location}</p>
                  </div>
                </div>
                
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 italic flex-1">
                  "{t.text}"
                </p>

                <div className="mt-4 flex text-accent text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] shadow-2xl w-full max-w-2xl flex flex-col animate-slide-up max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-border-subtle shrink-0">
              <h2 className="text-xl font-bold text-text-primary">
                {editForm.id.startsWith('t-') ? 'Add Testimonial' : 'Edit Testimonial'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary"><X className="w-5 h-5" /></button>
            </div>
            
            <form id="testimonial-form" onSubmit={handleSaveForm} className="p-6 overflow-y-auto custom-scrollbar space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Client Name" required>
                  <Input name="name" value={editForm.name} onChange={handleChange} placeholder="e.g. Amit Deshpande" required />
                </FormField>
                <FormField label="Location (Optional)">
                  <Input name="location" value={editForm.location} onChange={handleChange} placeholder="e.g. Event — Nagpur" />
                </FormField>
              </div>

              <FormField label="Review Text" required>
                <Textarea name="text" value={editForm.text} onChange={handleChange} rows={4} placeholder="Type the client's review here..." required />
              </FormField>

              <div className="border-t border-border-subtle pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField label="Event Image (Background)">
                  <div className="space-y-3">
                    <select
                      value={editForm.img || ''}
                      onChange={handleChange}
                      name="img"
                      className="w-full bg-bg-input border border-border-subtle text-text-primary text-sm rounded-[var(--radius-md)] focus:ring-1 focus:ring-accent focus:border-accent block p-2.5 transition-colors"
                    >
                      <option value="">-- Select existing gallery image --</option>
                      {galleryImages.map(g => (
                        <option key={g.id} value={g.url}>{g.title || `Image ${g.id}`}</option>
                      ))}
                    </select>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-muted">OR</span>
                      <div className="relative flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'img')}
                          className="w-full text-xs text-text-secondary file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-accent file:text-bg-base hover:file:bg-accent-hover file:cursor-pointer"
                          disabled={uploadingImg}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {uploadingImg && (
                    <div className="w-full bg-bg-input rounded-full h-1 mt-2 overflow-hidden">
                      <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: `${uploadProgressImg}%` }} />
                    </div>
                  )}
                  {editForm.img && !uploadingImg && (
                    <div className="mt-2 w-24 h-16 rounded overflow-hidden border border-border-subtle relative">
                       <img src={editForm.img} alt="Preview" className="w-full h-full object-cover" />
                       <button type="button" onClick={() => setEditForm(prev => ({...prev, img: ''}))} className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 text-white hover:text-error"><X className="w-3 h-3" /></button>
                    </div>
                  )}
                  <p className="text-[10px] text-text-muted mt-1.5">This image will appear behind the review card.</p>
                </FormField>

                <FormField label="Profile Picture (PFP)">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'pfp')}
                      className="w-full text-xs text-text-secondary file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-accent file:text-bg-base hover:file:bg-accent-hover file:cursor-pointer"
                      disabled={uploadingPfp}
                    />
                  </div>
                  {uploadingPfp && (
                    <div className="w-full bg-bg-input rounded-full h-1 mt-2 overflow-hidden">
                      <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: `${uploadProgressPfp}%` }} />
                    </div>
                  )}
                  <div className="mt-3 flex items-center gap-6 bg-bg-base p-2 rounded border border-border-subtle inline-flex">
                    <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                      <input 
                        type="radio" 
                        name="defaultPfp" 
                        className="accent-accent"
                        checked={editForm.pfp === '/images/boy_avatar.png' || (!editForm.pfp && !editForm.pfp?.startsWith('http'))} 
                        onChange={() => setEditForm(prev => ({...prev, pfp: '/images/boy_avatar.png'}))} 
                      />
                      <img src="/images/boy_avatar.png" alt="Boy" className="w-8 h-8 rounded-full border border-border-subtle" />
                      <span className="text-xs text-text-primary">Boy</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                      <input 
                        type="radio" 
                        name="defaultPfp" 
                        className="accent-accent"
                        checked={editForm.pfp === '/images/girl_avatar.png'} 
                        onChange={() => setEditForm(prev => ({...prev, pfp: '/images/girl_avatar.png'}))} 
                      />
                      <img src="/images/girl_avatar.png" alt="Girl" className="w-8 h-8 rounded-full border border-border-subtle" />
                      <span className="text-xs text-text-primary">Girl</span>
                    </label>
                  </div>

                  {editForm.pfp && editForm.pfp.startsWith('http') && (
                    <div className="mt-3 flex items-center gap-3 bg-bg-surface-hover p-2 rounded border border-accent/30 inline-flex">
                      <span className="text-xs text-text-secondary">Custom:</span>
                      <img src={editForm.pfp} alt="Custom PFP" className="w-8 h-8 rounded-full object-cover border border-border-subtle" />
                      <button type="button" onClick={() => setEditForm(prev => ({...prev, pfp: '/images/boy_avatar.png'}))} className="text-[10px] text-error hover:underline font-semibold ml-2">Remove Custom</button>
                    </div>
                  )}

                  <p className="text-[10px] text-text-muted mt-2">Choose a default avatar or upload a custom one.</p>
                </FormField>
              </div>

            </form>
            
            <div className="p-6 border-t border-border-subtle flex justify-end gap-3 bg-bg-surface-hover/30 rounded-b-[var(--radius-xl)] shrink-0">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" form="testimonial-form" disabled={saving || uploadingImg || uploadingPfp} icon={Save}>
                {saving ? 'Saving...' : 'Save Testimonial'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
