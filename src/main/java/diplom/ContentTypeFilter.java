package diplom;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.util.List;

// IMPLEMENTATION NOTE: Resolves an issue with FormParam processing
// @see https://java.net/jira/browse/JERSEY-1978

@Provider
@PreMatching
public class ContentTypeFilter implements ContainerRequestFilter {
    public void filter(ContainerRequestContext requestContext) throws IOException {
        MultivaluedMap<String,String> headers = requestContext.getHeaders();
        List<String> contentTypes = headers.remove(HttpHeaders.CONTENT_TYPE);
        if (contentTypes != null && !contentTypes.isEmpty()) {
            String contentType = contentTypes.get(0);
            String sanitizedContentType = contentType.replaceFirst("; charset=UTF-8", "");
            headers.add(HttpHeaders.CONTENT_TYPE, sanitizedContentType);
        }
    }
}