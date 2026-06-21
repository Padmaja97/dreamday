import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Phone, Mail, MapPin, Clock, MessageCircle, Map, Globe } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import FormField, { Input, Textarea } from '../components/FormField';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../hooks/useToast';

export default function ContactSettings() {
  const [editForm, setEditForm] = useState({
    phone: '',
    email: '',
    address: '',
    timings: '',
    instagram: '',
    linkedin: '',
    whatsapp: '',
    mapUrl: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fetchContact() {
      try {
        const docRef = doc(db, 'content', 'contact');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && Object.keys(docSnap.data()).length > 0) {
          setEditForm(docSnap.data());
        } else {
          // Fallback to defaults
          setEditForm({
            phone: '+91 84593 98321',
            email: 'Ayushkale0412@gmail.com',
            address: 'Premium Plaza, Suite 402, Dharampeth, Nagpur',
            timings: 'Mon - Sun: 09:00 AM - 09:00 PM',
            instagram: 'https://www.instagram.com/royal_eventanddecor?igsh=MXQ5bDI0NzBkbmhoaQ==',
            linkedin: '#',
            whatsapp: 'https://wa.me/918459398321?text=Hi%20Dream%20Day%20Events%2C%20I%20am%20interested%20in%20your%20services.',
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41709462553!2d78.96288091640625!3d21.161085900000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d06d0bb3e2b!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin'
          });
        }
      } catch (err) {
        console.error("Error fetching contact info:", err);
        toast.error("Failed to load contact settings.");
      } finally {
        setLoading(false);
      }
    }
    fetchContact();
  }, [toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'content', 'contact'), editForm);
      toast.success('Contact information saved successfully!');
    } catch (err) {
      console.error("Save error:", err);
      toast.error('Failed to save contact information.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading contact settings..." />;

  return (
    <div className="space-y-8 pb-12">
      <PageHeader 
        title="Contact & Footer Settings" 
        subtitle="Manage the contact details and social links shown in the website footer"
      />

      <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] overflow-hidden">
        <form onSubmit={handleSave} className="p-6 space-y-8">
          
          {/* General Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 border-b border-border-subtle pb-2">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Phone Number" required>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input name="phone" value={editForm.phone || ''} onChange={handleChange} placeholder="+91 84593 98321" className="pl-10" required />
                </div>
              </FormField>
              
              <FormField label="Email Address" required>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input type="email" name="email" value={editForm.email || ''} onChange={handleChange} placeholder="Ayushkale0412@gmail.com" className="pl-10" required />
                </div>
              </FormField>

              <FormField label="Office Timings" required>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input name="timings" value={editForm.timings || ''} onChange={handleChange} placeholder="Mon - Sun: 09:00 AM - 09:00 PM" className="pl-10" required />
                </div>
              </FormField>
              
              <FormField label="Physical Address" required>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                  <Textarea name="address" value={editForm.address || ''} onChange={handleChange} rows={2} placeholder="Premium Plaza, Suite 402, Dharampeth, Nagpur" className="pl-10" required />
                </div>
              </FormField>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 border-b border-border-subtle pb-2">Social & Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Instagram URL">
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input name="instagram" value={editForm.instagram || ''} onChange={handleChange} placeholder="https://instagram.com/..." className="pl-10" />
                </div>
              </FormField>

              <FormField label="WhatsApp URL">
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input name="whatsapp" value={editForm.whatsapp || ''} onChange={handleChange} placeholder="https://wa.me/..." className="pl-10" />
                </div>
              </FormField>

              <FormField label="LinkedIn URL">
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input name="linkedin" value={editForm.linkedin || ''} onChange={handleChange} placeholder="https://linkedin.com/..." className="pl-10" />
                </div>
              </FormField>
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 border-b border-border-subtle pb-2">Google Maps Embed</h3>
            <FormField label="Map iframe URL">
              <div className="relative">
                <Map className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                <Textarea name="mapUrl" value={editForm.mapUrl || ''} onChange={handleChange} rows={3} placeholder="https://www.google.com/maps/embed?pb=..." className="pl-10" />
              </div>
              <p className="text-xs text-text-muted mt-2">Go to Google Maps &gt; Share &gt; Embed a map &gt; Copy the "src" URL only (inside the quotes).</p>
            </FormField>
          </div>

          {/* Save Button */}
          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={saving} icon={Save}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
