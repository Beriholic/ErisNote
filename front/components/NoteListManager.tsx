import { api } from "@/api/ApiInstance";
import { CategoriesDto, NoteDto } from "@/api/gen/model/dto";
import useSideBarOpenState from "@/stores/status/SideBarOpenState";
import { Button, Divider, Icon, List, ListItem, TextField } from "actify";
import { useEffect, useState } from "react";
import NoteListCard from "./NoteListCard";
import { motion } from "framer-motion";
import { NoteStatusEnum, useNoteState } from "@/stores/status/NoteState";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";
import "@/components/styles/context-menu.css";

const NoteListContextMenuId = "NoteList";

export default function NoteListManager() {
  const openStyle =
    "flex flex-col bg-surface-variant m-4 mr-0 ml-0 rounded-r-2xl p-4 pr-8 h-[calc(100vh-48px)] w-96 transition-all duration-200 ease-in-out delay-200";
  const closeStyle =
    "flex flex-col bg-surface-variant m-4 mr-0 ml-0 rounded-r-2xl  w-0 h-[calc(100vh-48px)] transition-all duration-200 ease-in-out";
  const sideBarOpen = useSideBarOpenState((stats) => stats.open);

  const [noteList, setNoteList] = useState<
    Array<NoteDto["NoteController/NOTE_WITH_TITLE"]>
  >([]);

  const [categoryList, setCategoryList] = useState<
    Array<CategoriesDto["CategoriesController/CATEGORIES_BASE"]>
  >([]);

  const { show: showNoteListContextMenu } = useContextMenu({
    id: NoteListContextMenuId,
  });

  const [contextMenuNoteId, setContextMenuNoteId] = useState("");

  const displayNoteListContextMenu = (e: React.MouseEvent, id: string) => {
    showNoteListContextMenu({
      event: e,
    });
    setContextMenuNoteId(id);
  };

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

  const fetchCategoriyList = async () => {
    const resp = await api.categoriesController.getCategories();
    if (resp.code !== 200) {
      alert("获取分类列表失败");
      console.log(resp.msg);
    }

    setCategoryList(
      resp.data.map((cate) => ({
        id: cate.id,
        name: cate.name,
      }))
    );
  };

  const newNote = useNoteState((stats) => stats.newNote);
  const noteStatus = useNoteState((stats) => stats.status);
  const noteStatusOnWait = useNoteState((stats) => stats.onWait);

  const NewNote = ({
    title,
    categoryId,
  }: {
    title: string;
    categoryId: string;
  }) => {
    if (title === "" || categoryId === "") {
      alert("标题和分类不能为空");
      return;
    }
    setNewNoteDialogOpen(false);

    newNote({ title, categoryId });
  };

  const DeleteNote = async () => {
    if (contextMenuNoteId === "") return;
    const resp = await api.noteController.deleteNote({
      id: contextMenuNoteId,
    });
    if (resp.code !== 200) {
      alert("删除笔记失败");
      console.log(resp.msg);
    }

    fetchNoteList();
    setContextMenuNoteId("");
  };
  useEffect(() => {
    if (noteStatus === NoteStatusEnum.WAIT) {
      fetchNoteList();
      noteStatusOnWait();
    }
    fetchNoteList();
    fetchCategoriyList();
  }, [noteStatus, noteStatusOnWait]);

  const [noteQueryCondition, setNoteQueryCondition] = useState("");

  const [newNoteDialogOpen, setNewNoteDialogOpen] = useState(false);

  const loadNote = useNoteState((stats) => stats.loadNote);

  return (
    <>
      {newNoteDialogOpen && (
        <NewNoteDialog
          newNote={({ title, categoryId }) => {
            NewNote({ title, categoryId });
          }}
          categoryList={categoryList}
          onCloseDialog={() => {
            setNewNoteDialogOpen(false);
          }}
        />
      )}
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

            <Button
              variant="filled"
              color="primary"
              onClick={() => {
                setNewNoteDialogOpen(true);
              }}
            >
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
              <div
                key={note.id}
                onContextMenu={(e) => displayNoteListContextMenu(e, note.id)}
              >
                <NoteListCard
                  note={note}
                  onClick={() => {
                    loadNote({ id: note.id });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <Menu id={NoteListContextMenuId}>
          <Item onClick={DeleteNote}>删除</Item>
        </Menu>
      </div>
    </>
  );
}

function NewNoteDialog({
  categoryList,
  onCloseDialog,
  newNote,
}: {
  categoryList: Array<CategoriesDto["CategoriesController/CATEGORIES_BASE"]>;
  onCloseDialog: () => void;
  newNote: ({
    title,
    categoryId,
  }: {
    title: string;
    categoryId: string;
  }) => void;
}) {
  const [isClose, setIsClsoe] = useState(false);

  const [title, setTitle] = useState("");

  const [curCategory, setCurCategory] =
    useState<CategoriesDto["CategoriesController/CATEGORIES_BASE"]>();

  const [openCategoryList, setOpenCategoryList] = useState(false);
  const openCategoryListToggle = () => {
    setOpenCategoryList(!openCategoryList);
  };

  const selectCategory = (
    cate: CategoriesDto["CategoriesController/CATEGORIES_BASE"]
  ) => {
    setCurCategory(cate);
    setOpenCategoryList(false);
  };

  const onClose = () => {
    setIsClsoe(true);

    setTimeout(() => {
      onCloseDialog();
    }, 200);
  };
  return (
    <motion.div
      className="flex fixed z-20  flex-col  bg-surface border-gray-600 shadow-xl border-2 rounded-2xl  left-[40%] top-1/4 max-h-[calc[100vh-20%]] overflow-scroll"
      initial={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: isClose ? 0 : 1,
        scale: isClose ? 0.5 : 1,
        transition: {
          duration: 0.25,
          ease: "easeInOut",
        },
      }}
    >
      <div className="pt-20 pl-4 pr-4 pb-4">
        <div className="text-xl m-4 fixed left-0 top-0 opacity-60">
          新建笔记
        </div>

        <div>
          <div className="text-sm opacity-60">标题</div>
          <TextField
            variant="outlined"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="text-sm opacity-60">分类</div>
          <TextField
            variant="outlined"
            readOnly={true}
            onClick={openCategoryListToggle}
            value={curCategory?.name}
          />
          <div className="max-h-48 overflow-scroll">
            <CategoryList
              isOpen={openCategoryList}
              categoryList={categoryList}
              onSelect={(cate) => {
                selectCategory(cate);
              }}
            />
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-x-4 mt-4">
          <Button
            onClick={() => {
              newNote({
                title: title,
                categoryId: curCategory ? curCategory.id : "",
              });
            }}
            className="w-24"
          >
            新建
          </Button>
          <Button onClick={onClose} className="w-24">
            取消
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryList({
  isOpen,
  categoryList,
  onSelect,
}: {
  isOpen: boolean;
  categoryList: Array<CategoriesDto["CategoriesController/CATEGORIES_BASE"]>;
  onSelect: (
    cate: CategoriesDto["CategoriesController/CATEGORIES_BASE"]
  ) => void;
}) {
  return (
    isOpen && (
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.25,
            ease: "easeInOut",
          },
        }}
      >
        <List className="bg-surface-variant rounded-2xl p-2 ml-2 mr-2">
          {categoryList.map((cate) => (
            <ListItem
              key={cate.id}
              onClick={() => {
                onSelect(cate);
              }}
            >
              {cate.name}
            </ListItem>
          ))}
        </List>
      </motion.div>
    )
  );
}
