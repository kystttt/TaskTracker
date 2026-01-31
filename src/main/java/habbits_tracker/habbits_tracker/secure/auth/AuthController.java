package habbits_tracker.habbits_tracker.secure.auth;


import habbits_tracker.habbits_tracker.secure.auth.dto.AuthDtos;
import habbits_tracker.habbits_tracker.secure.jwt.JwtService;
import habbits_tracker.habbits_tracker.secure.user.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthDtos.LoginResponse register(@RequestBody @Valid AuthDtos.RegisterRequest req) {
        var user = userService.register(req.username(), req.password());
        return new AuthDtos.LoginResponse(jwtService.issueAccessToken(user));
    }

    @PostMapping("/login")
    public AuthDtos.LoginResponse login(@RequestBody @Valid AuthDtos.LoginRequest req) {
        var user = userService.loadByUsername(req.username());
        if (!userService.matches(user, req.password())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        return new AuthDtos.LoginResponse(jwtService.issueAccessToken(user));
    }
}

