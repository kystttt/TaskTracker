package habbits_tracker.habbits_tracker.secure.repository;

import habbits_tracker.habbits_tracker.secure.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
