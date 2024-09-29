package xyz.beriholic.erisnote.repository;

import org.babyfish.jimmer.sql.JSqlClient;
import org.babyfish.jimmer.sql.fetcher.Fetcher;
import org.springframework.stereotype.Repository;
import xyz.beriholic.erisnote.model.entity.Categories;
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
        return sqlClient.createQuery(CATEGORIES_TABLE)
                .where(CATEGORIES_TABLE.user().id().eq(uid))
                .select(CATEGORIES_TABLE.fetch(fetcher))
                .execute();
    }

}

