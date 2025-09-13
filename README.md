# Qbrain Team Website - Complete Setup Guide

A modern, dynamic team website built with React, TypeScript, and Firebase, featuring a comprehensive admin panel, blog system, projects showcase, donation platform, and serverless email functionality.

## 🚀 Features

- **Dynamic Content Management**: Admin panel to manage team members, hackathons, achievements, blogs, and projects
- **Serverless Email System**: Hostinger SMTP-powered email sending via Vercel serverless functions
- **Blog System**: Advanced blog editor with SEO optimization and rich text editing
- **Projects Showcase**: Complete project management with detailed pages and SEO
- **Donation Platform**: UPI QR code generation and PayPal integration for team support
- **Achievement Gallery**: Showcase team achievements with image galleries
- **UI Customizer**: Dynamic theme customization from admin panel
- **SEO Optimization**: Dynamic sitemap generation and comprehensive SEO management
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern Tech Stack**: React 18, TypeScript, Tailwind CSS, Firebase, Vercel

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Firebase account
- A Vercel account
- A Hostinger email account for SMTP
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

# SMTP Configuration (Hostinger)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=no-reply@qbrain.in
SMTP_PASS=your_hostinger_email_password
ADMIN_EMAIL=nkalam.ind@gmail.com
```

### 4. Hostinger Email Setup

1. Purchase a domain and hosting from Hostinger
2. Set up email account: no-reply@yourdomain.com
3. Get SMTP credentials from Hostinger control panel
4. Update environment variables with your credentials

### 5. Local Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🚀 Deployment to Vercel

### 1. Prepare for Deployment

Ensure your project structure includes:
- `api/send-email.js` (serverless function)
- `api/sitemap.js` (dynamic sitemap generation)
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

- **Dashboard**: Overview of all content with real-time statistics
- **Team Members**: Add/edit team member profiles with images
- **Hackathons**: Manage hackathon entries with results
- **Achievements**: Create achievement galleries with multiple images
- **Projects**: Full project management with detailed content editor
- **Blogs**: Advanced blog editor with SEO optimization
- **Applications**: Review team applications with quiz results
- **Messages**: View contact form submissions
- **Donations**: Manage donation goals, UPI/PayPal settings
- **UI Customizer**: Customize website theme, colors, and typography
- **SEO Manager**: Global SEO settings and analytics integration
- **Sitemap Manager**: Dynamic sitemap generation and management
- **Welcome Settings**: Audio welcome messages and click sounds

## 📝 Content Management

### Blog System Features

- Advanced rich text editor with extended formatting options
- SEO optimization (meta titles, descriptions, keywords)
- Tag and category management
- Featured images with automatic optimization
- Draft/published status with scheduling
- Reading time calculation
- URL slug generation
- Social media integration

### Project Management

- Comprehensive project editor with rich content
- Project status tracking (upcoming, ongoing, completed, paused)
- Technology stack documentation
- Team member attribution
- GitHub and live demo links
- Featured project highlighting
- SEO optimization for each project
- Image galleries and documentation

### Achievement Gallery

- Multiple image uploads per achievement
- Category-based organization (hackathon, competition, award, etc.)
- Team member attribution
- Technology tags
- Prize/recognition details
- Date and location tracking
- SEO-friendly URLs

### Donation Platform

- UPI QR code generation with animations
- PayPal integration for international donations
- Donation goal tracking with progress bars
- Customizable donation amounts
- Thank you message customization
- Real-time goal progress updates

### UI Customization

- Color scheme customization with live preview
- Typography settings (font family, sizes, weights)
- Layout and spacing controls
- Component styling options
- Preset themes
- Real-time preview

## 🔒 Security Configuration

### Firebase Security Rules

Update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to public collections
    match /{collection}/{document} {
      allow read: if collection in ['teamMembers', 'hackathons', 'achievements', 'blogs', 'projects'];
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

### Sitemap Testing

Test dynamic sitemap generation:

```bash
curl https://your-domain.com/api/sitemap
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
- Modify typography settings (fonts, sizes, weights)
- Create custom color presets
- Preview changes in real-time
- Apply changes globally across the site

### Adding New Features

