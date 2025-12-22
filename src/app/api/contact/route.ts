import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required').min(10, 'Message must be at least 10 characters'),
});

/**
 * POST handler for contact form submissions
 * Validates the request data and processes the contact form
 * 
 * @param request - Next.js request object containing the contact form data
 * @returns JSON response with success message or error details
 * 
 * @example
 * // Request body:
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "subject": "Question about services",
 *   "message": "I would like to know more about your therapy services."
 * }
 * 
 * // Success response:
 * {
 *   "success": true,
 *   "message": "Your message has been received. We will get back to you soon!"
 * }
 * 
 * // Error response:
 * {
 *   "error": "Validation failed",
 *   "details": { "email": ["Invalid email address"] }
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request data
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validationResult.data;

    // TODO: Integrate with email service (e.g., SendGrid, Nodemailer, etc.)
    // For now, we'll just log the data and return success
    console.log('Contact form submission:', {
      name,
      email,
      subject: subject || 'No subject',
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: Store in database if needed
    // await db.contacts.create({ name, email, subject, message });

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. We will get back to you soon!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: 'Invalid request format',
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        error: 'An internal error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}

/**
 * GET handler - returns method not allowed
 * The contact endpoint only accepts POST requests
 * 
 * @returns JSON response with 405 Method Not Allowed status
 */
export async function GET() {
  return NextResponse.json(
    {
      error: 'Method not allowed',
    },
    { status: 405 }
  );
}
