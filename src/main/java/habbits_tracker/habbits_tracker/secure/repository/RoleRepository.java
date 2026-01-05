package habbits_tracker.habbits_tracker.secure.repository;

import habbits_tracker.habbits_tracker.secure.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
