package diplom;

import com.google.inject.Inject;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.util.resource.Resource;

public class JettyServer implements Server {
    private final int port;

    @Inject
    public JettyServer(Configuration conf) {
        this.port = conf.getPort();
    }
    public void start() throws Exception {
        org.eclipse.jetty.server.Server server = new org.eclipse.jetty.server.Server(port);

        ResourceHandler rh = new ResourceHandler();
        rh.setBaseResource(Resource.newClassPathResource("."));

        server.setHandler(rh);
        server.start();
        server.join();
    }
}
