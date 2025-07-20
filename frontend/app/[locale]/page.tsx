import { redirect } from 'next/navigation';

export default function LocalePage() {
  // Redirect to dashboard when accessing the locale root
  redirect('/dashboard');
}