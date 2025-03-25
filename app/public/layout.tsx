import { MainNavbar } from '@/interfaces/navigation/MainNavbar';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <MainNavbar />
      {children}
    </div>
  );
}