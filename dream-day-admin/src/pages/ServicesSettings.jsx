import { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Save, Plus, Trash2, Edit2, X, Star, Link as LinkIcon, Image as ImageIcon, Upload } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import FormField, { Input, Textarea } from '../components/FormField';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { useToast } from '../hooks/useToast';

const defaultServices = [
  {
    id: 'wedding-decor',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-stage-green.jpg",
    badge: "Most Popular",
    title: "Wedding Decor",
    meta: "250+ Weddings Decorated",
    desc: "Grand stage designs, beautiful mandaps, entrance archways and floral styling that leave a lasting impression.",
    inquireText: "Wedding Decor",
    isFeatured: true
  },
  {
    id: 'haldi-mehndi',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/haldi-yellow.jpg",
    title: "Haldi & Mehndi Setup",
    meta: "180+ Ceremonies Styled",
    desc: "Vibrant, colourful, and custom setups using fresh flowers and unique props matching your traditional themes.",
    inquireText: "Haldi and Mehndi",
    isFeatured: true
  },
  {
    id: 'reception-decor',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-red.jpg",
    title: "Reception Decor",
    meta: "120+ Grand Receptions",
    desc: "Ultra-modern layouts, ambient lighting setups, elegant drapes, and high-fashion lounges for post-wedding events.",
    inquireText: "Reception Decor",
    isFeatured: true
  },
  {
    id: 'gourmet-catering',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-10.jpg",
    title: "Gourmet Catering",
    meta: "300+ Feasts Served",
    desc: "Exquisite culinary experience with premium serving displays, tailored menus, and professional hospitality staff.",
    inquireText: "Gourmet Catering",
    isFeatured: true
  },
  {
    id: 'themed-parties',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-12.jpg",
    title: "Themed Parties & Birthdays",
    meta: "150+ Celebrations",
    desc: "Creative themed designs, balloons, and customized decor for kids' birthdays and private social gatherings.",
    inquireText: "Themed Parties",
    isFeatured: true
  },
  {
    id: 'corporate-galas',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-14.jpg",
    title: "Corporate Galas",
    meta: "90+ Corporate Events",
    desc: "Professional stage branding, audio-visual coordinate setups, premium conference decor, and awards night arrangements.",
    inquireText: "Corporate Event",
    isFeatured: true
  },
  {
    id: 'photography-videography',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-17.jpg",
    title: "Photography & Videography",
    meta: "200+ Shoots Covered",
    desc: "Cinematic highlight reels, professional event photography, and drone packages capturing every single emotion.",
    inquireText: "Photography",
    isFeatured: false
  },
  {
    id: 'entertainment-music',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-18.jpg",
    title: "Entertainment & Live Music",
    meta: "100+ Live Stages",
    desc: "Live wedding bands, classical musicians, professional DJs, sound setups, and elite artist management.",
    inquireText: "Entertainment",
    isFeatured: false
  },
  {
    id: 'transport-logistics',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-22.jpg",
    title: "Guest Transportation & Logistics",
    meta: "70+ Event Fleets",
    desc: "Premium guest arrivals, vehicle arrangements, route coordination, and hospitality helpdesk management.",
    inquireText: "Transport",
    isFeatured: false
  },
  {
    id: 'floral-arrangements',
    img: "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-9.jpg",
    title: "Floral Arrangements",
    meta: "500+ Floral Styles",
    desc: "Exotic floral setups, table centerpieces, fresh flower decorations, and customized boutique arrangements.",
    inquireText: "Floral",
    isFeatured: false
  }
];

