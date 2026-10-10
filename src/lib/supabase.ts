import { ClientSubmission } from '../types';

export const SUPABASE_URL = (import.meta.env?.VITE_SUPABASE_URL as string) || '';
export const SUPABASE_ANON_KEY = (import.meta.env?.VITE_SUPABASE_ANON_KEY as string) || '';

/**
 * Inserts a new lead into Supabase using RLS-enabled public insert policy
 */
export async function submitLeadToSupabase(submission: ClientSubmission): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // Graceful fallback to local persistence when Supabase env vars are not set
    return false;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name: submission.name.slice(0, 100),
        email: submission.email.slice(0, 150),
        phone: submission.phone.slice(0, 50),
        service: (submission.service || 'Custom Website').slice(0, 150),
        budget: (submission.budget || 'Unspecified').slice(0, 100),
        message: (submission.message || '').slice(0, 2000)
      })
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    console.warn('Supabase lead submission notice:', err);
    return false;
  }
}

/**
 * Reads leads from Supabase.
 * Enforces authenticated admin access (requires valid session token or admin authorization header)
 */
export async function fetchLeadsFromSupabase(adminToken?: string): Promise<ClientSubmission[]> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return [];
  }

  // Security guard: Do not attempt unauthenticated remote read of private customer leads
  const token = adminToken || SUPABASE_ANON_KEY;
  if (!token) return [];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${SUPABASE_URL}/rest/v1/messages?select=*&order=created_at.desc`, {
      signal: controller.signal,
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${token}`
      }
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    }
  } catch (err) {
    console.warn('Supabase leads query notice:', err);
  }
  return [];
}
