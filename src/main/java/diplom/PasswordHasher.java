package diplom;

public interface PasswordHasher {
    String hash(String password);
    boolean isValid(String password, String hash);
}
