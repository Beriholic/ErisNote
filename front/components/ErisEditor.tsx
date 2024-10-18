import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import "./styles/editor.css";
import useDarkModeState from "@/stores/status/DarkModeState";

export default function ErisEditor({
  className,
  value,
  onChange,
  onSave,
}: Readonly<{
  className?: string;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
}>) {
  const darkMode = useDarkModeState((stats) => stats.enable);
  return (
    <MdEditor
      theme={darkMode ? "dark" : "light"}
      style={{
        height: "100vh",
      }}
      modelValue={value}
      onChange={(text) => {
        onChange(text);
      }}
      onSave={onSave}
      className={`text-on-surface ${className}`}
    />
  );
}
