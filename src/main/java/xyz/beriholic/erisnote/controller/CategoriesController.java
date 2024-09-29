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

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoriesController {
    private static final Fetcher<Categories> CATEGORIES_BASE = Fetchers.CATEGORIES_FETCHER.allScalarFields();
    private final CategoriesRepository categoriesRepository;

    public CategoriesController(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
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
    public ErisResult<List<Note>> getCategoriesNotes(@PathVariable String id) {
        return null;
    }

    @PostMapping("/new")
    public ErisResult<Void> newCategories(@RequestParam String name) {
        return null;
    }

    @PostMapping("/delete")
    public ErisResult<Void> deleteCategories(@RequestParam Long id) {
        return null;
    }
}
