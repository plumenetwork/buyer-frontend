import type { NextApiResponse } from 'next';

function validateEmail(email: string) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { email } = await req.json();
    if (!email && validateEmail(email)) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const MailchimpKey = process.env.MAILCHIMP_API_KEY;
    const MailchimpServer = process.env.MAILCHIMP_API_SERVER;
    const MailchimpAudience = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!MailchimpKey || !MailchimpServer || !MailchimpAudience) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const customUrl = `https://${MailchimpServer}.api.mailchimp.com/3.0/lists/${MailchimpAudience}/members`;

    const response = await fetch(customUrl, {
      method: 'POST',
      headers: {
        Authorization: `apikey ${MailchimpKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 201,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return res
        .status(response.status)
        .json({ error: error.detail || 'Error subscribing' });
    }
    const received = await response.json();
    return res.json(received);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
