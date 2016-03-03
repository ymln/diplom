package diplom.api;

import com.avaje.ebean.EbeanServer;
import diplom.AccessDeniedResponse;
import diplom.ErrorResponse;
import diplom.SuccessResponse;
import diplom.entities.Project;
import diplom.entities.Token;
import diplom.entities.User;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/projects")
@Singleton
public class ProjectApi {
    private final EbeanServer db;

    @Inject
    public ProjectApi(EbeanServer db) {
        this.db = db;
    }

    @GET
    @Path("")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Object all(@FormParam("token") String token) {
        Token tkn = db.find(Token.class).where().eq("token", token).findUnique();
        if(tkn == null) {
            return new AccessDeniedResponse();
        }
        User user = tkn.getUser();
        // TODO: also return projects the user was given access to
        return user.getProjects();
    }

    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Object add(@FormParam("token") String token, @FormParam("name") String name,
                      @FormParam("description") String description) {
        Token tkn = db.find(Token.class).where().eq("token", token).findUnique();
        if(tkn == null) {
            return new AccessDeniedResponse();
        }
        if(name == null) {
            return new ErrorResponse("Name should be set");
        }
        User user = tkn.getUser();
        Project project = (description == null) ? new Project(name, user) : new Project(name, description, user);
        db.save(project);
        return new SuccessResponse();
    }
}
