export const sendContactEmail = async (formData: any) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'contact',
        data: formData
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};

export const sendApplicationEmail = async (applicationData: any) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'application',
        data: applicationData
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Application email sending failed:', error);
    return { success: false, error };
  }
};