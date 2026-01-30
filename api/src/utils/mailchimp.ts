import client from '@mailchimp/mailchimp_marketing';
import { config } from '../config/index.js';

// Configure Mailchimp
if (config.mailchimp.apiKey && config.mailchimp.serverPrefix) {
  client.setConfig({
    apiKey: config.mailchimp.apiKey,
    server: config.mailchimp.serverPrefix
  });
}

export interface MailchimpSubscriber {
  email: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
}

/**
 * Subscribe a user to Mailchimp audience
 */
export async function subscribeToMailchimp(
  subscriber: MailchimpSubscriber
): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    if (!config.mailchimp.apiKey || !config.mailchimp.audienceId) {
      throw new Error('Mailchimp configuration missing');
    }

    // Hash email for member ID
    const crypto = await import('crypto');
    const memberHash = crypto
      .createHash('md5')
      .update(subscriber.email.toLowerCase())
      .digest('hex');

    const response = await client.lists.setListMember(
      config.mailchimp.audienceId,
      memberHash,
      {
        email_address: subscriber.email,
        status_if_new: 'pending',
        status: 'subscribed',
        merge_fields: {
          FNAME: subscriber.firstName || '',
          LNAME: subscriber.lastName || ''
        },
        tags: subscriber.tags || []
      }
    );

    return {
      success: true,
      message: `Successfully subscribed ${subscriber.email}`,
      id: response.id
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Failed to subscribe to Mailchimp';
    
    console.error('Mailchimp subscription error:', error);
    
    return {
      success: false,
      message: errorMessage
    };
  }
}

/**
 * Send Mailchimp campaign or automation
 */
export async function sendWelcomeEmail(email: string, firstName?: string): Promise<boolean> {
  try {
    if (!config.mailchimp.apiKey || !config.mailchimp.audienceId) {
      console.warn('Mailchimp not configured');
      return false;
    }

    // Add tags to trigger automation workflow
    await subscribeToMailchimp({
      email,
      firstName,
      tags: ['welcome-email', 'waitlist-2026']
    });

    return true;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return false;
  }
}

/**
 * Get subscriber info
 */
export async function getSubscriberInfo(email: string) {
  try {
    if (!config.mailchimp.apiKey || !config.mailchimp.audienceId) {
      throw new Error('Mailchimp configuration missing');
    }

    const crypto = await import('crypto');
    const memberHash = crypto
      .createHash('md5')
      .update(email.toLowerCase())
      .digest('hex');

    const response = await client.lists.getListMember(
      config.mailchimp.audienceId,
      memberHash
    );

    return response;
  } catch (error) {
    console.error('Failed to get subscriber info:', error);
    return null;
  }
}

export default client;
