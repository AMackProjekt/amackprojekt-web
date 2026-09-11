'use client';

import { useEffect } from 'react';

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}

export function InteractionAnalytics() {
  useEffect(() => {
    const send = (name: string, parameters: Record<string, string>) => window.gtag?.('event', name, parameters);
    const click = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest('a');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const label = link.textContent?.trim().slice(0, 100) || link.getAttribute('aria-label') || '';
      if (href.startsWith('mailto:')) send('contact_click', { contact_method: 'email', link_text: label });
      else if (href.startsWith('tel:')) send('contact_click', { contact_method: 'phone', link_text: label });
      else if (/\.(pdf|docx?|xlsx?|zip)$/i.test(href)) send('file_download', { file_name: href, link_text: label });
      else if (/^https?:/i.test(href) && new URL(href, location.href).hostname !== location.hostname) send('outbound_click', { link_url: href, link_text: label });
      else send('navigation_click', { link_url: href, link_text: label });
    };
    const submit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement;
      const search = form.querySelector<HTMLInputElement>('input[type="search"], input[name*="search" i], input[name="q"]');
      if (search?.value.trim()) send('search', { search_term: search.value.trim().slice(0, 100) });
      else send('form_submit', { form_name: form.getAttribute('name') || form.id || 'unnamed_form' });
    };
    document.addEventListener('click', click);
    document.addEventListener('submit', submit);
    return () => { document.removeEventListener('click', click); document.removeEventListener('submit', submit); };
  }, []);
  return null;
}
