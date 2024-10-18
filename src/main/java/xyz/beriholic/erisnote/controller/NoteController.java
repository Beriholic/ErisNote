package xyz.beriholic.erisnote.controller;

import cn.dev33.satoken.stp.StpUtil;
import lombok.extern.slf4j.Slf4j;
import org.babyfish.jimmer.client.FetchBy;
import org.babyfish.jimmer.sql.fetcher.Fetcher;
import org.springframework.web.bind.annotation.*;
import xyz.beriholic.erisnote.model.entity.Fetchers;
import xyz.beriholic.erisnote.model.entity.Note;
import xyz.beriholic.erisnote.model.entity.dto.NewNoteInput;
import xyz.beriholic.erisnote.model.entity.dto.UpdateNoteInput;
import xyz.beriholic.erisnote.model.except.ErisResult;
import xyz.beriholic.erisnote.repository.NoteRepository;

import java.util.List;

@RestController
@RequestMapping("/note")
@Slf4j(topic = "NoteController")
public class NoteController {
    private static final Fetcher<Note> NOTE_WITH_TITLE = Fetchers.NOTE_FETCHER.title();
    private static final Fetcher<Note> NOTE_DETAIL = Fetchers.NOTE_FETCHER
            .title()
            .content()
            .categories(
                    Fetchers.CATEGORIES_FETCHER.name()
            );
    private final NoteRepository noteRepository;

    public NoteController(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @GetMapping("/list")
    public ErisResult<List<@FetchBy("NOTE_WITH_TITLE") Note>> getNoteList() {
        var uid = StpUtil.getLoginIdAsLong();


        var notes = noteRepository.findNotes(
                null,
                uid,
                null,
                NOTE_WITH_TITLE
        );
        return ErisResult.ok(notes);
    }

    @GetMapping("/detail")
    public ErisResult<@FetchBy("NOTE_DETAIL") Note> getNoteDetail(
            @RequestParam String id
    ) {
        var uid = StpUtil.getLoginIdAsLong();

        var note = noteRepository.findNotes(
                Long.parseLong(id),
                uid,
                null,
                NOTE_DETAIL
        );

        if (note.isEmpty()) {
            var msg = "获取Note信息失败";
            log.error(msg);
            return ErisResult.fail(msg);
        }

        log.info("Note信息: {}", note.get(0));
        return ErisResult.ok(note.get(0));
    }

    @PostMapping("/new")
    public ErisResult<Void> newNote(
            @RequestBody NewNoteInput req
    ) {
        log.info("title: {}, content: {}, categoriesId: {}", req.getTitle(), req.getContent(), req.getCategoriesId());

        var uid = StpUtil.getLoginIdAsLong();

        noteRepository.saveNote(uid, Long.parseLong(req.getCategoriesId()), req.getTitle(), req.getContent());

        return ErisResult.ok();
    }

    @PutMapping("/update")
    public ErisResult<Void> updateNote(
            @RequestBody UpdateNoteInput req
    ) {
        var uid = StpUtil.getLoginIdAsLong();
        log.info("id: {}, title: {}, content: {}, categoriesId: {}", req.getId(), req.getTitle(), req.getContent(), req.getCategoriesId());

        noteRepository.updateNote(
                Long.parseLong(req.getId()),
                uid,
                req.getTitle(),
                req.getContent(),
                Long.parseLong(req.getCategoriesId())
        );

        return ErisResult.ok();
    }

    @DeleteMapping("/delete")
    public ErisResult<Void> deleteNote(@RequestParam String id) {
        var uid = StpUtil.getLoginIdAsLong();

        noteRepository.deleteNote(Long.parseLong(id), uid);

        return ErisResult.ok();
    }
}
