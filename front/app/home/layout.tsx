import React from "react";
import NoteListManager from "@/components/NoteListManager";
import Sidebar from "@/components/Sidebar";

export default function HomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row h-[calc(100lvh-48px)]  relative">
      <Sidebar />
      <NoteListManager />
      <main className="overflow-scroll w-full">{children}</main>
    </div>
  );
}
