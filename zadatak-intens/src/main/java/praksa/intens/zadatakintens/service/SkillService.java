package praksa.intens.zadatakintens.service;

import org.springframework.stereotype.Service;
import praksa.intens.zadatakintens.dto.SkillDTO;
import praksa.intens.zadatakintens.model.Skill;
import praksa.intens.zadatakintens.repository.SkillRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {
    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public Skill addSkill(SkillDTO dto) {
        return skillRepository.save(new Skill(dto.getSkillName()));
    }

    public void deleteSkillById(Long id) {
        Optional<Skill> existingSkill = skillRepository.findById(id);
        existingSkill.ifPresent(skill -> skillRepository.deleteById(skill.getId()));
    }

    public List<Skill> findAllSkills() {
        return skillRepository.findAll();
    }


}
