package praksa.intens.zadatakintens.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import praksa.intens.zadatakintens.dto.SkillDTO;
import praksa.intens.zadatakintens.model.Skill;
import praksa.intens.zadatakintens.repository.SkillRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.junit.jupiter.api.Assertions.assertEquals;


@ExtendWith(MockitoExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:application-test.properties")
@ActiveProfiles("test")
public class SkillServiceUnitTest {

    @Autowired
    private SkillService skillService;


    @MockBean
    private SkillRepository skillRepository;


    @BeforeEach
    void setUp() {

        Skill newSkill = new Skill("GraphQL");
        Skill savedSkill = new Skill(100L, "GraphQL");
        Skill existingSkill = new Skill(1L, "Java programming");

        given(skillRepository.findBySkillName("Java programming")).willReturn(Optional.of(existingSkill));
        given(skillRepository.save(newSkill)).willReturn(savedSkill);
        given(skillRepository.findAll()).willReturn(List.of(existingSkill));

    }



    @Test
    public void addNewSkillTest() {
        Skill newSkill;
        newSkill = skillService.addSkill(new SkillDTO("GraphQL"));

        verify(skillRepository, times(1)).save(newSkill);
        assertEquals("GraphQL", newSkill.getSkillName());
        assertEquals(100L, newSkill.getId());

    }




}
