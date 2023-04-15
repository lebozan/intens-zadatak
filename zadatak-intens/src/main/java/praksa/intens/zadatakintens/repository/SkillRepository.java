package praksa.intens.zadatakintens.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import praksa.intens.zadatakintens.model.Skill;

import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    Optional<Skill> findBySkillName(String name);
}
