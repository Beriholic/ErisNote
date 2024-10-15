"use client";
import useSideBarOptionState from "@/stores/status/SideBarOptionStats";
import { Icon, IconButton } from "actify";

export default function Sidebar() {
  const sideBarOption = useSideBarOptionState((stats) => stats.option);
  const sideBarOptionChange = useSideBarOptionState((stats) => stats.change);

  return (
    <div>
      <div className="flex flex-col gap-8 p-2 bg-surface-variant w-14 m-4 mb-0 rounded-2xl items-center h-[calc(100lvh-48px)]">
        <div>
          <IconButton className="border-2xl">
            <Icon className="">Side_Navigation</Icon>
          </IconButton>
        </div>
        <div>
          <IconButton
            onClick={() => sideBarOptionChange("note")}
            className={sideBarOption === "note" ? "bg-background" : ""}
          >
            <Icon>Sticky_Note_2</Icon>
          </IconButton>
          <div className="text-center text-sm">笔记</div>
        </div>
        <div>
          <IconButton
            className={
              sideBarOption === "category"
                ? "bg-background"
                : "" + "flex flex-col items-center"
            }
            onClick={() => sideBarOptionChange("category")}
          >
            <Icon> Category </Icon>
          </IconButton>
          <div className="text-center text-sm">分类</div>
        </div>
      </div>
    </div>
  );
}
