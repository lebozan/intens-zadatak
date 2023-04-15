package praksa.intens.zadatakintens.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import praksa.intens.zadatakintens.model.JobCandidate;

import java.util.List;

@Repository
public interface JobCandidateRepository extends JpaRepository<JobCandidate, Long> {

    List<JobCandidate> findByNameContainingIgnoreCase(String name);

    List<JobCandidate> findAllBySkills_SkillName(String skillName);
}
