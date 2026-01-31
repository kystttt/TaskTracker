package habbits_tracker.habbits_tracker.secure.user;


import habbits_tracker.habbits_tracker.secure.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;

    public UserService(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    public UserEntity register(String username, String rawPassword) {
        if (repo.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already exists");
        }
        var user = new UserEntity(username, encoder.encode(rawPassword), Set.of(Role.ROLE_USER));
        return repo.save(user);
    }

    public UserEntity loadByUsername(String username) {
        return repo.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
    }

    public boolean matches(UserEntity user, String rawPassword) {
        return encoder.matches(rawPassword, user.getPasswordHash());
    }
}

