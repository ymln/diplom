package diplom.api;

import com.google.inject.Inject;
import com.j256.ormlite.support.ConnectionSource;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/users")
@Singleton
public class User {
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getUsers()
    {
        return "TODO";
    }
}
