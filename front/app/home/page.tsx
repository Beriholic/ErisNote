"use client";
import useSideBarOpenState from "@/stores/status/SideBarOpenState";
import HomePageLayout from "./layout";
import useSideBarOptionState from "@/stores/status/SideBarOptionState";
import NoteListManager from "@/components/NoteListManager";
export default function HomePage() {
  const sideBarOption = useSideBarOptionState((stats) => stats.option);
  const sideBarOpen = useSideBarOpenState((stats) => stats.open);

  return (
    <HomePageLayout>
      <div>
        <div className={`"sidebar ${sideBarOpen ? "sidebar-open" : ""}`}>
          {sideBarOpen && sideBarOption === "note" && <NoteListManager />}
        </div>
      </div>
    </HomePageLayout>
  );
}
