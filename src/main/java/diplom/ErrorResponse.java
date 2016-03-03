package diplom;

import java.util.ArrayList;
import java.util.List;

public class ErrorResponse {
    private List<String> errors;

    public ErrorResponse(String error) {
        List<String> errors = new ArrayList<String>(1);
        errors.add(error);
        this.errors = errors;
    }
}
