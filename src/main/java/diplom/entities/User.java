package diplom.entities;

import com.avaje.ebean.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class User extends Model {
    @Id
    private long id;
    @Column
    private String email;
    @Column
    private String passwordHash;
    @OneToMany
    private List<Project> projects;

    public User() {
    }

    public User(String email, String passwordHash) {
        this.email = email;
        this.passwordHash = passwordHash;
    }

    public String getPasswordHash() {
        return this.passwordHash;
    }

    public List<Project> getProjects() {
        return projects;
    }
}
