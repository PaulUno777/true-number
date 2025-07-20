import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken');

  if (token) {
    redirect(`/${locale}/dashboard`);
  } else {
    redirect(`/${locale}/auth`);
  }
}