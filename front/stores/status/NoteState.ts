import { create } from "zustand";

export enum NoteStatusEnum {
  WAIT,
  SEND,
  RECEIVCED,
  LOADING,
}

interface NoteStatus {
  id: string;
  title: string;
  categoryId: string;
  status: NoteStatusEnum;
  newNote: ({
    title,
    categoryId,
  }: {
    title: string;
    categoryId: string;
  }) => void;
  loadNote: ({ id }: { id: string }) => void;
  onReceive: () => void;
  onWait: () => void;
}

export const useNoteState = create<NoteStatus>((set) => ({
  id: "",
  title: "",
  categoryId: "",
  content: "",
  status: NoteStatusEnum.WAIT,
  newNote: ({ title, categoryId }) =>
    set(() => ({
      title,
      categoryId,
      status: NoteStatusEnum.SEND,
    })),
  loadNote: ({ id }) =>
    set(() => ({
      id,
      status: NoteStatusEnum.LOADING,
    })),
  onReceive: () => set(() => ({ status: NoteStatusEnum.RECEIVCED })),
  onWait: () =>
    set(() => ({
      id: "",
      title: "",
      categoryId: "",
      content: "",
      status: NoteStatusEnum.WAIT,
    })),
}));
