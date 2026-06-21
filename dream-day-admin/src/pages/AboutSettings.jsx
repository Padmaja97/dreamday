import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import FormField, { Input, Textarea } from '../components/FormField';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../hooks/useToast';

export default function AboutSettings() {
  const [aboutData, setAboutData] = useState({
    images: [],
    tagline: '',
    title: '',
    titleHighlight: '',
    paragraphs: [],
    features: []
  });
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);

  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const aboutRef = doc(db, 'content', 'about');
        const aboutSnap = await getDoc(aboutRef);
        if (aboutSnap.exists()) {
          setAboutData(aboutSnap.data());
        } else {
          setAboutData({
            images: [
              "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/wedding-red.jpg",
              "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-1.jpg?v=9",
              "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9",
              "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-3.jpg?v=9",
              "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-5.jpg?v=9",
              "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-9.jpg?v=9",
              "https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-21.jpg?v=9"
            ],
            tagline: "✦ Who We Are ✦",
            title: "Defining Luxury in",
            titleHighlight: "Every Single Detail",
            paragraphs: [
              "Welcome to Dream Day Events, your premier partner in luxury event management, premium decor, and gourmet catering. Led by the visionary event designer Mr. Ayush Kale, we transform venues into royal spaces, creating rich, premium designs tailored to your desires.",
              "From magnificent wedding stages to vibrant haldi ceremonies, elegant corporate affairs to custom catered delicacies, we ensure perfection in execution. Our signature style blends traditional elegance with modern sophistication."
            ],
            features: [
              { icon: "fa-solid fa-award", title: "Elite Designs", desc: "Bespoke themes and setups" },
              { icon: "fa-solid fa-utensils", title: "Premium Catering", desc: "Gourmet multi-cuisine spreads" }
            ]
          });
        }

        const galRef = doc(db, 'content', 'gallery');
        const galSnap = await getDoc(galRef);
        if (galSnap.exists() && galSnap.data().images) {
          setGalleryImages(galSnap.data().images);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const openEditModal = () => {
    // Deep copy to prevent mutations
    setEditForm(JSON.parse(JSON.stringify(aboutData)));
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleParagraphChange = (index, value) => {
    const newParagraphs = [...editForm.paragraphs];
    newParagraphs[index] = value;
    setEditForm(prev => ({ ...prev, paragraphs: newParagraphs }));
  };

  const addParagraph = () => {
    setEditForm(prev => ({ ...prev, paragraphs: [...(prev.paragraphs || []), ""] }));
  };

  const removeParagraph = (index) => {
    const newParagraphs = [...editForm.paragraphs];
    newParagraphs.splice(index, 1);
    setEditForm(prev => ({ ...prev, paragraphs: newParagraphs }));
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...editForm.features];
    newFeatures[index][field] = value;
    setEditForm(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setEditForm(prev => ({ 
      ...prev, 
      features: [...(prev.features || []), { icon: "fa-solid fa-star", title: "New Feature", desc: "Feature description" }] 
    }));
  };

  const removeFeature = (index) => {
    const newFeatures = [...editForm.features];
    newFeatures.splice(index, 1);
    setEditForm(prev => ({ ...prev, features: newFeatures }));
  };

  const toggleImageSelection = (imgObj) => {
    const url = typeof imgObj === 'string' ? imgObj : imgObj.url;
    const currentImages = [...(editForm.images || [])];
    const index = currentImages.indexOf(url);
    
    if (index > -1) {
      currentImages.splice(index, 1);
    } else {
      currentImages.push(url);
    }
    setEditForm(prev => ({ ...prev, images: currentImages }));
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'content', 'about'), editForm);
      setAboutData(editForm);
      toast.success('About section updated successfully!');
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Error saving about data: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading About settings..." />;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader 
          title="About Section" 
          subtitle="View and manage the Who We Are section on your Home page"
        />
        <Button onClick={openEditModal} icon={Edit2}>
          Edit About Section
        </Button>
      </div>

      {/* Main View: Read-Only Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Text Preview */}
        <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-card)] space-y-6">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <h3 className="text-lg font-bold text-text-primary">Content Preview</h3>
          </div>
          
          <div>
            <span className="text-xs font-semibold text-accent uppercase tracking-widest">{aboutData.tagline || 'No Tagline'}</span>
            <h2 className="text-2xl font-bold text-text-primary mt-1">
              {aboutData.title} <span className="text-accent">{aboutData.titleHighlight}</span>
            </h2>
          </div>

          <div className="space-y-3">
            {aboutData.paragraphs?.map((p, idx) => (
              <p key={idx} className="text-sm text-text-secondary leading-relaxed border-l-2 border-border-subtle pl-3">{p}</p>
            ))}
            {(!aboutData.paragraphs || aboutData.paragraphs.length === 0) && (
              <p className="text-sm text-text-muted italic">No paragraphs added.</p>
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Highlighted Features</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutData.features?.map((f, idx) => (
                <div key={idx} className="flex gap-3 items-start bg-bg-surface-hover/50 p-3 rounded-lg border border-border-subtle">
                  <div className="mt-0.5 text-accent"><i className={f.icon}></i></div>
                  <div>
                    <h5 className="text-sm font-semibold text-text-primary">{f.title}</h5>
                    <p className="text-xs text-text-secondary">{f.desc}</p>
                  </div>
                </div>
              ))}
              {(!aboutData.features || aboutData.features.length === 0) && (
                <p className="text-sm text-text-muted italic">No features added.</p>
              )}
            </div>
          </div>
        </div>

        {/* Images Preview */}
        <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-4">
            <h3 className="text-lg font-bold text-text-primary">Slideshow Images ({aboutData.images?.length || 0})</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {aboutData.images?.map((url, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-border-subtle group">
                <img src={url} alt={`Slideshow ${idx + 1}`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur">
                  {idx + 1}
                </div>
              </div>
            ))}
            {(!aboutData.images || aboutData.images.length === 0) && (
              <div className="col-span-3 text-center py-8 text-sm text-text-muted">
                No images selected for the slideshow.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-border-subtle shrink-0">
              <h2 className="text-xl font-bold text-text-primary">Edit About Section</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Column: Text Form */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-text-primary border-b border-border-subtle pb-2">Headings</h3>
                    <FormField label="Tagline (e.g. ✦ Who We Are ✦)">
                      <Input name="tagline" value={editForm.tagline} onChange={handleChange} />
                    </FormField>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField label="Title Part 1">
                        <Input name="title" value={editForm.title} onChange={handleChange} placeholder="Defining Luxury in" />
                      </FormField>
                      <FormField label="Title Highlight (Gold)">
                        <Input name="titleHighlight" value={editForm.titleHighlight} onChange={handleChange} placeholder="Every Single Detail" />
                      </FormField>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-border-subtle pb-2">
                      <h3 className="text-sm font-bold text-text-primary">Paragraphs</h3>
                      <button type="button" onClick={addParagraph} className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"><Plus className="w-3 h-3"/> Add</button>
                    </div>
                    <div className="space-y-3">
                      {editForm.paragraphs?.map((p, idx) => (
                        <div key={idx} className="flex gap-2 items-start">
                          <Textarea 
                            value={p} 
                            onChange={(e) => handleParagraphChange(idx, e.target.value)} 
                            rows={3} 
                            className="flex-1 text-sm"
                          />
                          <button type="button" onClick={() => removeParagraph(idx)} className="p-2 mt-1 text-text-muted hover:text-error bg-bg-surface-hover rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-border-subtle pb-2">
                      <h3 className="text-sm font-bold text-text-primary">Features</h3>
                      <button type="button" onClick={addFeature} className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"><Plus className="w-3 h-3"/> Add</button>
                    </div>
                    <div className="space-y-4">
                      {editForm.features?.map((feature, idx) => (
                        <div key={idx} className="flex gap-3 items-start border border-border-subtle p-3 rounded-lg bg-bg-base/50">
                          <div className="flex-1 space-y-2">
                            <Input 
                              value={feature.title} 
                              onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)} 
                              placeholder="Title (e.g. Elite Designs)"
                              className="text-sm font-semibold"
                            />
                            <Input 
                              value={feature.desc} 
                              onChange={(e) => handleFeatureChange(idx, 'desc', e.target.value)} 
                              placeholder="Description"
                              className="text-xs"
                            />
                            <Input 
                              value={feature.icon} 
                              onChange={(e) => handleFeatureChange(idx, 'icon', e.target.value)} 
                              placeholder="FontAwesome Icon Class (e.g. fa-solid fa-award)"
                              className="text-xs text-text-muted"
                            />
                          </div>
                          <button type="button" onClick={() => removeFeature(idx)} className="p-2 text-text-muted hover:text-error bg-bg-surface-hover rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Image Selection Form */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-border-subtle pb-2">
                    <h3 className="text-sm font-bold text-text-primary">Select Slideshow Images</h3>
                    <span className="text-xs font-semibold text-accent bg-accent-subtle px-2 py-0.5 rounded">
                      {editForm.images?.length || 0} Selected
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">Click on any gallery image below to include it in the About section.</p>

                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                    {galleryImages.map((img, i) => {
                      const url = typeof img === 'string' ? img : img.url;
                      const isSelected = editForm.images?.includes(url);
                      return (
                        <div 
                          key={i}
                          onClick={() => toggleImageSelection(url)}
                          className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all ${isSelected ? 'border-accent ring-2 ring-accent/30 scale-95' : 'border-transparent hover:border-accent/50'}`}
                        >
                          <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                          {isSelected && (
                            <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                              <div className="bg-accent text-bg-surface rounded-full p-1 shadow-md">
                                <Check className="w-3 h-3" />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {galleryImages.length === 0 && (
                      <div className="col-span-full text-center py-8 text-sm text-text-muted">
                        No images found in your Gallery.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
            
            <div className="p-6 border-t border-border-subtle flex justify-end gap-3 bg-bg-surface-hover/30 rounded-b-[var(--radius-xl)] shrink-0">
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
