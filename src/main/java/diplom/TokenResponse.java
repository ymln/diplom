package diplom;

import java.util.UUID;

public class TokenResponse {
    public String token;
    public TokenResponse(UUID token) {
        this.token = token.toString();
    }
}
