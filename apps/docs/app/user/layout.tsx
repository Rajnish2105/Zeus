import { UserSocket } from '@/components/userSocket';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  return <UserSocket>{children}</UserSocket>;
}
