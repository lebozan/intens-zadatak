package praksa.intens.zadatakintens.service;

import org.springframework.stereotype.Service;
import praksa.intens.zadatakintens.dto.JobCandidateDTO;
import praksa.intens.zadatakintens.dto.SkillDTO;
import praksa.intens.zadatakintens.model.JobCandidate;
import praksa.intens.zadatakintens.model.Skill;
import praksa.intens.zadatakintens.repository.JobCandidateRepository;
import praksa.intens.zadatakintens.repository.SkillRepository;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobCandidateService {

    private final JobCandidateRepository jobCandidateRepository;
    private final SkillRepository skillRepository;

    public JobCandidateService(JobCandidateRepository jobCandidateRepository, SkillRepository skillRepository) {
        this.jobCandidateRepository = jobCandidateRepository;
        this.skillRepository = skillRepository;
    }

    public JobCandidate addJobCandidate(JobCandidateDTO dto) {
        JobCandidate newJobCandidate = new JobCandidate(dto);
        return jobCandidateRepository.save(newJobCandidate);
    }

    public void removeJobCandidate(Long id) {
        jobCandidateRepository.deleteById(id);
    }

    public JobCandidate updateJobCandidateWithSkill(Long candidateId, String skillName) {
        Optional<JobCandidate> findJobCandidate = jobCandidateRepository.findById(candidateId);
        JobCandidate candidate = findJobCandidate.orElseThrow();
        Optional<Skill> findSkill = skillRepository.findBySkillName(skillName);
        findSkill.ifPresentOrElse((skill) -> {
                candidate.getSkills().add(skill);
                jobCandidateRepository.save(candidate);
            }, () -> {
                Skill newSkill = new Skill(skillName);
                newSkill = skillRepository.save(newSkill);
                candidate.getSkills().add(newSkill);
                jobCandidateRepository.save(candidate);
            }
        );

        return candidate;
    }

    public List<JobCandidate> searchJobCandidateByName(String nameQuery) {
        return jobCandidateRepository.findByNameContainingIgnoreCase(nameQuery);
    }

    public List<JobCandidate> findAllJobCandidatesForSkill(String skillName) {
        return jobCandidateRepository.findAllBySkills_SkillName(skillName);
    }

    public JobCandidate removeSkillFromJobCandidate(Long candidateId, String skillName) {
        Optional<JobCandidate> findJobCandidate = jobCandidateRepository.findById(candidateId);
        JobCandidate candidate = findJobCandidate.orElseThrow();
        candidate.setSkills(candidate.getSkills().stream().filter(skill -> !Objects.equals(skill.getSkillName(), skillName)).collect(Collectors.toList()));
        return jobCandidateRepository.save(candidate);

    }

    public List<JobCandidate> getAll() {
        return jobCandidateRepository.findAll();
    }
}
