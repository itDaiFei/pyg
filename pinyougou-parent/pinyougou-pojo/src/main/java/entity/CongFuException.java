package entity;

public class CongFuException extends Exception {

    public CongFuException() {
    }

    public CongFuException(String message) {
        super(message);
    }

    public CongFuException(String message, Throwable cause) {
        super(message, cause);
    }

    public CongFuException(Throwable cause) {
        super(cause);
    }

    public CongFuException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }


}
