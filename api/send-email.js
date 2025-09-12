import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { type, data } = req.body;

  if (!type || !data) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Create transporter with Hostinger SMTP - Using port 465 with SSL as per your provided config
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // Use SSL for port 465
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USER, // Your full Hostinger email (e.g., name@domain.com)
      pass: process.env.EMAIL_PASS  // Your Hostinger email password
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  });

  try {
    // Verify transporter connection
    await transporter.verify();
    console.log('SMTP connection verified');

    switch (type) {
      case 'contact':
        if (!data.name || !data.email || !data.subject || !data.message) {
          throw new Error('Missing contact form fields');
        }
        // Send to admin
        await transporter.sendMail({
          from: `"Qbrain Website" <${process.env.EMAIL_USER}>`,
          to: 'nkalam.ind@gmail.com',
          subject: `New Contact Message: ${data.subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #00D4FF, #39FF14); padding: 20px; text-align: center;">
                <h1 style="color: black; margin: 0;">New Contact Message</h1>
              </div>
              <div style="padding: 20px; background: #f8f9fa;">
                <h2 style="color: #333;">Contact Details</h2>
                <p><strong>From:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Subject:</strong> ${data.subject}</p>
                <h3 style="color: #333;">Message:</h3>
                <div style="background: white; padding: 15px; border-left: 4px solid #00D4FF; margin: 10px 0;">
                  ${data.message.replace(/\n/g, '<br>')}
                </div>
                <hr style="margin: 20px 0;">
                <p style="color: #666; font-size: 12px;">
                  This message was sent from the Qbrain website contact form.
                </p>
              </div>
            </div>
          `
        });

        // Send auto-reply
        await transporter.sendMail({
          from: `"Team Qbrain" <${process.env.EMAIL_USER}>`,
          to: data.email,
          subject: 'Thank you for contacting Qbrain',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #00D4FF, #39FF14); padding: 20px; text-align: center;">
                <h1 style="color: black; margin: 0;">Thank You for Reaching Out!</h1>
              </div>
              <div style="padding: 20px; background: #f8f9fa;">
                <p>Hi ${data.name},</p>
                <p>Thank you for contacting Team Qbrain! We've received your message and will get back to you within 24 hours.</p>
                
                <div style="background: white; padding: 15px; border-left: 4px solid #00D4FF; margin: 20px 0;">
                  <h3 style="margin-top: 0;">Your Message:</h3>
                  <p><strong>Subject:</strong> ${data.subject}</p>
                  <p>${data.message.replace(/\n/g, '<br>')}</p>
                </div>
                
                <p>In the meantime, feel free to:</p>
                <ul>
                  <li>Check out our latest projects and achievements</li>
                  <li>Follow us on social media for updates</li>
                  <li>Join our WhatsApp for quick responses: <a href="https://wa.me/+918695205637">+91 869 5205 637</a></li>
                </ul>
                
                <p>Best regards,<br><strong>Team Qbrain</strong></p>
                <p style="color: #666; font-size: 12px;">
                  Building Tomorrow's Technology Today
                </p>
              </div>
            </div>
          `
        });
        break;

      case 'application':
        if (!data.personalInfo || !data.personalInfo.fullName || !data.personalInfo.email) {
          throw new Error('Missing application form fields');
        }
        // Send to admin
        await transporter.sendMail({
          from: `"Qbrain Website" <${process.env.EMAIL_USER}>`,
          to: 'nkalam.ind@gmail.com',
          subject: `New Team Application - ${data.personalInfo.fullName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #00D4FF, #39FF14); padding: 20px; text-align: center;">
                <h1 style="color: black; margin: 0;">New Team Application</h1>
              </div>
              <div style="padding: 20px; background: #f8f9fa;">
                <h2 style="color: #333;">Applicant Information</h2>
                <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 5px;">
                  <p><strong>Name:</strong> ${data.personalInfo.fullName}</p>
                  <p><strong>Email:</strong> ${data.personalInfo.email}</p>
                  <p><strong>Phone:</strong> ${data.personalInfo.phone || 'N/A'}</p>
                  <p><strong>College:</strong> ${data.personalInfo.college || 'N/A'}</p>
                  <p><strong>Branch:</strong> ${data.personalInfo.branch || 'N/A'}</p>
                  <p><strong>Year:</strong> ${data.personalInfo.year || 'N/A'}</p>
                  <p><strong>Preferred Role:</strong> ${data.personalInfo.preferredRole || 'N/A'}</p>
                </div>
                
                ${data.quizResults ? `
                <h3 style="color: #333;">Quiz Results</h3>
                <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 5px;">
                  <p><strong>Score:</strong> <span style="color: ${data.quizResults.score >= 70 ? 'green' : 'red'}; font-weight: bold;">${data.quizResults.score}%</span></p>
                  <p><strong>Correct Answers:</strong> ${data.quizResults.correctAnswers}/${data.quizResults.totalQuestions}</p>
                  <p><strong>Status:</strong> <span style="color: ${data.quizResults.passed ? 'green' : 'red'}; font-weight: bold;">${data.quizResults.passed ? 'PASSED' : 'FAILED'}</span></p>
                  <p><strong>Time Spent:</strong> ${Math.floor(data.quizResults.timeSpent / 60)} minutes</p>
                </div>
                ` : ''}
                
                ${data.personalInfo.experience ? `
                <h3 style="color: #333;">Experience & Skills</h3>
                <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 5px;">
                  ${data.personalInfo.experience.replace(/\n/g, '<br>')}
                </div>
                ` : ''}
                
                <h3 style="color: #333;">Motivation</h3>
                <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 5px;">
                  ${data.personalInfo.motivation ? data.personalInfo.motivation.replace(/\n/g, '<br>') : 'N/A'}
                </div>
                
                ${data.interviewSlot ? `
                <h3 style="color: #333;">Interview Scheduled</h3>
                <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 5px;">
                  <p><strong>Date:</strong> ${data.interviewSlot.date}</p>
                  <p><strong>Time:</strong> ${data.interviewSlot.time}</p>
                  <p><strong>Mode:</strong> ${data.interviewSlot.mode}</p>
                </div>
                ` : ''}
                
                <hr style="margin: 20px 0;">
                <p style="color: #666; font-size: 12px;">
                  This application was submitted through the Qbrain website.
                </p>
              </div>
            </div>
          `
        });

        // Send confirmation to applicant
        await transporter.sendMail({
          from: `"Team Qbrain" <${process.env.EMAIL_USER}>`,
          to: data.personalInfo.email,
          subject: 'Application Received - Qbrain Team',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #00D4FF, #39FF14); padding: 20px; text-align: center;">
                <h1 style="color: black; margin: 0;">Application Received!</h1>
              </div>
              <div style="padding: 20px; background: #f8f9fa;">
                <p>Hi ${data.personalInfo.fullName},</p>
                <p>Thank you for applying to join the Qbrain team! We've received your application and will review it shortly.</p>
                
                <div style="background: white; padding: 15px; border-left: 4px solid #00D4FF; margin: 20px 0;">
                  <h3 style="margin-top: 0;">Application Summary:</h3>
                  <p><strong>Applied Role:</strong> ${data.personalInfo.preferredRole || 'N/A'}</p>
                  <p><strong>Submission Date:</strong> ${new Date().toLocaleDateString()}</p>
                  ${data.quizResults ? `<p><strong>Quiz Score:</strong> <span style="color: ${data.quizResults.score >= 70 ? 'green' : 'red'}; font-weight: bold;">${data.quizResults.score}%</span></p>` : ''}
                </div>
                
                <h3 style="color: #333;">Next Steps:</h3>
                <ul>
                  <li>✅ Application submitted successfully</li>
                  <li>🔍 We'll review your application and quiz results</li>
                  <li>📞 If selected, we'll contact you for an interview</li>
                  <li>📧 Final selection will be communicated via email</li>
                </ul>
                
                ${data.quizResults && data.quizResults.score < 70 ? `
                <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <p style="margin: 0; color: #856404;"><strong>Note:</strong> Your quiz score is below the minimum requirement (70%). You may retake the quiz after 24 hours or contact us for guidance.</p>
                </div>
                ` : ''}
                
                <p>If you have any questions, feel free to reach out:</p>
                <ul>
                  <li>📧 Email: team@qbrain.in</li>
                  <li>📱 WhatsApp: <a href="https://wa.me/+918695205637">+91 869 5205 637</a></li>
                </ul>
                
                <p>Best regards,<br><strong>Team Qbrain</strong></p>
                <p style="color: #666; font-size: 12px;">
                  Building Tomorrow's Technology Today
                </p>
              </div>
            </div>
          `
        });
        break;

      default:
        return res.status(400).json({ message: 'Invalid email type' });
    }

    return res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send email',
      error: error.message
    });
  }
}