package diplom;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class BcryptPasswordHasher implements PasswordHasher {
    public String hash(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public boolean isValid(String password, String hash) {
        return BCrypt.checkpw(password, hash);
    }
}
