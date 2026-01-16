import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getContainer } from '../../utils/cosmos';
import { config } from '../../config';
import { EmailClient } from '@azure/communication-email';

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function contactSubmit(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    const body = await request.json() as ContactRequest;
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return {
        status: 400,
        jsonBody: { error: 'All fields are required' }
      };
    }

    // Save to Cosmos DB
    const container = await getContainer(config.cosmosDb.containers.contacts);
    const contactId = `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const newContact = {
      id: contactId,
      name,
      email,
      subject,
      message,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    await container.items.create(newContact);

    // Send email notification (if configured)
    if (config.email.connectionString) {
      try {
        const emailClient = new EmailClient(config.email.connectionString);
        
        await emailClient.beginSend({
          senderAddress: config.email.senderAddress,
          content: {
            subject: `New Contact Form: ${subject}`,
            plainText: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            `
          },
          recipients: {
            to: [{ address: 'info@mackprojekt.com' }]
          }
        });
      } catch (emailError) {
        context.warn('Email send failed:', emailError);
        // Continue even if email fails
      }
    }

    return {
      status: 201,
      jsonBody: {
        success: true,
        message: 'Thank you for reaching out! We\'ll get back to you soon.',
        id: contactId
      }
    };
  } catch (error) {
    context.error('Contact submission error:', error);
    return {
      status: 500,
      jsonBody: { error: 'Failed to submit contact form' }
    };
  }
}

app.http('contact', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'contact',
  handler: contactSubmit
});
