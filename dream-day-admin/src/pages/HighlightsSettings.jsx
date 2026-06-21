import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Edit2, X, Check, Video } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import FormField, { Input } from '../components/FormField';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../hooks/useToast';

export default function HighlightsSettings() {
  const [highlightsData, setHighlightsData] = useState({
    tagline: '',
    title: '',
    titleHighlight: '',
    videoIds: []
  });
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);

  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const highRef = doc(db, 'content', 'highlights');
        const highSnap = await getDoc(highRef);
        if (highSnap.exists()) {
          setHighlightsData(highSnap.data());
        } else {
          setHighlightsData({
            tagline: "✦ Experience the Magic ✦",
            title: "Cinematic",
            titleHighlight: "Highlights",
            videoIds: [1, 2, 3]
          });
        }

        const vidRef = doc(db, 'content', 'videos');
        const vidSnap = await getDoc(vidRef);
        if (vidSnap.exists() && vidSnap.data().videos) {
          setAllVideos(vidSnap.data().videos);
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
    setEditForm(JSON.parse(JSON.stringify(highlightsData)));
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const toggleVideoSelection = (videoId) => {
    let currentIds = [...(editForm.videoIds || [])];
    const index = currentIds.indexOf(videoId);
    
    if (index > -1) {
      currentIds.splice(index, 1);
    } else {
      if (currentIds.length >= 3) {
        // Automatically remove the oldest selection to make room for the new one
        currentIds.shift();
        toast.success("Replaced one of the 3 highlights.");
      }
      currentIds.push(videoId);
    }
    setEditForm(prev => ({ ...prev, videoIds: currentIds }));
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'content', 'highlights'), editForm);
      setHighlightsData(editForm);
      toast.success('Highlights section updated successfully!');
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Error saving highlights data: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading Highlights settings..." />;

  // Find actual video objects for the preview
  const selectedVideos = allVideos.filter(v => highlightsData.videoIds?.includes(v.id));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader 
          title="Cinematic Highlights" 
          subtitle="Manage the featured video reels on your Home page"
        />
        <Button onClick={openEditModal} icon={Edit2}>
          Edit Highlights
        </Button>
      </div>

      {/* Main View: Read-Only Preview */}
      <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] overflow-hidden">
        <div className="p-8 text-center bg-bg-surface-hover/30 border-b border-border-subtle">
           <span className="text-xs font-semibold text-accent uppercase tracking-widest">{highlightsData.tagline || 'No Tagline'}</span>
           <h2 className="text-3xl font-bold text-text-primary mt-2">
             {highlightsData.title} <span className="text-accent">{highlightsData.titleHighlight}</span>
           </h2>
        </div>
        
        <div className="p-8">
          <h3 className="text-lg font-bold text-text-primary mb-6">Featured Videos ({selectedVideos.length})</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedVideos.map(vid => (
              <div key={vid.id} className="relative aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-lg border border-border-subtle">
                <video 
                  src={vid.src} 
                  poster={vid.poster} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  preload="auto"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] uppercase font-bold text-black bg-gold-primary px-2 py-0.5 rounded-full self-start mb-2">{vid.badge || 'Highlight'}</span>
                  <h4 className="text-white font-bold text-sm">{vid.title}</h4>
                </div>
              </div>
            ))}
            {selectedVideos.length === 0 && (
              <div className="col-span-full text-center py-12 text-text-muted">
                <Video className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No videos selected to feature.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-border-subtle shrink-0">
              <h2 className="text-xl font-bold text-text-primary">Edit Cinematic Highlights</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="space-y-8">
                
                {/* Text Form */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-text-primary border-b border-border-subtle pb-2">Section Headings</h3>
                  <FormField label="Tagline (e.g. ✦ Experience the Magic ✦)">
                    <Input name="tagline" value={editForm.tagline} onChange={handleChange} />
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Title Part 1">
                      <Input name="title" value={editForm.title} onChange={handleChange} placeholder="Cinematic" />
                    </FormField>
                    <FormField label="Title Highlight (Gold)">
                      <Input name="titleHighlight" value={editForm.titleHighlight} onChange={handleChange} placeholder="Highlights" />
                    </FormField>
                  </div>
                </div>

                {/* Video Selection Form */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-border-subtle pb-2">
                    <h3 className="text-sm font-bold text-text-primary">Select Featured Videos</h3>
                    <span className="text-xs font-semibold text-accent bg-accent-subtle px-2 py-0.5 rounded">
                      {editForm.videoIds?.length || 0} Selected
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">Click on any video below to feature it on the Home page.</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                    {allVideos.map((vid) => {
                      const isSelected = editForm.videoIds?.includes(vid.id);
                      return (
                        <div 
                          key={vid.id}
                          onClick={() => toggleVideoSelection(vid.id)}
                          className={`relative aspect-[9/16] rounded-md overflow-hidden cursor-pointer border-2 transition-all ${isSelected ? 'border-accent ring-2 ring-accent/30 scale-95' : 'border-transparent hover:border-accent/50'}`}
                        >
                          <img src={vid.poster} alt={vid.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                             <span className="text-[10px] text-white font-semibold line-clamp-2 leading-tight">{vid.title}</span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-accent text-bg-surface rounded-full p-1 shadow-md">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {allVideos.length === 0 && (
                      <div className="col-span-full text-center py-8 text-sm text-text-muted">
                        No videos found in your portfolio.
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
