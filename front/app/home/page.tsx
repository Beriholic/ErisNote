"use client";
import HomePageLayout from "./layout";
import ErisEditor from "@/components/ErisEditor";

export default function HomePage() {
  return (
    <HomePageLayout>
      <div className="flex flex-col bg-surface-variant m-8 mb-0 rounded-2xl p-4 h-[calc(100vh-5rem)] overflow-scroll relative">
        <ErisEditor />
      </div>
    </HomePageLayout>
  );
}
