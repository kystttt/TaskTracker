package habbits_tracker.habbits_tracker.secure.auth.dto;


import jakarta.validation.constraints.NotBlank;

public class AuthDtos {

    public record RegisterRequest(@NotBlank String username, @NotBlank String password) {}
    public record LoginRequest(@NotBlank String username, @NotBlank String password) {}
    public record LoginResponse(String accessToken) {}
}
