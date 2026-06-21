import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import fs from 'fs';

const firebaseConfig = {
  apiKey: "AIzaSyAxBx8UcNhYKy6y92wRjYNfIkp4GZadqR4",
  authDomain: "dream-day-events-sw.firebaseapp.com",
  projectId: "dream-day-events-sw",
  storageBucket: "dream-day-events-sw.firebasestorage.app",
  messagingSenderId: "655861218642",
  appId: "1:655861218642:web:8d22404c049619b27b8e8b"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

async function uploadFile(filePath, destName) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const storageRef = ref(storage, destName);
    const snapshot = await uploadBytes(storageRef, fileBuffer, { contentType: 'image/png' });
    const url = await getDownloadURL(snapshot.ref);
    console.log(`Uploaded ${destName}:`, url);
    return url;
  } catch (error) {
    console.error("Error uploading", destName, error);
  }
}

async function run() {
  await signInWithEmailAndPassword(auth, 'admin@gmail.com', 'admin123');
  await uploadFile('./public/images/boy_avatar.png', 'images/boy_avatar.png');
  await uploadFile('./public/images/girl_avatar.png', 'images/girl_avatar.png');
  process.exit(0);
}

run();
