import '../globals.css';

export default function ParksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>We are in parks directory</div>
      {children}
    </>
  );
}
