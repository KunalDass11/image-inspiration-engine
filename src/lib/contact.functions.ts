import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }).max(100),
  email: z.string().trim().email({ message: 'Invalid email address' }).max(255),
  message: z.string().trim().min(1, { message: 'Message is required' }).max(2000),
});

export const submitContact = createServerFn({ method: 'POST' })
  .inputValidator((input: { name?: string; email?: string; message?: string }) => {
    const parsed = contactSchema.safeParse(input);
    return parsed.success ? parsed.data : null;
  })
  .handler(async ({ data }) => {
    if (!data) return { ok: false as const, error: 'Please fill in your name, a valid email, and a message.' };
    const key = process.env['SUPABASE_PUBLISHABLE_KEY']!;
    const supabase = createClient(process.env['SUPABASE_URL']!, key, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
      // Opaque sb_ keys are not JWTs; send apikey, not the default Authorization bearer.
      global: { fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith('sb_') && h.get('Authorization') === `Bearer ${key}`) h.delete('Authorization');
        h.set('apikey', key);
        return fetch(input, { ...init, headers: h });
      } },
    });
    const { error } = await supabase
      .from('contact_submissions')
      .insert({ name: data.name, email: data.email, message: data.message });
    if (error) {
      console.error('contact_submission_failed', error.message);
      return { ok: false as const, error: 'Something went wrong. Please try again or email me directly.' };
    }
    return { ok: true as const };
  });

function createClient(...args: Parameters<typeof import('@supabase/supabase-js').createClient>) {
  throw new Error('placeholder');
}
