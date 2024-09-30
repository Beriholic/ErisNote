package xyz.beriholic.erisnote.controller;

import cn.dev33.satoken.stp.StpUtil;
import org.babyfish.jimmer.client.FetchBy;
import org.babyfish.jimmer.sql.fetcher.Fetcher;
import org.springframework.web.bind.annotation.*;
import xyz.beriholic.erisnote.model.entity.Categories;
import xyz.beriholic.erisnote.model.entity.Fetchers;
import xyz.beriholic.erisnote.model.entity.Note;
import xyz.beriholic.erisnote.model.except.ErisResult;
import xyz.beriholic.erisnote.repository.CategoriesRepository;
import xyz.beriholic.erisnote.repository.NoteRepository;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoriesController {
    private static final Fetcher<Categories> CATEGORIES_BASE = Fetchers.CATEGORIES_FETCHER.allScalarFields();
    private static final Fetcher<Note> NOTE_IN_CATEGORIES = Fetchers.NOTE_FETCHER.title();
    private final CategoriesRepository categoriesRepository;
    private final NoteRepository noteRepository;

    public CategoriesController(CategoriesRepository categoriesRepository, NoteRepository noteRepository) {
        this.categoriesRepository = categoriesRepository;
        this.noteRepository = noteRepository;
    }

    @GetMapping("/list")
    public ErisResult<List<@FetchBy("CATEGORIES_BASE") Categories>> getCategories() {
        var uid = StpUtil.getLoginIdAsLong();
        var categories = categoriesRepository.findCategories(
                uid,
                CATEGORIES_BASE
        );
        return ErisResult.ok(categories);
    }

    @GetMapping("{id}")
    public ErisResult<List<@FetchBy("NOTE_IN_CATEGORIES") Note>> getCategoriesNotes(@PathVariable String id) {
        var uid = StpUtil.getLoginIdAsLong();


        var notes = noteRepository.findNotes(
                null,
                uid,
                Long.parseLong(id),
                NOTE_IN_CATEGORIES
        );

        return ErisResult.ok(notes);
    }

    @PostMapping("/new")
    public ErisResult<Void> newCategories(@RequestParam String name) {
        var uid = StpUtil.getLoginIdAsLong();


        categoriesRepository.newCategories(uid, name);


        return ErisResult.ok();
    }

    @PostMapping("/delete")
    public ErisResult<Void> deleteCategories(@RequestParam String id) {
        var uid = StpUtil.getLoginIdAsLong();

        categoriesRepository.deleteCategories(
                Long.parseLong(id),
                uid
        );

        return ErisResult.ok();
    }
}
