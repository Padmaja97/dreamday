import { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { Trash2, Upload, Edit2, X, Check, Video, Plus, Play } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Badge from '../components/Badge';
import FormField, { Input, Select } from '../components/FormField';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { useToast } from '../hooks/useToast';

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [posterFile, setPosterFile] = useState(null);
  
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [badge, setBadge] = useState('Highlight');
  const [showUpload, setShowUpload] = useState(false);
  const toast = useToast();
  
  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', desc: '', badge: '' });

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    try {
      const docRef = doc(db, 'content', 'videos');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().videos && docSnap.data().videos.length >= 12) {
        setVideos(docSnap.data().videos);
      } else {
        // Fallback default videos (force seed if less than 12)
        const defaultVideos = [
          { id: 1, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-1.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-3.jpg?v=9', badge: 'Wedding Teaser', title: 'Wedding Entrance Highlights', desc: 'Cinematic look at a luxury wedding entry setup with gold pillars and red flower arches.' },
          { id: 2, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-2.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9', badge: 'Stage Walkthrough', title: 'Grand Reception Decor Reel', desc: 'Walkthrough showing the detailed lighting, chandeliers, and setup of a royal stage.' },
          { id: 3, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-3.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-5.jpg?v=9', badge: 'Haldi Highlight', title: 'Vibrant Haldi Ceremony Clip', desc: 'Fun compilation clip of our signature marigold haldi setups and props.' },
          { id: 4, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-4.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-4.jpg?v=9', badge: 'Catering Setup', title: 'Catering Buffet Setup Video', desc: 'Professional walkthrough of our premium gourmet multi-cuisine food spread and vessels.' },
          { id: 5, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-5.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-21.jpg?v=9', badge: 'Floral Close-up', title: 'Bespoke Floral Work Highlights', desc: 'Detailed close-up on the handcrafted fresh floral decorations and flower frames.' },
          { id: 6, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-6.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-3.jpg?v=9', badge: 'Lawn Tour', title: 'Lawn Celebration Tour', desc: 'Drone-style walkthrough of a royal outdoor wedding lawn setup with light pillars.' },
          { id: 7, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-7.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-2.jpg?v=9', badge: 'Entrance Setup', title: 'Bride & Groom Entrance Setup', desc: 'A summary clip showing guest entry pathway lighting and structural decorations.' },
          { id: 8, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-8.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-8.jpg?v=9', badge: 'Swing Decor', title: 'Traditional Marigold Swing Tour', desc: 'Beautiful wooden swing setup for the haldi ceremony in action with marigolds.' },
          { id: 9, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-9.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-21.jpg?v=9', badge: 'Stage Timelapse', title: 'Banquet Stage Decoration', desc: 'Grand wedding decoration setup timelapse coordinated by Mr. Ayush Kale.' },
          { id: 10, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-10.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-7.jpg?v=9', badge: 'Haldi Reels', title: 'Haldi Ceremony Highlights', desc: 'Fun clips showing traditional music, yellow fabrics, and decor setups.' },
          { id: 11, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-11.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-22.jpg?v=9', badge: 'Haldi Highlight', title: 'Haldi Ceremony of Eram', desc: "A beautiful cinematic reel of Eram's vibrant Haldi celebration, featuring bright pink drapes and marigolds." },
          { id: 12, src: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/video-12.mp4', poster: 'https://storage.googleapis.com/dream-day-events-sw.firebasestorage.app/images/event-9.jpg?v=9', badge: 'Mandap cinematic', title: 'Saffron Mandap Cinematic', desc: 'Bespoke saffron wedding mandap floral arrangements and candle decor highlights.' }
        ];
        await setDoc(docRef, { videos: defaultVideos });
        setVideos(defaultVideos);
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    try {
      // 1. Upload Video File
      const videoStorageRef = ref(storage, `videos/${Date.now()}_${file.name}`);
      const videoUploadTask = uploadBytesResumable(videoStorageRef, file);
      
      videoUploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      });

      await videoUploadTask;
      const videoUrl = await getDownloadURL(videoUploadTask.snapshot.ref);

      // 2. Upload Poster File (if any)
      let posterUrl = '';
      let posterPath = '';
      if (posterFile) {
        const posterStorageRef = ref(storage, `videos/posters/${Date.now()}_${posterFile.name}`);
        const posterUploadTask = uploadBytesResumable(posterStorageRef, posterFile);
        await posterUploadTask;
        posterUrl = await getDownloadURL(posterUploadTask.snapshot.ref);
        posterPath = posterUploadTask.snapshot.ref.fullPath;
      }

      const newVideo = {
        id: Date.now(),
        src: videoUrl,
        poster: posterUrl,
        title: title || 'New Video',
        desc: desc || '',
        badge: badge || 'Highlight',
        filename: file.name,
        path: videoUploadTask.snapshot.ref.fullPath,
        posterPath: posterPath,
        createdAt: new Date().toISOString()
      };

      const docRef = doc(db, 'content', 'videos');
      const docSnap = await getDoc(docRef);
      let currentVideos = [];
      if (docSnap.exists()) {
        currentVideos = docSnap.data().videos || [];
      }
      
      const updatedVideos = [...currentVideos, newVideo];
      await setDoc(docRef, { videos: updatedVideos });

      setFile(null);
      setPosterFile(null);
      setTitle('');
      setDesc('');
      setBadge('Highlight');
      setShowUpload(false);
      toast.success('Video uploaded successfully!');
      fetchVideos();
    } catch (err) {
      console.error("Upload error:", err);
      toast.error('Failed to upload video.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (vid) => {
    if (!confirm('Are you sure you want to delete this video?')) return;
    try {
      // Delete video file
      if (vid.path) {
        const fileRef = ref(storage, vid.path);
        await deleteObject(fileRef).catch(() => console.log('Video file not found or could not be deleted.'));
      }
      // Delete poster file
      if (vid.posterPath) {
         const posterRef = ref(storage, vid.posterPath);
         await deleteObject(posterRef).catch(() => console.log('Poster file not found or could not be deleted.'));
      }
      
      const updatedVideos = videos.filter(v => v.id !== vid.id);
      await setDoc(doc(db, 'content', 'videos'), { videos: updatedVideos });
      setVideos(updatedVideos);
      toast.success('Video deleted successfully.');
    } catch (err) {
      console.error("Delete error:", err);
      toast.error('Failed to delete video.');
    }
  };

  const handleEdit = (vid) => {
    setEditingId(vid.id);
    setEditData({ title: vid.title || '', desc: vid.desc || '', badge: vid.badge || '' });
  };

  const handleSaveEdit = async (vidId) => {
    try {
      const updatedVideos = videos.map(vid => {
        if (vid.id === vidId) {
          return { ...vid, title: editData.title, desc: editData.desc, badge: editData.badge };
        }
        return vid;
      });
      await setDoc(doc(db, 'content', 'videos'), { videos: updatedVideos });
      setVideos(updatedVideos);
      setEditingId(null);
      toast.success('Video updated successfully.');
    } catch (err) {
      console.error("Edit error:", err);
      toast.error('Failed to update video.');
    }
  };

  if (loading) return <LoadingSpinner message="Loading videos..." />;

  return (
    <div>
      <PageHeader title="Video Highlights" subtitle={`${videos.length} videos in your portfolio`}>
        <Button icon={Plus} onClick={() => setShowUpload(!showUpload)}>
          Upload Video
        </Button>
      </PageHeader>

      {/* Upload Section */}
      {showUpload && (
        <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-6 mb-6 animate-slide-up">
          <h3 className="text-base font-semibold text-text-primary mb-4">Upload New Video</h3>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Select Video (MP4 recommended)">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full text-sm text-text-secondary file:mr-3 file:py-2 file:px-4 file:rounded-[var(--radius-md)] file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-bg-base hover:file:bg-accent-hover file:cursor-pointer file:transition-colors"
                  required
                />
              </FormField>
              <FormField label="Poster Image (Optional thumbnail)">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPosterFile(e.target.files[0])}
                  className="w-full text-sm text-text-secondary file:mr-3 file:py-2 file:px-4 file:rounded-[var(--radius-md)] file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-bg-base hover:file:bg-accent-hover file:cursor-pointer file:transition-colors"
                />
              </FormField>
              <FormField label="Title">
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Wedding Entrance Highlights"
                />
              </FormField>
              <FormField label="Badge / Category">
                <Input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. Wedding Teaser"
                />
              </FormField>
            </div>
            <FormField label="Description">
                <Input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="A brief cinematic look..."
                />
            </FormField>
            
            {/* Upload progress */}
            {uploading && (
              <div className="w-full bg-bg-input rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <Button variant="ghost" type="button" onClick={() => setShowUpload(false)}>Cancel</Button>
              <Button type="submit" icon={Upload} disabled={uploading || !file}>
                {uploading ? `Uploading ${Math.round(uploadProgress)}%` : 'Upload'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Video Grid */}
      {videos.length === 0 ? (
        <EmptyState
          icon={Video}
          title="No videos found"
          description="Upload your first video to get started."
          actionLabel="Upload Video"
          onAction={() => setShowUpload(true)}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {videos.map(vid => (
            <div key={vid.id} className="group bg-bg-surface border border-border-subtle rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-card)] hover:border-border-default hover:shadow-[var(--shadow-md)] transition-all duration-250 flex flex-col">
              {/* Video Player/Preview */}
              <div className="aspect-video w-full bg-bg-input relative overflow-hidden">
                <video 
                  src={vid.src} 
                  poster={vid.poster}
                  controls
                  className="w-full h-full object-cover"
                />
                
                {/* Hover overlay actions */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <button
                    onClick={() => handleEdit(vid)}
                    className="w-8 h-8 bg-bg-surface/90 backdrop-blur-sm border border-border-subtle rounded-full flex items-center justify-center text-info hover:bg-info-subtle hover:text-info hover:border-info/30 transition-colors cursor-pointer shadow-sm"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(vid)}
                    className="w-8 h-8 bg-bg-surface/90 backdrop-blur-sm border border-border-subtle rounded-full flex items-center justify-center text-error hover:bg-error-subtle hover:text-error hover:border-error/30 transition-colors cursor-pointer shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                {/* Badge Overlay */}
                <div className="absolute top-2 left-2 z-10">
                   <Badge variant="warning" className="bg-bg-surface/90 backdrop-blur-sm border-0">{vid.badge || 'Highlight'}</Badge>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex-grow flex flex-col">
                {editingId === vid.id ? (
                  <div className="space-y-3 flex-grow">
                    <Input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      placeholder="Title"
                    />
                    <Input
                      type="text"
                      value={editData.desc}
                      onChange={(e) => setEditData({ ...editData, desc: e.target.value })}
                      placeholder="Description"
                    />
                     <div className="flex gap-2">
                        <Input
                          type="text"
                          value={editData.badge}
                          onChange={(e) => setEditData({ ...editData, badge: e.target.value })}
                          placeholder="Badge"
                        />
                        <button onClick={() => handleSaveEdit(vid.id)} className="w-9 h-9 shrink-0 flex items-center justify-center rounded-[var(--radius-md)] bg-success-subtle text-success hover:bg-success/20 transition-colors cursor-pointer">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditingId(null)} className="w-9 h-9 shrink-0 flex items-center justify-center rounded-[var(--radius-md)] bg-error-subtle text-error hover:bg-error/20 transition-colors cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col">
                    <p className="text-base font-semibold text-text-primary truncate mb-1" title={vid.title}>{vid.title || 'Untitled Video'}</p>
                    <p className="text-sm text-text-secondary line-clamp-2" title={vid.desc}>{vid.desc || 'No description provided.'}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
