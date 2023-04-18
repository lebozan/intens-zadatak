package praksa.intens.zadatakintens.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import praksa.intens.zadatakintens.dto.JobCandidateDTO;
import praksa.intens.zadatakintens.dto.SkillDTO;
import praksa.intens.zadatakintens.helper.JobCandidateMapper;
import praksa.intens.zadatakintens.model.JobCandidate;
import praksa.intens.zadatakintens.service.JobCandidateService;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/job-candidates")
public class JobCandidateController {

    private final JobCandidateService jobCandidateService;
    private final JobCandidateMapper jobCandidateMapper;

    public JobCandidateController(JobCandidateService jobCandidateService) {
        this.jobCandidateService = jobCandidateService;
        this.jobCandidateMapper = new JobCandidateMapper();
    }


    @GetMapping
    public ResponseEntity<List<JobCandidateDTO>> findAllJobCandidates() {
        return new ResponseEntity<>(jobCandidateService.getAll().stream().map(jobCandidateMapper::toDto).toList(), HttpStatus.OK);
    }

    @GetMapping(value = "/skill/{skillName}")
    public ResponseEntity<List<JobCandidateDTO>> findAllJobCandidatesForSkill(@PathVariable String skillName) {
        return new ResponseEntity<>(jobCandidateService.findAllJobCandidatesForSkill(skillName)
                .stream().map(jobCandidateMapper::toDto).toList(), HttpStatus.OK);
    }

    @GetMapping(value = "/name/{name}")
    public ResponseEntity<List<JobCandidateDTO>> findAllJobCandidatesByName(@PathVariable String name) {
        List<JobCandidate> foundCandidates = jobCandidateService.searchJobCandidateByName(name);
        List<JobCandidateDTO> candidateDTOS = foundCandidates.stream().map(jobCandidateMapper::toDto).toList();
        return new ResponseEntity<>(candidateDTOS, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<JobCandidate> addJobCandidate(@RequestBody @Valid JobCandidateDTO dto) {
        return new ResponseEntity<>(jobCandidateService.addJobCandidate(dto), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<JobCandidateDTO> updateJobCandidateWithSkill(@PathVariable Long id, @RequestBody SkillDTO dto) {
        JobCandidate candidate;
        try {
            candidate = jobCandidateService.updateJobCandidateWithSkill(id, dto.getSkillName());
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


        return new ResponseEntity<>(jobCandidateMapper.toDto(candidate), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}/skill/{skillName}")
    public ResponseEntity<JobCandidateDTO> removeSkillFromJobCandidate(@PathVariable Long id, @PathVariable String skillName) {
        JobCandidate candidate;
        try {
            candidate = jobCandidateService.removeSkillFromJobCandidate(id, skillName);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(jobCandidateMapper.toDto(candidate), HttpStatus.OK);
    }


}
