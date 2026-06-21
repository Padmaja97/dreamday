import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Plus, Edit2, Trash2, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../hooks/useToast';

const fallbackPackages = [
  {
    id: "pkg-1",
    tag: "Premium Choice",
    name: "Royal Elite Wedding Stage",
    price: 150000,
    period: "Starting",
    isFeatured: false,
    features: [
      "Grand 40ft Stage Backdrop Setup",
      "Fresh and Silk Floral Arches",
      "Royal Maharaja Couch / Sofa Seating",
      "Walkway Red Carpet & Light Pillars",
      "Elegant Selfie Photo Booth Spot",
      "Custom 3D Monogram & Cold Pyro Entry",
      "Complete Ambient LED Venue Lighting"
    ]
  },
  {
    id: "pkg-2",
    tag: "Most Popular",
    name: "Vibrant Shahnaz Haldi",
    price: 60000,
    period: "Starting",
    isFeatured: true,
    features: [
      "Traditional Yellow/Pink Silk Draping",
      "Decorated Wooden swing Setup",
      "Cascading Heavy Marigold Garlands",
      "Brass Vessels & Ceremonial Urali Bowl",
      "Festive Guest Seating Cushions & Mats",
      "Sound System for Traditional Sangeet",
      "Haldi Photo backdrop Props"
    ]
  },
  {
    id: "pkg-3",
    tag: "Corporate Elite",
    name: "Imperial Gala Stage",
    price: 120000,
    period: "Starting",
    isFeatured: false,
    features: [
      "Modern Panel Staging & Matte Flooring",
      "High-Def LED Wall Backdrop Integration",
      "Professional Truss and Spotlight Rigs",
      "Elite VIP Seating Sofa Lounge Setup",
      "Registration Counter & Media Wall Decor",
      "Luxury Centerpieces for Banquet Tables",
      "Sound System & Wireless Podium Mics"
    ]
  },
  {
    id: "pkg-4",
    tag: "Gourmet Feasts",
    name: "Signature Catering",
    price: 800,
    period: "Per Plate",
    isFeatured: false,
    features: [
      "Tailored Veg & Non-Veg Multi-Cuisine",
      "Luxury 5-Star Buffet Layout Presentation",
      "3 Live Food Counters (Chat, Pasta, etc.)",
      "Premium Mocktails & Welcome Drinks Bar",
      "Royal Dessert Display & Hot Jalebi Counter",
      "Professional Uniformed Service Staff",
      "Full Banquet Table Setting & Clean Cutlery"
    ]
  }
];

