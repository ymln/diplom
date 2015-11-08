package diplom.entities;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

@Entity
public class Token {
    @Id
    private long id;
    @Column
    private UUID token;
    @ManyToOne()
    private User user;
    @Column
    private Timestamp created;

    Token() {
    }

    public Token(UUID token, User user, Timestamp created) {
        this.token = token;
        this.user = user;
        this.created = created;
    }
}
