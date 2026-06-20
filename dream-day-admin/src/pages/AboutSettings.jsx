import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Plus, Trash2 } from 'lucide-react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutData(prev => ({ ...prev, [name]: value }));
  };

  const handleParagraphChange = (index, value) => {
    const newParagraphs = [...aboutData.paragraphs];
    newParagraphs[index] = value;
    setAboutData(prev => ({ ...prev, paragraphs: newParagraphs }));
  };

  const addParagraph = () => {
    setAboutData(prev => ({ ...prev, paragraphs: [...prev.paragraphs, ""] }));
  };

  const removeParagraph = (index) => {
    const newParagraphs = [...aboutData.paragraphs];
    newParagraphs.splice(index, 1);
    setAboutData(prev => ({ ...prev, paragraphs: newParagraphs }));
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...aboutData.features];
    newFeatures[index][field] = value;
    setAboutData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setAboutData(prev => ({ 
      ...prev, 
      features: [...prev.features, { icon: "fa-solid fa-star", title: "New Feature", desc: "Feature description" }] 
    }));
  };

  const removeFeature = (index) => {
    const newFeatures = [...aboutData.features];
    newFeatures.splice(index, 1);
    setAboutData(prev => ({ ...prev, features: newFeatures }));
  };

  const toggleImageSelection = (imgObj) => {
    const url = typeof imgObj === 'string' ? imgObj : imgObj.url;
    const currentImages = [...(aboutData.images || [])];
    const index = currentImages.indexOf(url);
    
    if (index > -1) {
      currentImages.splice(index, 1);
    } else {
      currentImages.push(url);
    }
    setAboutData(prev => ({ ...prev, images: currentImages }));
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'content', 'about'), aboutData);
      toast.success('About section updated successfully!');
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
          subtitle="Customize the Who We Are section on your Home page"
        />
        <Button onClick={handleSave} icon={Save} disabled={saving}>
          {saving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Text Content */}
        <div className="space-y-6">
          <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-card)] space-y-4">
            <h3 className="text-lg font-bold text-text-primary mb-4">Text Content</h3>
            
            <FormField label="Tagline (e.g. ✦ Who We Are ✦)">
              <Input name="tagline" value={aboutData.tagline} onChange={handleChange} />
            </FormField>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Title Part 1">
                <Input name="title" value={aboutData.title} onChange={handleChange} placeholder="Defining Luxury in" />
              </FormField>
              <FormField label="Title Highlight (Gold)">
                <Input name="titleHighlight" value={aboutData.titleHighlight} onChange={handleChange} placeholder="Every Single Detail" />
              </FormField>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 mt-6">
                <label className="block text-sm font-medium text-text-secondary">Paragraphs</label>
                <button type="button" onClick={addParagraph} className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"><Plus className="w-3 h-3"/> Add Paragraph</button>
              </div>
              <div className="space-y-3">
                {aboutData.paragraphs?.map((p, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <Textarea 
                      value={p} 
                      onChange={(e) => handleParagraphChange(idx, e.target.value)} 
                      rows={3} 
                      className="flex-1"
                    />
                    <button type="button" onClick={() => removeParagraph(idx)} className="p-2 mt-1 text-text-muted hover:text-error bg-bg-surface-hover rounded-md"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-card)] space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-text-primary">Features</h3>
              <button type="button" onClick={addFeature} className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"><Plus className="w-3 h-3"/> Add Feature</button>
            </div>
            
            <div className="space-y-4">
              {aboutData.features?.map((feature, idx) => (
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
                  <button type="button" onClick={() => removeFeature(idx)} className="p-2 text-text-muted hover:text-error bg-bg-surface-hover rounded-md"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              {(!aboutData.features || aboutData.features.length === 0) && (
                <p className="text-sm text-text-muted">No features added.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Image Selection */}
        <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-card)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-text-primary">Slideshow Images</h3>
            <span className="text-xs font-semibold text-accent bg-accent-subtle px-2 py-1 rounded">
              {aboutData.images?.length || 0} Selected
            </span>
          </div>
          <p className="text-sm text-text-secondary mb-6">
            Click on any image from your gallery to include it in the About section slideshow.
          </p>

          <div className="grid grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {galleryImages.map((img, i) => {
              const url = typeof img === 'string' ? img : img.url;
              const isSelected = aboutData.images?.includes(url);
              return (
                <div 
                  key={i}
                  onClick={() => toggleImageSelection(url)}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${isSelected ? 'border-accent ring-2 ring-accent/30 scale-[0.98]' : 'border-transparent hover:border-accent/50'}`}
                >
                  <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                  {isSelected && (
                    <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                      <div className="bg-accent text-bg-surface rounded-full p-1 shadow-lg">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {galleryImages.length === 0 && (
              <div className="col-span-3 text-center py-8 text-sm text-text-muted">
                No images found in your Gallery. Add images in the Gallery tab first.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
