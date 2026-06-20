import { initializeApp, cert } from 'firebase-admin/app';
import { getSecurityRules } from 'firebase-admin/security-rules';
import { readFile } from 'fs/promises';

const serviceAccount = JSON.parse(await readFile(new URL('./dream-day-events-sw-firebase-adminsdk-fbsvc-3a98558d69.json', import.meta.url)));

initializeApp({
  credential: cert(serviceAccount)
});

const firestoreRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /inquiries/{inquiryId} {
      allow create: if true;
    }
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
`;

const storageRules = `
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
`;

async function updateRules() {
  try {
    await getSecurityRules().releaseFirestoreRulesetFromSource(firestoreRules);
    console.log("Successfully updated Firestore rules!");

    await getSecurityRules().releaseStorageRulesetFromSource(storageRules, "dream-day-events-sw.firebasestorage.app");
    console.log("Successfully updated Storage rules!");
  } catch (error) {
    console.error("Error updating rules:", error);
  }
}

updateRules();
