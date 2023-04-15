package praksa.intens.zadatakintens.helper;

import praksa.intens.zadatakintens.dto.JobCandidateDTO;
import praksa.intens.zadatakintens.model.JobCandidate;

import java.util.ArrayList;

public class JobCandidateMapper {

    public JobCandidateDTO toDto(JobCandidate candidate) {
        JobCandidateDTO dto = new JobCandidateDTO();
        dto.setName(candidate.getName());
        dto.setEmail(candidate.getEmail());
        dto.setContactNumber(candidate.getContactNumber());
        dto.setDateOfBirth(candidate.getDateOfBirth());
        dto.setSkills(new ArrayList<>());
        candidate.getSkills().forEach((skill -> {
            dto.getSkills().add(skill.getSkillName());
        }));

        return dto;
    }

    public JobCandidate toEntity(JobCandidateDTO dto) {
        return new JobCandidate(dto);
    }
}
