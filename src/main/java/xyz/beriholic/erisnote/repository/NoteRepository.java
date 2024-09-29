package xyz.beriholic.erisnote.repository;

import cn.hutool.core.util.IdUtil;
import org.babyfish.jimmer.sql.JSqlClient;
import org.babyfish.jimmer.sql.ast.mutation.SaveMode;
import org.babyfish.jimmer.sql.fetcher.Fetcher;
import org.jetbrains.annotations.Nullable;
import org.springframework.stereotype.Repository;
import xyz.beriholic.erisnote.model.entity.Note;
import xyz.beriholic.erisnote.model.entity.NoteDraft;
import xyz.beriholic.erisnote.model.entity.NoteTable;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class NoteRepository {
    private final NoteTable NOTE_TABLE = NoteTable.$;
    private final JSqlClient sqlClient;

    public NoteRepository(JSqlClient sqlClient) {
        this.sqlClient = sqlClient;
    }

    public List<Note> findNotes(
            @Nullable Long noteId,
            long uid,
            Fetcher<Note> fetcher
    ) {
        var dbNotes = sqlClient.createQuery(NOTE_TABLE)
                .where(NOTE_TABLE.user().id().eq(uid))
                .where(NOTE_TABLE.id().eqIf(noteId))
                .select(NOTE_TABLE.fetch(fetcher))
                .execute();

        if (noteId == null || !dbNotes.isEmpty()) return dbNotes;

        return null;
    }

    public void saveNote(
            long uid,
            long categoriesId,
            String title,
            String content

    ) {
        long id = IdUtil.getSnowflakeNextId();


        sqlClient.getEntities()
                .saveCommand(
                        NoteDraft.$.produce(draft -> {
                            draft.setId(id);
                            draft.setUserId(uid);
                            draft.setCategoriesId(categoriesId);
                            draft.setTitle(title);
                            draft.setContent(content);
                            draft.setCreatedAt(LocalDateTime.now());
                            draft.setUpdatedAt(LocalDateTime.now());
                        })
                ).setMode(SaveMode.INSERT_ONLY)
                .execute();

    }

    public void updateNote(
            long id,
            long uid,
            @Nullable String title,
            @Nullable String content,
            @Nullable Long categoriesId
    ) {
        var sql = sqlClient.createUpdate(NOTE_TABLE)
                .where(NOTE_TABLE.user().id().eq(uid))
                .where(NOTE_TABLE.id().eq(id));

        if (title != null) {
            sql.set(NOTE_TABLE.title(), title);
        }

        if (content != null) {
            sql.set(NOTE_TABLE.content(), content);
        }

        if (categoriesId != null) {
            sql.set(NOTE_TABLE.categoriesId(), categoriesId);
        }

        sql.execute();
    }

    public void deleteNote(long noteId, Long uid) {
        sqlClient.createDelete(NOTE_TABLE)
                .where(NOTE_TABLE.id().eq(noteId))
                .where(NOTE_TABLE.user().id().eq(uid))
                .execute();

    }
}

