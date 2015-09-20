package diplom;

public class EnvConfiguration implements Configuration {
    private final int DEFAULT_PORT = 8000;

    public int getPort() {
        String port = System.getenv("PORT");
        if(port != null) {
            return Integer.valueOf(port);
        } else {
            return DEFAULT_PORT;
        }
    }
}
