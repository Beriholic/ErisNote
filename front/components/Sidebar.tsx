"use client";
import useSideBarOptionState from "@/stores/status/SideBarOptionState";
import useDarkModeState from "@/stores/status/DarkModeState";
import useSideBarOpenState from "@/stores/status/SideBarOpenState";
import { Icon, IconButton } from "actify";
import { useTheme } from "next-themes";

export default function Sidebar() {
  const sideBarOption = useSideBarOptionState((stats) => stats.option);
  const sideBarOptionChange = useSideBarOptionState((stats) => stats.change);

  const darkMode = useDarkModeState((stats) => stats.enable);
  const darkModeToggle = useDarkModeState((stats) => stats.toggle);

  const sideBarOpen = useSideBarOpenState((stats) => stats.open);
  const sideBarOpenToggle = useSideBarOpenState((stats) => stats.toggle);

  const { setTheme } = useTheme();

  const themeToggle = () => {
    if (darkMode) {
      setTheme("light");
    } else {
      setTheme("dark");
    }

    darkModeToggle();
  };

  const openStyle =
    "flex flex-col gap-8 p-2 bg-surface-variant w-14 m-4 mb-0 mr-0 items-center h-[calc(100lvh-48px)] rounded-l-2xl";
  const closeStyle =
    "flex flex-col gap-8 p-2 bg-surface-variant w-14 m-4 mb-0 mr-2 rounded-2xl items-center h-[calc(100lvh-48px)]";

  return (
    <div className="relative">
      <div className={sideBarOpen ? openStyle : closeStyle}>
        <div>
          <IconButton onClick={sideBarOpenToggle}>
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
        <div className="absolute bottom-4">
          <IconButton
            className={darkMode ? "" : "bg-background"}
            onClick={themeToggle}
          >
            <Icon>Dark_Mode</Icon>
          </IconButton>
        </div>
      </div>
    </div>
  );
}
