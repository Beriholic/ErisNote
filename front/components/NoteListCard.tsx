import { NoteDto } from "@/api/gen/model/dto";

export default function NoteListCard({
  note,
  onClick,
}: Readonly<{
  note: NoteDto["NoteController/NOTE_WITH_TITLE"];
  onClick: () => void;
}>) {
  return (
    <div className="flex bg-surface-bright border-2 border-on-surface rounded-2xl p-4  transition-transform hover:scale-110">
      <div className="text-on-surface">{note.title}</div>
    </div>
  );
}
