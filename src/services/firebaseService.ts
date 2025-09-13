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
  Timestamp,
  getDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase.js';
import { v4 as uuidv4 } from 'uuid';

// Security: Input validation and sanitization
const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

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
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
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
      const docRef = doc(db, 'settings', 'welcome');
      await updateDoc(docRef, {
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
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
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
      const docRef = doc(db, 'settings', 'seo');
      await updateDoc(docRef, {
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
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
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
      const docRef = doc(db, 'settings', 'joinTeam');
      await updateDoc(docRef, {
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
    // Sanitize inputs
    const sanitizedData = {
      ...memberData,
      name: sanitizeInput(memberData.name),
      role: sanitizeInput(memberData.role),
      description: sanitizeInput(memberData.description),
      email: memberData.email ? sanitizeInput(memberData.email) : ''
    };
    
    // Validate email if provided
    if (sanitizedData.email && !validateEmail(sanitizedData.email)) {
      return { success: false, error: 'Invalid email format' };
    }
    
    let imageUrl = '';
    
    if (imageFile) {
      const imageRef = ref(storage, `team-members/${uuidv4()}-${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = await addDoc(collection(db, 'teamMembers'), {
      ...sanitizedData,
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
    // Sanitize personal info
    if (applicationData.personalInfo) {
      applicationData.personalInfo = {
        ...applicationData.personalInfo,
        fullName: sanitizeInput(applicationData.personalInfo.fullName || ''),
        email: sanitizeInput(applicationData.personalInfo.email || ''),
        phone: sanitizeInput(applicationData.personalInfo.phone || ''),
        college: sanitizeInput(applicationData.personalInfo.college || ''),
        branch: sanitizeInput(applicationData.personalInfo.branch || ''),
        motivation: sanitizeInput(applicationData.personalInfo.motivation || ''),
        experience: sanitizeInput(applicationData.personalInfo.experience || '')
      };
      
      // Validate email
      if (!validateEmail(applicationData.personalInfo.email)) {
        return { success: false, error: 'Invalid email format' };
      }
    }
    
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
    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(messageData.name),
      email: sanitizeInput(messageData.email),
      subject: sanitizeInput(messageData.subject),
      message: sanitizeInput(messageData.message)
    };
    
    // Validate required fields
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.message) {
      return { success: false, error: 'Missing required fields' };
    }
    
    // Validate email
    if (!validateEmail(sanitizedData.email)) {
      return { success: false, error: 'Invalid email format' };
    }
    
    const docRef = await addDoc(collection(db, 'contactMessages'), {
      ...sanitizedData,
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
    // Generate slug if not provided
    const slug = achievementData.slug || createSlug(achievementData.title);
    
    let images: string[] = [];
    let featuredImage = '';
    
    if (imageFiles && imageFiles.length > 0) {
      for (const file of imageFiles) {
        const imageRef = ref(storage, `achievements/${uuidv4()}-${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(snapshot.ref);
        images.push(imageUrl);
      }
      // First image becomes featured image
      featuredImage = images[0];
    }

    const docRef = await addDoc(collection(db, 'achievements'), {
      ...achievementData,
      slug,
      images,
      featuredImage,
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
    
    // Generate slug if title changed and no slug provided
    if (achievementData.title && !achievementData.slug) {
      updateData.slug = createSlug(achievementData.title);
    }
    
    if (imageFiles && imageFiles.length > 0) {
      let images: string[] = [];
      for (const file of imageFiles) {
        const imageRef = ref(storage, `achievements/${uuidv4()}-${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(snapshot.ref);
        images.push(imageUrl);
      }
      updateData.images = images;
      updateData.featuredImage = images[0];
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
export const getAchievementById = async (idOrSlug: string) => {
  try {
    // First try to find by slug
    let q = query(collection(db, 'achievements'), where('slug', '==', idOrSlug));
    let querySnapshot = await getDocs(q);
    
    // If not found by slug, try by ID
    if (querySnapshot.empty) {
      try {
        const docRef = doc(db, 'achievements', idOrSlug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const achievement = {
            id: docSnap.id,
            ...docSnap.data()
          };
          return { success: true, data: achievement };
        }
      } catch (error) {
        console.error('Error fetching by ID:', error);
      }
    } else {
      const achievement = {
        id: querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data()
      };
      return { success: true, data: achievement };
    }
    
    return { success: false, error: 'Achievement not found' };
  } catch (error) {
    console.error('Error fetching achievement by ID:', error);
    return { success: false, error };
  }
};

// Donation Settings
export const getDonationSettings = async () => {
  try {
    const docRef = doc(db, 'settings', 'donations');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return { success: true, data };
    }
    return { success: true, data: null };
  } catch (error) {
    console.error('Error fetching donation settings:', error);
    return { success: false, error };
  }
};

export const updateDonationSettings = async (settings: any) => {
  try {
    const docRef = doc(db, 'settings', 'donations');
    await updateDoc(docRef, {
      ...settings,
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    try {
      const docRef = doc(db, 'settings', 'donations');
      await updateDoc(docRef, {
        ...settings,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return { success: true };
    } catch (createError) {
      console.error('Error updating donation settings:', createError);
      return { success: false, error: createError };
    }
  }
};

// Projects
export const addProject = async (projectData: any, imageFiles?: File[]) => {
  try {
    // Generate slug if not provided
    const slug = projectData.slug || createSlug(projectData.title);
    
    let images: string[] = [];
    let featuredImage = '';
    
    if (imageFiles && imageFiles.length > 0) {
      for (const file of imageFiles) {
        const imageRef = ref(storage, `projects/${uuidv4()}-${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(snapshot.ref);
        images.push(imageUrl);
      }
      featuredImage = images[0];
    }

    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      slug,
      images,
      featuredImage,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding project:', error);
    return { success: false, error };
  }
};

export const getProjects = async () => {
  try {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: projects };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { success: false, error };
  }
};

export const getProjectBySlug = async (slug: string) => {
  try {
    const q = query(collection(db, 'projects'), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { success: false, error: 'Project not found' };
    }
    
    const project = {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data()
    };
    
    return { success: true, data: project };
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return { success: false, error };
  }
};

export const updateProject = async (id: string, projectData: any, imageFiles?: File[]) => {
  try {
    let updateData = { ...projectData, updatedAt: Timestamp.now() };
    
    if (projectData.title && !projectData.slug) {
      updateData.slug = createSlug(projectData.title);
    }
    
    if (imageFiles && imageFiles.length > 0) {
      let images: string[] = [];
      for (const file of imageFiles) {
        const imageRef = ref(storage, `projects/${uuidv4()}-${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(snapshot.ref);
        images.push(imageUrl);
      }
      updateData.images = images;
      updateData.featuredImage = images[0];
    }

    await updateDoc(doc(db, 'projects', id), updateData);
    return { success: true };
  } catch (error) {
    console.error('Error updating project:', error);
    return { success: false, error };
  }
};

export const deleteProject = async (id: string, images?: string[]) => {
  try {
    if (images && images.length > 0) {
      for (const imageUrl of images) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }
    }
    
    await deleteDoc(doc(db, 'projects', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, error };
  }
};

// UI Settings
export const getUISettings = async () => {
  try {
    const docRef = doc(db, 'settings', 'ui');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
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
      const docRef = doc(db, 'settings', 'ui');
      await updateDoc(docRef, {
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