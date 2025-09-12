import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

// Helper function to create SEO-friendly slug
// Helper function to create SEO-friendly slug
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Welcome Settings
export const getWelcomeSettings = async () => {
  try {
    const docRef = doc(db, 'settings', 'welcome');
    const docSnap = await getDocs(query(collection(db, 'settings'), where('__name__', '==', 'welcome')));
    
    if (!docSnap.empty) {
      const data = docSnap.docs[0].data();
      return { success: true, data };
    }
    return { success: true, data: null };
  } catch (error) {
    console.error('Error fetching welcome settings:', error);
    return { success: false, error };
  }
};

export const updateWelcomeSettings = async (settings: any, audioFile?: File) => {
  try {
    let updateData = { ...settings };
    
    if (audioFile) {
      const audioRef = ref(storage, `audio/click-sound-${uuidv4()}.mp3`);
      const snapshot = await uploadBytes(audioRef, audioFile);
      updateData.clickSoundUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = doc(db, 'settings', 'welcome');
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    try {
      await addDoc(collection(db, 'settings'), {
        ...settings,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return { success: true };
    } catch (createError) {
      console.error('Error updating welcome settings:', createError);
      return { success: false, error: createError };
    }
  }
};

// SEO Settings
export const getSEOSettings = async () => {
  try {
    const docRef = doc(db, 'settings', 'seo');
    const docSnap = await getDocs(query(collection(db, 'settings'), where('__name__', '==', 'seo')));
    
    if (!docSnap.empty) {
      const data = docSnap.docs[0].data();
      return { success: true, data };
    }
    return { success: true, data: null };
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return { success: false, error };
  }
};

export const updateSEOSettings = async (settings: any) => {
  try {
    const docRef = doc(db, 'settings', 'seo');
    await updateDoc(docRef, {
      ...settings,
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    try {
      await addDoc(collection(db, 'settings'), {
        ...settings,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return { success: true };
    } catch (createError) {
      console.error('Error updating SEO settings:', createError);
      return { success: false, error: createError };
    }
  }
};

// Join Team Settings
export const getJoinTeamSettings = async () => {
  try {
    const docRef = doc(db, 'settings', 'joinTeam');
    const docSnap = await getDocs(query(collection(db, 'settings'), where('__name__', '==', 'joinTeam')));
    
    if (!docSnap.empty) {
      const data = docSnap.docs[0].data();
      return { success: true, data };
    }
    return { success: true, data: null };
  } catch (error) {
    console.error('Error fetching join team settings:', error);
    return { success: false, error };
  }
};

export const updateJoinTeamSettings = async (settings: any) => {
  try {
    const docRef = doc(db, 'settings', 'joinTeam');
    await updateDoc(docRef, {
      ...settings,
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    try {
      await addDoc(collection(db, 'settings'), {
        ...settings,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return { success: true };
    } catch (createError) {
      console.error('Error updating join team settings:', createError);
      return { success: false, error: createError };
    }
  }
};

// Team Members
export const addTeamMember = async (memberData: any, imageFile?: File) => {
  try {
    let imageUrl = '';
    
    if (imageFile) {
      const imageRef = ref(storage, `team-members/${uuidv4()}-${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = await addDoc(collection(db, 'teamMembers'), {
      ...memberData,
      imageUrl,
      createdAt: Timestamp.now()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding team member:', error);
    return { success: false, error };
  }
};

export const getTeamMembers = async () => {
  try {
    const q = query(collection(db, 'teamMembers'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const members = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: members };
  } catch (error) {
    console.error('Error fetching team members:', error);
    return { success: false, error };
  }
};

export const updateTeamMember = async (id: string, memberData: any, imageFile?: File) => {
  try {
    let updateData = { ...memberData };
    
    if (imageFile) {
      const imageRef = ref(storage, `team-members/${uuidv4()}-${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      updateData.imageUrl = await getDownloadURL(snapshot.ref);
    }

    await updateDoc(doc(db, 'teamMembers', id), updateData);
    return { success: true };
  } catch (error) {
    console.error('Error updating team member:', error);
    return { success: false, error };
  }
};

export const deleteTeamMember = async (id: string, imageUrl?: string) => {
  try {
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
    
    await deleteDoc(doc(db, 'teamMembers', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting team member:', error);
    return { success: false, error };
  }
};

// Hackathons
export const addHackathon = async (hackathonData: any, imageFile?: File) => {
  try {
    let imageUrl = '';
    
    if (imageFile) {
      const imageRef = ref(storage, `hackathons/${uuidv4()}-${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = await addDoc(collection(db, 'hackathons'), {
      ...hackathonData,
      imageUrl,
      createdAt: Timestamp.now()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding hackathon:', error);
    return { success: false, error };
  }
};

export const getHackathons = async () => {
  try {
    const q = query(collection(db, 'hackathons'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const hackathons = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: hackathons };
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    return { success: false, error };
  }
};

export const updateHackathon = async (id: string, hackathonData: any, imageFile?: File) => {
  try {
    let updateData = { ...hackathonData };
    
    if (imageFile) {
      const imageRef = ref(storage, `hackathons/${uuidv4()}-${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      updateData.imageUrl = await getDownloadURL(snapshot.ref);
    }

    await updateDoc(doc(db, 'hackathons', id), updateData);
    return { success: true };
  } catch (error) {
    console.error('Error updating hackathon:', error);
    return { success: false, error };
  }
};

export const deleteHackathon = async (id: string, imageUrl?: string) => {
  try {
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
    
    await deleteDoc(doc(db, 'hackathons', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting hackathon:', error);
    return { success: false, error };
  }
};

// Applications
export const saveApplication = async (applicationData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'applications'), {
      ...applicationData,
      status: 'pending',
      createdAt: Timestamp.now()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving application:', error);
    return { success: false, error };
  }
};

export const getApplications = async () => {
  try {
    const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const applications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: applications };
  } catch (error) {
    console.error('Error fetching applications:', error);
    return { success: false, error };
  }
};

// Contact Messages
export const saveContactMessage = async (messageData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'contactMessages'), {
      ...messageData,
      status: 'unread',
      createdAt: Timestamp.now()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving contact message:', error);
    return { success: false, error };
  }
};

export const getContactMessages = async () => {
  try {
    const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: messages };
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return { success: false, error };
  }
};

// Blogs
export const addBlog = async (blogData: any, imageFile?: File) => {
  try {
    let featuredImage = '';
    
    if (imageFile) {
      const imageRef = ref(storage, `blogs/${uuidv4()}-${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      featuredImage = await getDownloadURL(snapshot.ref);
    }

    // Generate slug if not provided
    const slug = blogData.slug || createSlug(blogData.title);

    const docRef = await addDoc(collection(db, 'blogs'), {
      ...blogData,
      slug,
      featuredImage,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding blog:', error);
    return { success: false, error };
  }
};

export const getBlogs = async () => {
  try {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const blogs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: blogs };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { success: false, error };
  }
};

export const getBlogBySlug = async (slug: string) => {
  try {
    const q = query(collection(db, 'blogs'), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { success: false, error: 'Blog not found' };
    }
    
    const blog = {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data()
    };
    
    return { success: true, data: blog };
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return { success: false, error };
  }
};

export const updateBlog = async (id: string, blogData: any, imageFile?: File) => {
  try {
    let updateData = { ...blogData, updatedAt: Timestamp.now() };
    
    // Generate slug if title changed and no slug provided
    if (blogData.title && !blogData.slug) {
      updateData.slug = createSlug(blogData.title);
    }
    
    if (imageFile) {
      const imageRef = ref(storage, `blogs/${uuidv4()}-${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      updateData.featuredImage = await getDownloadURL(snapshot.ref);
    }

    await updateDoc(doc(db, 'blogs', id), updateData);
    return { success: true };
  } catch (error) {
    console.error('Error updating blog:', error);
    return { success: false, error };
  }
};

export const deleteBlog = async (id: string, featuredImage?: string) => {
  try {
    if (featuredImage) {
      const imageRef = ref(storage, featuredImage);
      await deleteObject(imageRef);
    }
    
    await deleteDoc(doc(db, 'blogs', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting blog:', error);
    return { success: false, error };
  }
};

// Achievements
export const addAchievement = async (achievementData: any, imageFiles?: File[]) => {
  try {
    let images: string[] = [];
    
    if (imageFiles && imageFiles.length > 0) {
      for (const file of imageFiles) {
        const imageRef = ref(storage, `achievements/${uuidv4()}-${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(snapshot.ref);
        images.push(imageUrl);
      }
    }

    const docRef = await addDoc(collection(db, 'achievements'), {
      ...achievementData,
      images,
      createdAt: Timestamp.now()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding achievement:', error);
    return { success: false, error };
  }
};

export const getAchievements = async () => {
  try {
    const q = query(collection(db, 'achievements'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const achievements = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: achievements };
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return { success: false, error };
  }
};

export const updateAchievement = async (id: string, achievementData: any, imageFiles?: File[]) => {
  try {
    let updateData = { ...achievementData };
    
    if (imageFiles && imageFiles.length > 0) {
      let images: string[] = [];
      for (const file of imageFiles) {
        const imageRef = ref(storage, `achievements/${uuidv4()}-${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(snapshot.ref);
        images.push(imageUrl);
      }
      updateData.images = images;
    }

    await updateDoc(doc(db, 'achievements', id), updateData);
    return { success: true };
  } catch (error) {
    console.error('Error updating achievement:', error);
    return { success: false, error };
  }
};

export const deleteAchievement = async (id: string, images?: string[]) => {
  try {
    if (images && images.length > 0) {
      for (const imageUrl of images) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }
    }
    
    await deleteDoc(doc(db, 'achievements', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting achievement:', error);
    return { success: false, error };
  }
};

// Get Achievement by ID
export const getAchievementById = async (id: string) => {
  try {
    const docRef = doc(db, 'achievements', id);
    const docSnap = await getDocs(query(collection(db, 'achievements'), where('__name__', '==', id)));
    
    if (!docSnap.empty) {
      const achievement = {
        id: docSnap.docs[0].id,
        ...docSnap.docs[0].data()
      };
      return { success: true, data: achievement };
    }
    return { success: false, error: 'Achievement not found' };
  } catch (error) {
    console.error('Error fetching achievement by ID:', error);
    return { success: false, error };
  }
};

// UI Settings
export const getUISettings = async () => {
  try {
    const docRef = doc(db, 'settings', 'ui');
    const docSnap = await getDocs(query(collection(db, 'settings'), where('__name__', '==', 'ui')));
    
    if (!docSnap.empty) {
      const data = docSnap.docs[0].data();
      return { success: true, data };
    }
    return { success: true, data: null };
  } catch (error) {
    console.error('Error fetching UI settings:', error);
    return { success: false, error };
  }
};

export const updateUISettings = async (settings: any) => {
  try {
    const docRef = doc(db, 'settings', 'ui');
    await updateDoc(docRef, {
      ...settings,
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    // If document doesn't exist, create it
    try {
      await addDoc(collection(db, 'settings'), {
        ...settings,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return { success: true };
    } catch (createError) {
      console.error('Error updating UI settings:', createError);
      return { success: false, error: createError };
    }
  }
};