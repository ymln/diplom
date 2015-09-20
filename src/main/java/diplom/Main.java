package diplom;

import com.google.inject.AbstractModule;
import com.google.inject.Guice;
import com.google.inject.Injector;

public class Main {
    public static void main(String... args) throws Exception {
        Injector injector = Guice.createInjector(new Module());
        Server server = injector.getInstance(Server.class);
        server.start();
    }

    private static class Module extends AbstractModule {
        @Override
        protected void configure() {
            bind(Configuration.class).to(EnvConfiguration.class);
            bind(Server.class).to(JettyServer.class);
        }
    }
}
