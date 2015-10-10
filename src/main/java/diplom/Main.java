package diplom;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Provides;
import com.google.inject.servlet.GuiceFilter;
import com.google.inject.servlet.ServletModule;
import com.j256.ormlite.jdbc.JdbcConnectionSource;
import com.j256.ormlite.support.ConnectionSource;
import com.j256.ormlite.table.TableUtils;
import com.sun.jersey.guice.spi.container.servlet.GuiceContainer;
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
import java.sql.SQLException;
import java.util.EnumSet;

public class Main {
    public static void main(String... args) throws Exception {
        final int port = 8000;

        Injector injector = Guice.createInjector(new Module());

        createTablesInDb(injector.getInstance(ConnectionSource.class));

        startServer(port);

        startWebpackWatch();
    }

    private static void startServer(int port) throws Exception {
        Server server = new Server(port);

        ResourceHandler staticFilesHandler = new ResourceHandler();
        staticFilesHandler.setBaseResource(Resource.newClassPathResource("."));
        ContextHandler staticFilesContext = new ContextHandler();
        staticFilesContext.setHandler(staticFilesHandler);

        ServletContextHandler guiceContext = new ServletContextHandler();
        guiceContext.addFilter(GuiceFilter.class, "/*", EnumSet.of(DispatcherType.REQUEST, DispatcherType.ASYNC));
        guiceContext.setContextPath("/api/v1");

        ContextHandlerCollection contexts = new ContextHandlerCollection();
        contexts.setHandlers(new Handler[]{staticFilesContext, guiceContext});
        server.setHandler(contexts);
        server.start();
    }

    private static void createTablesInDb(ConnectionSource conn) throws SQLException {
        TableUtils.createTable(conn, diplom.entities.User.class);
    }

    private static void startWebpackWatch() {

    }

    private static class Module extends ServletModule {
        @Override
        protected void configureServlets() {
            bind(DefaultServlet.class).in(Singleton.class);
            bind(diplom.api.User.class);

            // Jersey (REST API)
            serve("/*").with(GuiceContainer.class);
        }

        @Provides
        @Singleton
        ConnectionSource provideConnectionSource() throws SQLException {
            return new JdbcConnectionSource("jdbc:h2:mem:account");
        }
    }
}
