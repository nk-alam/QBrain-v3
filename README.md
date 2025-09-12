# Qbrain Team Website - Complete Setup Guide

A modern, dynamic team website built with React, TypeScript, and Firebase, featuring a comprehensive admin panel, blog system, and serverless email functionality.

## 🚀 Features

- **Dynamic Content Management**: Admin panel to manage team members, hackathons, achievements, and blogs
- **Serverless Email System**: Nodemailer-powered email sending via Vercel serverless functions
- **Blog System**: Full-featured blog editor with SEO optimization and rich text editing
- **UI Customizer**: Dynamic theme customization from admin panel
- **Achievement Gallery**: Showcase team achievements with image galleries
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern Tech Stack**: React 18, TypeScript, Tailwind CSS, Firebase, Vercel

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Firebase account
- A Vercel account
- A Gmail account for email sending
- Git installed

## 🛠️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd qbrain-website
npm install
```

### 2. Firebase Setup

#### 2.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Name it "qbrain-website"
4. Enable Google Analytics (optional)

#### 2.2 Enable Authentication
1. Go to Authentication > Sign-in method
2. Enable "Email/Password" provider
3. Add your admin email in Users tab

#### 2.3 Setup Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Start in production mode
4. Choose your preferred location

#### 2.4 Setup Storage
1. Go to Storage
2. Click "Get started"
3. Use default security rules

#### 2.5 Get Firebase Config
1. Go to Project Settings > General
2. Scroll to "Your apps" section
3. Click "Web" icon to add web app
4. Register app with name "qbrain-website"
5. Copy the config object values

### 3. Environment Variables Setup

Create a `.env.local` file in your project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Email Configuration (for Vercel serverless functions)
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 4. Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security > App passwords
4. Generate an app password for "Mail"
5. Use this password in `EMAIL_PASS` environment variable

### 5. Local Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🚀 Deployment to Vercel

### 1. Prepare for Deployment

Ensure your project structure includes:
- `api/send-email.js` (serverless function)
- `vercel.json` (configuration file)
- All environment variables set

### 2. Deploy to Vercel

#### Option A: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

#### Option B: GitHub Integration
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 3. Environment Variables in Vercel

1. Go to Project Settings > Environment Variables
2. Add all variables from your `.env.local` file
3. Make sure to add them for Production, Preview, and Development environments

### 4. Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## 🔧 Admin Panel Setup

### 1. Access Admin Panel

Visit `https://your-domain.com/Qadmin` or `http://localhost:5173/Qadmin`

### 2. Create Admin Account

1. Try to login with your email - it will fail but create the user
2. Go to Firebase Console > Authentication
3. Find your email and verify it's created
4. Now you can login successfully

### 3. Admin Features

- **Dashboard**: Overview of all content
- **Team Members**: Add/edit team member profiles
- **Hackathons**: Manage hackathon entries
- **Achievements**: Create achievement galleries with images
- **Blogs**: Full-featured blog editor with SEO
- **Applications**: Review team applications
- **Messages**: View contact form submissions
- **UI Customizer**: Customize website theme and colors

## 📝 Content Management

### Blog System Features

- Rich text editor with formatting options
- SEO optimization (meta titles, descriptions)
- Tag and category management
- Featured images
- Draft/published status
- Reading time calculation
- URL slug generation

### Achievement Gallery

- Multiple image uploads per achievement
- Category-based organization
- Team member attribution
- Technology tags
- Prize/recognition details
- Date and location tracking

### UI Customization

- Color scheme customization
- Layout and spacing controls
- Typography options
- Component styling
- Real-time preview
- Preset themes

## 🔒 Security Configuration

### Firebase Security Rules

Update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to public collections
    match /{collection}/{document} {
      allow read: if collection in ['teamMembers', 'hackathons', 'achievements', 'blogs'];
      allow write: if request.auth != null;
    }
    
    // Restrict admin collections
    match /{collection}/{document} {
      allow read, write: if request.auth != null && collection in ['applications', 'contactMessages', 'settings'];
    }
  }
}
```

Update your Storage rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🧪 Testing

### Local Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Email Testing

Test the serverless email function:

```bash
curl -X POST https://your-domain.com/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "contact",
    "data": {
      "name": "Test User",
      "email": "test@example.com",
      "subject": "Test Subject",
      "message": "Test message"
    }
  }'
```

## 📱 Mobile Responsiveness

The website is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1440px+)

## 🎨 Customization

### Theme Customization

Use the admin panel's UI Customizer to:
- Change primary and secondary colors
- Adjust border radius and spacing
- Modify typography settings
- Create custom color presets
- Preview changes in real-time

### Adding New Features

1. Create new components in `src/components/`
2. Add Firebase service functions in `src/services/firebaseService.ts`
3. Create admin management components in `src/admin/components/`
4. Update the admin dashboard navigation

## 🐛 Troubleshooting

### Common Issues

1. **Email sending fails**
   - Check Gmail app password
   - Verify environment variables in Vercel
   - Check serverless function logs

2. **Firebase connection errors**
   - Verify Firebase config in environment variables
   - Check Firebase project settings
   - Ensure Firestore and Storage are enabled

3. **Admin panel access issues**
   - Check Firebase Authentication setup
   - Verify admin user exists in Firebase Console
   - Clear browser cache and cookies

4. **Build failures**
   - Check for TypeScript errors
   - Verify all dependencies are installed
   - Check environment variables

### Performance Optimization

- Images are automatically optimized by Firebase Storage
- Code splitting is handled by Vite
- CSS is purged in production builds
- Lazy loading is implemented for components

## 📊 Analytics & Monitoring

### Firebase Analytics

Enable Firebase Analytics to track:
- Page views
- User engagement
- Content performance
- Admin panel usage

### Vercel Analytics

Enable Vercel Analytics for:
- Performance monitoring
- Error tracking
- User behavior insights

## 🔄 Updates & Maintenance

### Regular Maintenance Tasks

1. **Weekly**
   - Review contact messages and applications
   - Update blog content
   - Check website performance

2. **Monthly**
   - Update dependencies
   - Review Firebase usage
   - Backup important data

3. **Quarterly**
   - Security audit
   - Performance optimization
   - Feature updates

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest
```

## 📞 Support

For technical support or questions:

- **Email**: team@qbrain.in
- **WhatsApp**: +91 869 5205 637
- **GitHub Issues**: Create an issue in the repository

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🙏 Acknowledgments

- React and Vite teams for the excellent development experience
- Firebase for the robust backend services
- Vercel for seamless deployment
- Tailwind CSS for the utility-first styling approach
- All contributors and team members

---

**Built with ❤️ by Team Qbrain**

For the latest updates and documentation, visit our [GitHub repository](https://github.com/qbrain-team/website).