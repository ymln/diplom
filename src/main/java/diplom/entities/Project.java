package diplom.entities;

import com.avaje.ebean.annotation.CreatedTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.sql.Timestamp;

@Entity
public class Project {
    @Id
    private long id;
    @Column(nullable = false)
    private String name;
    @Column
    private String description;
    @ManyToOne
    private User user;
    @CreatedTimestamp
    private Timestamp created;

    Project() {
    }

    public Project(String name, User user) {
        this.name = name;
        this.user = user;
    }

    public Project(String name, String description, User user) {
        this.name = name;
        this.description = description;
        this.user = user;
    }
}
