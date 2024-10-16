import Sidebar from "@/components/Sidebar";

export default function HomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row h-screen">
      <div>
        <Sidebar />
      </div>
      <div>
        <main>{children}</main>
      </div>
    </div>
  );
}