export default function Prices() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const docRef = doc(db, 'content', 'packages');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && Array.isArray(docSnap.data().items)) {
          setPackages(docSnap.data().items);
        } else {
          setPackages(fallbackPackages);
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'content', 'packages'), { items: packages });
      toast.success('Packages updated successfully!');
    } catch (err) {
      toast.error('Error saving packages: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const openAddModal = () => {
    setEditForm({
      id: "pkg-" + Date.now(),
      tag: "New Tag",
      name: "New Package",
      price: 0,
      period: "Starting",
      isFeatured: false,
      features: ["Feature 1", "Feature 2"]
    });
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const openEditModal = (index) => {
    setEditForm(JSON.parse(JSON.stringify(packages[index])));
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = async (index) => {
    if(window.confirm("Are you sure you want to delete this package?")) {
      const newPkgs = [...packages];
      newPkgs.splice(index, 1);
      setPackages(newPkgs);
      try {
        await setDoc(doc(db, 'content', 'packages'), { items: newPkgs });
        toast.success('Package deleted successfully!');
      } catch (err) {
        toast.error('Error deleting package: ' + err.message);
      }
    }
  };

  const handleModalSave = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const newPkgs = [...packages];
      newPkgs[editingIndex] = editForm;
      setPackages(newPkgs);
    } else {
      setPackages([...packages, editForm]);
    }
    setIsModalOpen(false);
  };

  const addFeature = () => {
    setEditForm({ ...editForm, features: [...editForm.features, "New Feature"] });
  };

  const updateFeature = (fIndex, val) => {
    const newFeatures = [...editForm.features];
    newFeatures[fIndex] = val;
    setEditForm({ ...editForm, features: newFeatures });
  };

  const removeFeature = (fIndex) => {
    const newFeatures = [...editForm.features];
    newFeatures.splice(fIndex, 1);
    setEditForm({ ...editForm, features: newFeatures });
  };

  if (loading) return <LoadingSpinner message="Loading packages..." />;

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN').format(val);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <PageHeader title="Packages & Pricing" subtitle="Manage pricing menus and features" />
        <div className="flex gap-3">
          <Button variant="outline" onClick={openAddModal} icon={Plus}>Add Package</Button>
          <Button onClick={handleSaveAll} icon={Save} disabled={saving}>
            {saving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {packages.map((pkg, index) => (
          <div key={pkg.id || index} className="bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-card)] relative overflow-hidden group">
            {pkg.isFeatured && (
              <div className="absolute top-0 right-0 px-3 py-1 bg-accent text-white text-xs font-bold rounded-bl-lg">Featured</div>
            )}
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">{pkg.tag}</span>
                <h3 className="text-xl font-bold text-text-primary mt-1">{pkg.name}</h3>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEditModal(index)} className="p-2 text-text-muted hover:text-info bg-bg-surface-hover rounded-md transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(index)} className="p-2 text-text-muted hover:text-error bg-bg-surface-hover rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="mb-4">
              <span className="text-2xl font-bold text-text-primary">₹{formatCurrency(pkg.price)}</span>
              <span className="text-sm text-text-muted ml-2">{pkg.period}</span>
            </div>

            <ul className="space-y-2 mb-4">
              {pkg.features.map((f, i) => (
                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span> {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-border-subtle">
              <h2 className="text-xl font-bold text-text-primary">{editingIndex !== null ? 'Edit Package' : 'New Package'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleModalSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Tag (e.g. Most Popular)</label>
                  <input type="text" required value={editForm.tag} onChange={e => setEditForm({...editForm, tag: e.target.value})} className="w-full bg-bg-input border border-border-subtle rounded-md px-3 py-2 text-text-primary focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Package Name</label>
                  <input type="text" required value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-bg-input border border-border-subtle rounded-md px-3 py-2 text-text-primary focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Price (₹)</label>
                  <input type="number" required value={editForm.price} onChange={e => setEditForm({...editForm, price: Number(e.target.value)})} className="w-full bg-bg-input border border-border-subtle rounded-md px-3 py-2 text-text-primary focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Period (e.g. Starting / Per Plate)</label>
                  <input type="text" required value={editForm.period} onChange={e => setEditForm({...editForm, period: e.target.value})} className="w-full bg-bg-input border border-border-subtle rounded-md px-3 py-2 text-text-primary focus:outline-none focus:border-accent" />
                </div>
              </div>
              
              <label className="flex items-center gap-2 cursor-pointer mt-2">
                <input type="checkbox" checked={editForm.isFeatured} onChange={e => setEditForm({...editForm, isFeatured: e.target.checked})} className="accent-accent" />
                <span className="text-sm font-medium text-text-primary">Featured Package (Gold Styling)</span>
              </label>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-text-secondary">Features</label>
                  <button type="button" onClick={addFeature} className="text-xs text-accent hover:underline">+ Add Feature</button>
                </div>
                <div className="space-y-2">
                  {editForm.features.map((feat, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={feat} onChange={e => updateFeature(i, e.target.value)} className="flex-1 bg-bg-input border border-border-subtle rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent" />
                      <button type="button" onClick={() => removeFeature(i)} className="p-2 text-text-muted hover:text-error bg-bg-surface-hover rounded-md"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </form>
            
            <div className="p-6 border-t border-border-subtle flex justify-end gap-3 bg-bg-surface-hover/30 rounded-b-[var(--radius-xl)]">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="button" onClick={handleModalSave}>Apply Changes</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
