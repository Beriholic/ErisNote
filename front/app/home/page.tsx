"use client";
import HomePageLayout from "./layout";
import NoteListManager from "@/components/NoteListManager";
export default function HomePage() {
  return (
    <HomePageLayout>
      <div>
        <NoteListManager />
      </div>
    </HomePageLayout>
  );
}
