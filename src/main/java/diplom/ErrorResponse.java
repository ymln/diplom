package diplom;

public class ErrorResponse {
    private String[] errors;

    public ErrorResponse(String error) {
        this.errors = new String[] { error };
    }
}
