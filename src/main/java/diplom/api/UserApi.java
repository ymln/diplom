package diplom.api;

import com.avaje.ebean.EbeanServer;
import com.google.inject.Inject;
import diplom.PasswordHasher;
import diplom.ErrorResponse;
import diplom.TokenResponse;
import diplom.entities.Token;
import diplom.entities.User;

import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

@Path("/users")
@Singleton
public class UserApi {
    private final EbeanServer db;
    private final PasswordHasher hasher;

    @Inject
    public UserApi(PasswordHasher hasher, EbeanServer db) {
        this.hasher = hasher;
        this.db = db;
    }

    @POST
    @Path("/signup")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Object signup(@FormParam("email") String email, @FormParam("password") String password)
    {
        User existingUser = db.find(User.class).where().eq("email", email).findUnique();
        if(existingUser == null) {
            User user = new User(email, hasher.hash(password));
            db.save(user);
            UUID token = generateToken(user);
            return new TokenResponse(token);
        } else {
            return new ErrorResponse("This user already exists");
        }
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Object login(@FormParam("email") String email, @FormParam("password") String password) {
        User user = db.find(User.class).where().eq("email", email).findUnique();
        if(user != null && hasher.isValid(password, user.getPasswordHash())) {
            UUID token = generateToken(user);
            return new TokenResponse(token);
        } else {
            return new ErrorResponse("User with such email and/or password was not found");
        }
    }

    private UUID generateToken(User user) {
        UUID token = UUID.randomUUID();
        db.save(new Token(token, user, currentTimestamp()));
        return token;
    }

    private Timestamp currentTimestamp() {
        return new Timestamp(new Date().getTime());
    }
}
