package xyz.beriholic.erisnote.repository;

import cn.hutool.core.util.IdUtil;
import org.babyfish.jimmer.sql.JSqlClient;
import org.babyfish.jimmer.sql.ast.mutation.SaveMode;
import org.babyfish.jimmer.sql.fetcher.Fetcher;
import org.springframework.stereotype.Repository;
import xyz.beriholic.erisnote.model.entity.Categories;
import xyz.beriholic.erisnote.model.entity.CategoriesDraft;
import xyz.beriholic.erisnote.model.entity.CategoriesTable;

import java.util.List;

@Repository
public class CategoriesRepository {

    private final JSqlClient sqlClient;
    private final CategoriesTable CATEGORIES_TABLE = CategoriesTable.$;

    public CategoriesRepository(JSqlClient sqlClient) {
        this.sqlClient = sqlClient;
    }

    public List<Categories> findCategories(
            long uid,
            Fetcher<Categories> fetcher
    ) {
        var defaultCategories = sqlClient.createQuery(CATEGORIES_TABLE)
                .where(CATEGORIES_TABLE.id().eq(uid))
                .select(CATEGORIES_TABLE.fetch(fetcher))
                .execute();


        var categoriesList = sqlClient.createQuery(CATEGORIES_TABLE)
                .where(CATEGORIES_TABLE.user().id().eq(uid))
                .where(CATEGORIES_TABLE.id().ne(uid))
                .select(CATEGORIES_TABLE.fetch(fetcher))
                .execute();


        defaultCategories.addAll(categoriesList);
        return defaultCategories;
    }

    public void newCategories(
            Long uid,
            String name
    ) {
        var id = IdUtil.getSnowflakeNextId();

        sqlClient.getEntities()
                .saveCommand(
                        CategoriesDraft.$.produce(draft -> {
                            draft.setId(id);
                            draft.setUserId(uid);
                            draft.setName(name);
                        })
                ).setMode(SaveMode.INSERT_ONLY)
                .execute();
    }

    public void deleteCategories(
            Long id,
            Long uid
    ) {

        sqlClient.createDelete(CATEGORIES_TABLE)
                .where(CATEGORIES_TABLE.id().ne(uid))
                .where(CATEGORIES_TABLE.id().eq(id))
                .where(CATEGORIES_TABLE.user().id().eq(uid))
                .execute();
    }

}