export default function ServicesSettings() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const docRef = doc(db, 'content', 'services');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().services) {
        setServices(docSnap.data().services);
      } else {
        setServices(defaultServices);
        await setDoc(docRef, { services: defaultServices });
      }
    } catch (err) {
      console.error("Error fetching services:", err);
      toast.error('Failed to load services.');
    } finally {
      setLoading(false);
    }
  }

  const handleSaveToDB = async (updatedServices) => {
    try {
      await setDoc(doc(db, 'content', 'services'), { services: updatedServices });
      setServices(updatedServices);
      return true;
    } catch (err) {
      console.error("Error saving:", err);
      toast.error('Failed to save changes.');
      return false;
    }
  };

  const toggleFeatured = async (serviceId) => {
    const updatedServices = services.map(s => {
      if (s.id === serviceId) {
        return { ...s, isFeatured: !s.isFeatured };
      }
      return s;
    });

    const featuredCount = updatedServices.filter(s => s.isFeatured).length;
    if (featuredCount > 6) {
      toast.error('You can only feature a maximum of 6 services on the Home page.');
      return;
    }

    const success = await handleSaveToDB(updatedServices);
    if (success) toast.success('Featured status updated.');
  };

  const handleDelete = async (serviceId) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    const updatedServices = services.filter(s => s.id !== serviceId);
    const success = await handleSaveToDB(updatedServices);
    if (success) toast.success('Service deleted successfully.');
  };

  const openNewModal = () => {
    setEditForm({
      id: `service-${Date.now()}`,
      title: '',
      desc: '',
      meta: '',
      badge: '',
      img: '',
      inquireText: '',
      isFeatured: false
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditForm({ ...service });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const storageRef = ref(storage, `services/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      });

      await uploadTask;
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      
      setEditForm(prev => ({ ...prev, img: url }));
      toast.success('Image uploaded successfully!');
    } catch (err) {
      console.error("Upload error:", err);
      toast.error('Failed to upload image.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSaveForm = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    let updatedServices;
    const existingIndex = services.findIndex(s => s.id === editForm.id);
    
    if (existingIndex > -1) {
      updatedServices = [...services];
      updatedServices[existingIndex] = editForm;
    } else {
      updatedServices = [...services, editForm];
    }

    const featuredCount = updatedServices.filter(s => s.isFeatured).length;
    if (featuredCount > 6) {
      toast.error('You can only feature up to 6 services. Please uncheck "Feature on Home".');
      setSaving(false);
      return;
    }

    const success = await handleSaveToDB(updatedServices);
    if (success) {
      toast.success('Service saved successfully!');
      setIsModalOpen(false);
    }
    setSaving(false);
  };

  if (loading) return <LoadingSpinner message="Loading services..." />;

  const featuredCount = services.filter(s => s.isFeatured).length;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-border-subtle pb-6">
        <div>
          <PageHeader 
            title="Manage Services" 
            subtitle={`${services.length} Total Services | ${featuredCount}/6 Featured on Home Page`}
            className="mb-0"
          />
        </div>
        <Button onClick={openNewModal} icon={Plus}>Add New Service</Button>
      </div>

      {services.length === 0 ? (
        <EmptyState
          icon={Star}
          title="No services found"
          description="You haven't added any services yet."
          actionLabel="Add Service"
          onAction={openNewModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map(service => (
            <div key={service.id} className={`bg-bg-surface border ${service.isFeatured ? 'border-gold-primary ring-1 ring-gold-primary/30' : 'border-border-subtle'} rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] overflow-hidden flex flex-col`}>
              <div className="h-48 relative bg-bg-input">
                {service.img ? (
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted">
                    <ImageIcon className="w-8 h-8 opacity-20" />
                  </div>
                )}
                
                <div className="absolute top-3 right-3 flex gap-2">
                   <button 
                     onClick={() => toggleFeatured(service.id)}
                     title={service.isFeatured ? "Unfeature from Home" : "Feature on Home"}
                     className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm transition-colors ${service.isFeatured ? 'bg-gold-primary text-black border border-gold-primary' : 'bg-black/40 text-white hover:bg-black/60 border border-white/20'}`}
                   >
                     <Star className="w-4 h-4" fill={service.isFeatured ? "currentColor" : "none"} />
                   </button>
                </div>
                
                {service.badge && (
                  <div className="absolute top-3 left-3 bg-error text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                    {service.badge}
                  </div>
                )}
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-3">
                    <h3 className="text-lg font-bold text-text-primary leading-tight">{service.title}</h3>
                    <p className="text-xs text-text-secondary font-semibold mt-1">{service.meta || 'No meta text'}</p>
                </div>
                
                <p className="text-sm text-text-muted line-clamp-3 mb-4 flex-1">
                  {service.desc}
                </p>
                
                <div className="flex items-center justify-between border-t border-border-subtle pt-4 mt-auto">
                   <div className="text-xs text-text-muted flex items-center gap-1" title="Inquiry Button Subject">
                     <LinkIcon className="w-3 h-3" />
                     {service.inquireText}
                   </div>
                   <div className="flex gap-2">
                     <button onClick={() => openEditModal(service)} className="text-info hover:bg-info-subtle p-2 rounded transition-colors"><Edit2 className="w-4 h-4" /></button>
                     <button onClick={() => handleDelete(service.id)} className="text-error hover:bg-error-subtle p-2 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-border-subtle shrink-0">
              <h2 className="text-xl font-bold text-text-primary">{services.some(s => s.id === editForm.id) ? 'Edit Service' : 'Add New Service'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleSaveForm} className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-5">
              
              <div className="flex items-center gap-2 mb-2">
                <input 
                  type="checkbox" 
                  id="isFeatured" 
                  name="isFeatured"
                  checked={editForm.isFeatured}
                  onChange={(e) => setEditForm(prev => ({ ...prev, isFeatured: e.target.checked }))}
                  className="w-4 h-4 rounded border-border-default text-gold-primary focus:ring-gold-primary"
                />
                <label htmlFor="isFeatured" className="text-sm font-semibold text-text-primary flex items-center gap-1 cursor-pointer">
                  Feature on Home Page <Star className="w-3 h-3 text-gold-primary" fill="currentColor"/>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Service Title" required>
                  <Input name="title" value={editForm.title} onChange={handleChange} placeholder="e.g. Wedding Decor" required />
                </FormField>
                <FormField label="Service Image" required>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full text-sm text-text-secondary file:mr-3 file:py-2 file:px-4 file:rounded-[var(--radius-md)] file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-bg-base hover:file:bg-accent-hover file:cursor-pointer file:transition-colors"
                      disabled={uploading}
                    />
                  </div>
                  {uploading && (
                    <div className="w-full bg-bg-input rounded-full h-1.5 mt-2 overflow-hidden">
                      <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  )}
                  {editForm.img && !uploading && (
                    <div className="mt-2 relative w-20 h-20 rounded-md overflow-hidden border border-border-subtle">
                       <img src={editForm.img} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </FormField>
              </div>

              <FormField label="Description" required>
                <Textarea name="desc" value={editForm.desc} onChange={handleChange} rows={3} placeholder="Describe the service..." required />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Meta Text (Optional)">
                  <Input name="meta" value={editForm.meta} onChange={handleChange} placeholder="e.g. 250+ Weddings Decorated" />
                </FormField>
                <FormField label="Badge (Optional)">
                  <Input name="badge" value={editForm.badge} onChange={handleChange} placeholder="e.g. Most Popular" />
                </FormField>
              </div>

              <FormField label="Inquiry Subject" required>
                <Input name="inquireText" value={editForm.inquireText} onChange={handleChange} placeholder="e.g. Wedding Decor" required />
                <p className="text-[10px] text-text-muted mt-1">This text is pre-filled when they click 'Inquire Now'.</p>
              </FormField>
            </form>
            
            <div className="p-6 border-t border-border-subtle flex justify-end gap-3 bg-bg-surface-hover/30 rounded-b-[var(--radius-xl)] shrink-0">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveForm} disabled={saving} icon={Save}>
                {saving ? 'Saving...' : 'Save Service'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
