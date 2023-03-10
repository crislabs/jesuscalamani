import Dashboard from "@/ui/Dashboard";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode,
}) {
  return (
    <>
      <Dashboard />
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      
      {children}
    </section>
    </>
  );
}