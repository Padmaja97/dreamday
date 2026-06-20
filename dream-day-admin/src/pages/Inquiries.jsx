import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query, doc, deleteDoc } from 'firebase/firestore';
import { Mail, Calendar, Users, Package, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Badge from '../components/Badge';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInquiries() {
      try {
        const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setInquiries(list);
      } catch (err) {
        console.error("Error fetching inquiries:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
      setInquiries(inquiries.filter(inq => inq.id !== id));
    } catch (err) {
      console.error("Error deleting inquiry:", err);
      alert("Failed to delete inquiry.");
    }
  };

  if (loading) return <LoadingSpinner message="Loading inquiries..." />;

  return (
    <div>
      <PageHeader 
        title="Leads & Inquiries" 
        subtitle={`${inquiries.length} total inquiries received`}
      >
        <Badge variant="gold">{inquiries.length} Total</Badge>
      </PageHeader>

      <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] overflow-hidden animate-slide-up">
        {inquiries.length === 0 ? (
          <EmptyState
            icon={Mail}
            title="No inquiries yet"
            description="When clients submit inquiries through your website, they will appear here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-bg-surface-hover border-b border-border-subtle">
                  <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Date
                    </span>
                  </th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    <span className="inline-flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5" />
                      Event Type
                    </span>
                  </th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq, index) => (
                  <tr 
                    key={inq.id} 
                    className="border-b border-border-subtle/50 hover:bg-bg-surface-hover/50 transition-colors duration-150"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-text-primary">{inq.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-text-secondary">{inq.phone || '—'}</div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{inq.date || '—'}</td>
                    <td className="px-6 py-4">
                      {inq.eventType ? <Badge variant="gold">{inq.eventType}</Badge> : '—'}
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{inq.location || '—'}</td>
                    <td className="px-6 py-4 text-text-secondary">
                      <div className="max-w-[200px] truncate" title={inq.message}>{inq.message || '—'}</div>
                    </td>
                    <td className="px-6 py-4 text-text-muted text-xs">
                      {inq.createdAt?.toDate 
                        ? inq.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : '—'
                      }
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(inq.id)}
                        className="p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-full transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
