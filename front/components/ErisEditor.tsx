import { MdEditor } from "md-editor-rt";
import { useState } from "react";
import "md-editor-rt/lib/style.css";
import "./styles/editor.css";
import useDarkModeState from "@/stores/status/DarkModeState";

export default function ErisEditor({
  className,
}: Readonly<{
  className?: string;
}>) {
  const darkMode = useDarkModeState((stats) => stats.enable);
  const [text, setText] = useState("# Hello Editor");
  return (
    <MdEditor
      theme={darkMode ? "dark" : "light"}
      style={{
        height: "100vh",
      }}
      modelValue={text}
      onChange={setText}
      className={`text-on-surface ${className}`}
    />
  );
}
