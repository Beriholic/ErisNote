"use client";
import HomePageLayout from "./layout";
import ErisEditor from "@/components/ErisEditor";
import { useEffect, useState } from "react";
import { api } from "@/api/ApiInstance";
import { NoteStatusEnum, useNoteState } from "@/stores/status/NoteState";

interface NoteInfo {
  id: string;
  title: string;
  categoryId: string;
}

export default function HomePage() {
  const newNoteTitle = useNoteState((stats) => stats.title);
  const newNoteCategoryId = useNoteState((stats) => stats.categoryId);

  const noteStatus = useNoteState((stats) => stats.status);
  const noteReceivedStatus = useNoteState((stats) => stats.onReceive);
  const noteOnWait = useNoteState((stats) => stats.onWait);
  const noteId = useNoteState((stats) => stats.id);

  const [noteInfo, setNoteInfo] = useState<NoteInfo>({
    id: "",
    title: "",
    categoryId: "",
  });
  const [noteContent, setNoteContent] = useState("");

  const NewNote = (title: string, categoryId: string) => {
    if (title === "" || categoryId === "") {
      return;
    }

    setNoteInfo({
      id: "",
      title: title,
      categoryId: categoryId,
    });
    setNoteContent(`# ${title}\n`);
  };

  const LoadNote = async (id: string) => {
    const resp = await api.noteController.getNoteDetail({
      id: id,
    });
    if (resp.code !== 200) {
      alert("加载笔记失败");
      console.log(resp.msg);
    }
    setNoteInfo({
      id: resp.data.id,
      title: resp.data.title,
      categoryId: resp.data.categories?.id || "",
    });
    setNoteContent(resp.data.content);
  };

  useEffect(() => {
    if (noteStatus === NoteStatusEnum.SEND) {
      NewNote(newNoteTitle, newNoteCategoryId);
      noteReceivedStatus();
    }
    if (noteStatus === NoteStatusEnum.LOADING && noteId !== "") {
      LoadNote(noteId);
      noteOnWait();
    }
  }, [
    noteStatus,
    noteReceivedStatus,
    newNoteTitle,
    newNoteCategoryId,
    noteId,
    noteOnWait,
  ]);

  const saveNoteContent = async () => {
    const resp = await api.noteController.newNote({
      body: {
        title: noteInfo.title,
        categoriesId: noteInfo.categoryId,
        content: noteContent,
      },
    });
    if (resp.code !== 200) {
      alert("保存失败");
      console.log(resp.msg);
    }

    noteOnWait();
  };

  return (
    <HomePageLayout>
      <div className="flex flex-col bg-surface-variant m-8 mb-0 rounded-2xl p-4 h-[calc(100vh-5rem)] overflow-scroll relative">
        <ErisEditor
          value={noteContent}
          onChange={(text) => setNoteContent(text)}
          onSave={saveNoteContent}
        />
      </div>
    </HomePageLayout>
  );
}
