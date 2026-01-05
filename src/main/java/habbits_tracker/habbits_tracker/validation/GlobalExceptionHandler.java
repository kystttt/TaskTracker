package habbits_tracker.habbits_tracker.validation;

import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.NoSuchElementException;

/**
 * Контроллер, отвечающий за обработку исключений
 */
@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * Обрабытвает все исключения класса Exception
     * @param e само исключение
     * @return возвращает 500 код
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(
        Exception e
    ){
        log.error("HandleException", e);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
    }

    /**
     * Обрабытвает все исключения класса
     *                      EntityNotFoundException
     *                      NoSuchElementException
     * @param e само исключение
     * @return возвращает 404 код
     */
    @ExceptionHandler(exception = {
            EntityNotFoundException.class,
            NoSuchElementException.class
    })
    public ResponseEntity<String> handleEntityNotFound(
            Exception e
    ){
        log.error("HandleEntityNotFound", e);
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(e.getMessage());
    }

    /**
     * Обрабытвает все исключения класса
     *                          IllegalArgumentException
     *                          IllegalStateException
     *                          MethodArgumentNotValidException
     * @param e само исключение
     * @return возвращает 400 код
     */
    @ExceptionHandler(exception = {
            IllegalArgumentException.class,
            IllegalStateException.class,
            MethodArgumentNotValidException.class
    })
    public ResponseEntity<String> handleBadRequest(
            Exception e
    ){
        log.error("HandleBadRequest", e);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(e.getMessage());
    }
}
