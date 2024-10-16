import { Button } from "actify";

export default function NoteListManager() {
  return (
    <div
      className={
        "flex flex-col bg-surface-variant m-4 ml-0 rounded-r-2xl p-4 h-[calc(100vh-48px)] w-48"
      }
    >
      <div className="text-start text-sm mb-4">笔记管理</div>
      <div className="flex flex-col items-center">
        <div>
          <Button>新建笔记</Button>
        </div>
      </div>
    </div>
  );
}
