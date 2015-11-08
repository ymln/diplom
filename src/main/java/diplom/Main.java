package diplom;

import com.avaje.ebean.EbeanServer;
import com.avaje.ebean.EbeanServerFactory;
import com.avaje.ebean.config.DataSourceConfig;
import com.avaje.ebean.config.ServerConfig;
import com.google.inject.Guice;
import com.google.inject.Provides;
import com.google.inject.servlet.GuiceFilter;
import com.google.inject.servlet.ServletModule;
import com.sun.jersey.guice.spi.container.servlet.GuiceContainer;
import diplom.api.UserApi;
import org.avaje.agentloader.AgentLoader;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.ContextHandlerCollection;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.util.resource.Resource;

import javax.inject.Singleton;
import javax.servlet.DispatcherType;
import java.util.EnumSet;

public class Main {
    private final static String DB_CONNECTION = "jdbc:h2:mem:db";
    private final static String DB_DRIVER = "org.h2.Driver";
    private final static String DB_USERNAME = "sa";
    private final static String DB_PASSWORD = "";
    private final static int PORT = 8000;

    public static void main(String... args) throws Exception {
        if (!AgentLoader.loadAgentFromClasspath("avaje-ebeanorm-agent","debug=1;packages=diplom.entities.**")) {
            throw new Exception("avaje-ebeanorm-agent not found in classpath - not dynamically loaded");
        }
        Guice.createInjector(new Module());
        startServer(PORT);
    }

    private static void startServer(int port) throws Exception {
        Server server = new Server(port);

        ResourceHandler staticFilesHandler = new ResourceHandler();
        staticFilesHandler.setBaseResource(Resource.newResource("frontend/static"));
        ContextHandler staticFilesContext = new ContextHandler();
        staticFilesContext.setHandler(staticFilesHandler);

        ServletContextHandler guiceContext = new ServletContextHandler();
        guiceContext.addFilter(GuiceFilter.class, "/*", EnumSet.of(DispatcherType.REQUEST, DispatcherType.ASYNC));
        guiceContext.setAttribute("com.sun.jersey.api.json.POJOMappingFeature", "true");
        guiceContext.setAttribute("com.sun.jersey.spi.container.ContainerRequestFilters", "diplom.ContentTypeFilter");
        guiceContext.setContextPath("/api/v1");

        ContextHandlerCollection contexts = new ContextHandlerCollection();
        contexts.setHandlers(new Handler[]{staticFilesContext, guiceContext});
        server.setHandler(contexts);
        server.start();
    }

    private static class Module extends ServletModule {
        @Override
        protected void configureServlets() {
            bind(PasswordHasher.class).to(BcryptPasswordHasher.class);
            setupJersey();
        }

        void setupJersey() {
            bind(DefaultServlet.class).in(Singleton.class);
            bind(UserApi.class);
            bind(ContentTypeFilter.class);
            serve("/*").with(GuiceContainer.class);
        }

        @Provides
        @Singleton
        private EbeanServer getServer(ServerConfig c) {
            return EbeanServerFactory.create(c);
        }

        @Provides
        @Singleton
        private ServerConfig getServerConfig(DataSourceConfig dsc) {
            ServerConfig c = new ServerConfig();
            c.setName("db");
            c.loadFromProperties();
            c.setDdlGenerate(true);
            c.setDdlRun(true);
            c.setDataSourceConfig(dsc);
            return c;
        }

        @Provides
        @Singleton
        private DataSourceConfig getDataSourceConfig() {
            DataSourceConfig c = new DataSourceConfig();
            c.setUsername(DB_USERNAME);
            c.setPassword(DB_PASSWORD);
            c.setUrl(DB_CONNECTION);
            c.setDriver(DB_DRIVER);
            return c;
        }
    }
}