1. Create new components in `src/components/`
2. Add Firebase service functions in `src/services/firebaseService.ts`
3. Create admin management components in `src/admin/components/`
4. Update the admin dashboard navigation
5. Add routes in `src/AppRouter.tsx`

## 🐛 Troubleshooting

### Common Issues

1. **Email sending fails**
   - Check Hostinger SMTP credentials
   - Verify environment variables in Vercel
   - Check serverless function logs
   - Ensure SMTP settings are correct

2. **Firebase connection errors**
   - Verify Firebase config in environment variables
   - Check Firebase project settings
   - Ensure Firestore and Storage are enabled

3. **Admin panel access issues**
   - Check Firebase Authentication setup
   - Verify admin user exists in Firebase Console
   - Clear browser cache and cookies

4. **Sitemap not generating**
   - Check Firebase permissions
   - Verify API route is working
   - Check Vercel function logs

5. **Build failures**
   - Check for TypeScript errors
   - Verify all dependencies are installed
   - Check environment variables

### Performance Optimization

- Images are automatically optimized by Firebase Storage
- Code splitting is handled by Vite
- CSS is purged in production builds
- Lazy loading is implemented for components
- Dynamic sitemap generation reduces server load

## 📊 Analytics & Monitoring

### Firebase Analytics

Enable Firebase Analytics to track:
- Page views and user engagement
- Content performance
- Admin panel usage
- Donation conversion rates

### Vercel Analytics

Enable Vercel Analytics for:
- Performance monitoring
- Error tracking
- User behavior insights
- Function execution metrics

### SEO Monitoring

- Google Search Console integration
- Automatic sitemap submission
- Meta tag optimization
- Structured data implementation

## 🔄 Updates & Maintenance

### Regular Maintenance Tasks

1. **Weekly**
   - Review contact messages and applications
   - Update blog content and projects
   - Check website performance
   - Monitor donation goals progress

2. **Monthly**
   - Update dependencies
   - Review Firebase usage
   - Backup important data
   - Update project statuses

3. **Quarterly**
   - Security audit
   - Performance optimization
   - Feature updates
   - SEO analysis

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest
```

## 🆕 New Features Added

### Projects Management
- Complete project lifecycle management
- Rich content editor for project details
- Status tracking (upcoming, ongoing, completed, paused)
- Technology stack documentation
- Team member attribution
- GitHub and live demo integration
- SEO optimization

### Donation Platform
- UPI QR code generation with beautiful animations
- PayPal integration for international supporters
- Donation goal tracking with visual progress
- Customizable amounts and goals
- Admin panel management
- Thank you message customization

### Enhanced Admin Panel
- Real-time statistics dashboard
- Advanced blog editor with extended formatting
- Project management system
- Donation settings management
- Improved UI customizer with typography controls
- SEO manager with analytics integration

### Dynamic Sitemap
- Automatic generation including all content types
- Real-time updates when content changes
- SEO-friendly URL structure
- Admin panel management interface

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
- Vercel for seamless deployment and serverless functions
- Tailwind CSS for the utility-first styling approach
- Hostinger for reliable email services
- All contributors and team members

---

**Built with ❤️ by Team Qbrain**

For the latest updates and documentation, visit our [GitHub repository](https://github.com/qbrain-team/website).

## 🔧 Technical Architecture

### Frontend
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive design
- **Framer Motion** for smooth animations
- **React Router** for client-side routing
- **React Hook Form** for form management

### Backend
- **Firebase Firestore** for real-time database
- **Firebase Storage** for file uploads
- **Firebase Authentication** for admin access
- **Vercel Serverless Functions** for email handling

### Email System
- **Hostinger SMTP** for reliable email delivery
- **Nodemailer** for email composition
- **Auto-reply system** for user confirmation
- **Admin notifications** for all submissions

### SEO & Performance
- **Dynamic sitemap generation** with real-time updates
- **Meta tag optimization** for all pages
- **Structured data** for rich snippets
- **Image optimization** and lazy loading
- **Code splitting** for faster load times

### Security
- **Input sanitization** and validation
- **Rate limiting** for form submissions
- **CSRF protection** for admin actions
- **Secure headers** via Vercel configuration
- **Firebase security rules** for data protection