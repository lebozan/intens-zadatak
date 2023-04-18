package praksa.intens.zadatakintens.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import praksa.intens.zadatakintens.dto.SkillDTO;
import praksa.intens.zadatakintens.model.Skill;
import praksa.intens.zadatakintens.service.SkillService;

import java.util.List;

@RestController
@RequestMapping(value = "/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    public ResponseEntity<Skill> addNewSkill(@RequestBody @Valid SkillDTO dto) {
        Skill newSkill = skillService.addSkill(dto);
        return new ResponseEntity<>(newSkill, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        return new ResponseEntity<>(skillService.findAllSkills(), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{skillId}")
    public ResponseEntity<String> deleteSkill(@PathVariable Long skillId) {
        try {
            skillService.deleteSkillById(skillId);
        } catch (NullPointerException e) {
            return new ResponseEntity<>("Skill with given id not found!", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.OK);


    }
}
