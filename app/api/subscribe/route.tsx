import { NextResponse } from 'next/server';

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !validateEmail(email)) {
      return NextResponse.json({
        status: 400,
        title: 'Invalid Email Address',
        description:
          'Please provide a valid email address. e.g. "user@example.com".',
      });
    }

    const MailchimpKey = process.env.MAILCHIMP_API_KEY;
    const MailchimpServer = process.env.MAILCHIMP_API_SERVER;
    const MailchimpAudience = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!MailchimpKey || !MailchimpServer || !MailchimpAudience) {
      return NextResponse.json({
        status: 500,
        title: 'Internal Server Error',
        description:
          'We encountered an unexpected issue on our end. Please try again later or contact support if the problem persists.',
      });
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
        status: 'subscribed',
      }),
    });
    const received = await response.json();

    if (received.title === 'Member Exists') {
      received.description = 'You are an existing member';
    }
    return NextResponse.json(received);
  } catch (e) {
    return NextResponse.json({
      status: 500,
      title: 'Internal Server Error',
      description:
        'We encountered an unexpected issue on our end. Please try again later or contact support if the problem persists.',
    });
  }
}
