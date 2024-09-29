package xyz.beriholic.erisnote.repository;

import org.babyfish.jimmer.sql.JSqlClient;
import org.babyfish.jimmer.sql.ast.mutation.SaveMode;
import org.babyfish.jimmer.sql.fetcher.Fetcher;
import org.jetbrains.annotations.Nullable;
import org.springframework.stereotype.Repository;
import xyz.beriholic.erisnote.model.entity.CategoriesDraft;
import xyz.beriholic.erisnote.model.entity.User;
import xyz.beriholic.erisnote.model.entity.UserDraft;
import xyz.beriholic.erisnote.model.entity.UserTable;


@Repository
public class UserRepository {

    private final UserTable USER_TABLE = UserTable.$;

    private final JSqlClient sqlClient;

    public UserRepository(JSqlClient sqlClient) {
        this.sqlClient = sqlClient;
    }

    @Nullable
    public User findUser(
            long id,
            Fetcher<User> fetcher
    ) {
        return sqlClient.findById(fetcher, id);
    }

    @Nullable
    public User findUser(
            String username,
            Fetcher<User> fetcher
    ) {
        var dbUser = sqlClient.createQuery(USER_TABLE)
                .where(USER_TABLE.username().eq(username))
                .select(USER_TABLE.fetch(fetcher))
                .execute();
        if (dbUser.isEmpty()) {
            return null;
        }

        return dbUser.get(0);

    }

    public void saveUser(Long uid, String username, String password) {
        sqlClient.getEntities()
                .saveCommand(
                        UserDraft.$.produce(draft -> {
                            draft.setId(uid);
                            draft.setUsername(username);
                            draft.setPassword(password);
                        })
                ).setMode(SaveMode.INSERT_ONLY)
                .execute();

        sqlClient.getEntities()
                .saveCommand(
                        CategoriesDraft.$.produce(draft -> {
                            draft.setId(uid);
                            draft.setUserId(uid);
                            draft.setName("默认分类");
                        })
                ).setMode(SaveMode.INSERT_ONLY)
                .execute();
    }
}

