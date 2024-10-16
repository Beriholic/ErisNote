import useSideBarOpenState from "@/stores/status/SideBarOpenState";
import { Button } from "actify";

export default function NoteListManager() {
  const openStyle =
    "flex flex-col bg-surface-variant m-4 ml-0 rounded-r-2xl p-4 h-[calc(100vh-48px)] w-48 transition-all duration-300 ease-in-out";
  const closeStyle =
    "flex flex-col bg-surface-variant m-4 ml-0 rounded-r-2xl  w-0 h-[calc(100vh-48px)]  transition-all duration-300 ease-in-out";
  const sideBarOpen = useSideBarOpenState((stats) => stats.open);

  return (
    <div className={sideBarOpen ? openStyle : closeStyle}>
      {sideBarOpen && (
        <div>
          <div className="text-start text-sm mb-4">笔记管理</div>
          <div className="flex flex-col items-center">
            <div>
              <Button>新建笔记</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
