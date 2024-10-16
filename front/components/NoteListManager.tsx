import { api } from "@/api/ApiInstance";
import { NoteDto } from "@/api/gen/model/dto";
import useSideBarOpenState from "@/stores/status/SideBarOpenState";
import { Button, Divider, Icon, TextField } from "actify";
import { useEffect, useState } from "react";
import NoteListCard from "./NoteListCard";

export default function NoteListManager() {
  const openStyle =
    "flex flex-col bg-surface-variant m-4 mr-0 ml-0 rounded-r-2xl p-4 pr-8 h-[calc(100vh-48px)] w-96 transition-all duration-200 ease-in-out delay-200";
  const closeStyle =
    "flex flex-col bg-surface-variant m-4 mr-0 ml-0 rounded-r-2xl  w-0 h-[calc(100vh-48px)] transition-all duration-200 ease-in-out";
  const sideBarOpen = useSideBarOpenState((stats) => stats.open);

  const [noteList, setNoteList] = useState<
    Array<NoteDto["NoteController/NOTE_WITH_TITLE"]>
  >([]);

  const fetchNoteList = async () => {
    const resp = await api.noteController.getNoteList();
    if (resp.code !== 200) {
      alert("获取笔记列表失败");
      console.log(resp.msg);
    }

    setNoteList(
      resp.data.map((note) => ({
        id: note.id,
        title: note.title,
      }))
    );
  };

  useEffect(() => {
    fetchNoteList();
  }, []);

  const [noteQueryCondition, setNoteQueryCondition] = useState("");

  return (
    <div
      className={`${sideBarOpen ? openStyle : closeStyle} overflow-y-scroll`}
    >
      <div
        className={
          sideBarOpen
            ? "transition-all delay-200 opacity-100"
            : "transition-all opacity-0"
        }
      >
        <div className="text-start text-sm mb-4 opacity-50 select-none">
          笔记管理
        </div>
        <div className="flex flex-col items-center gap-4 mb-4">
          <div>
            <TextField
              variant="outlined"
              label="搜索笔记"
              value={noteQueryCondition}
              onChange={(e) => setNoteQueryCondition(e.target.value)}
            >
              <TextField.LeadingIcon>
                <Icon>Search</Icon>
              </TextField.LeadingIcon>
            </TextField>
          </div>

          <Button variant="filled" color="primary">
            新建笔记
          </Button>

          <Divider insetStart insetEnd />
        </div>
        <div
          className={`flex flex-col gap-y-4 transition-all ${
            noteList.length > 0 ? "" : "opacity-0 scale-50 -translate-y-32"
          }`}
        >
          {noteList.map((note) => (
            <NoteListCard key={note.id} note={note} onClick={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
}
