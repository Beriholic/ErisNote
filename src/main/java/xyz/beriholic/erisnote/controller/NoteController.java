package xyz.beriholic.erisnote.controller;

import cn.dev33.satoken.stp.StpUtil;
import lombok.extern.slf4j.Slf4j;
import org.babyfish.jimmer.client.FetchBy;
import org.babyfish.jimmer.sql.fetcher.Fetcher;
import org.springframework.web.bind.annotation.*;
import xyz.beriholic.erisnote.model.dto.NewNoteRequest;
import xyz.beriholic.erisnote.model.entity.Fetchers;
import xyz.beriholic.erisnote.model.entity.Note;
import xyz.beriholic.erisnote.model.except.ErisResult;
import xyz.beriholic.erisnote.repository.NoteRepository;

import java.util.List;

@RestController
@RequestMapping("/note")
@Slf4j(topic = "NoteController")
public class NoteController {
    private static final Fetcher<Note> NOTE_WITH_TITLE = Fetchers.NOTE_FETCHER.title();
    private static final Fetcher<Note> NOTE_DETAIL = Fetchers.NOTE_FETCHER
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
            @RequestBody NewNoteRequest dto
    ) {
        log.info("title: {}, content: {}, categoriesId: {}", dto.getTitle(), dto.getContent(), dto.getCategoriesId());

        var uid = StpUtil.getLoginIdAsLong();

        noteRepository.saveNote(uid, Long.parseLong(dto.getCategoriesId()), dto.getTitle(), dto.getContent());

        return ErisResult.ok();
    }

    @GetMapping("/update")
    public ErisResult<Void> updateNote(
            @RequestParam Long id,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String content,
            @RequestParam(required = false) Long categoriesId
    ) {
        var uid = StpUtil.getLoginIdAsLong();

        noteRepository.updateNote(
                id,
                uid,
                title,
                content,
                categoriesId
        );

        return ErisResult.ok();
    }

    @GetMapping("/delete")
    public ErisResult<Void> deleteNote(@RequestParam String id) {
        var uid = StpUtil.getLoginIdAsLong();

        noteRepository.deleteNote(Long.parseLong(id), uid);

        return ErisResult.ok();
    }
}
