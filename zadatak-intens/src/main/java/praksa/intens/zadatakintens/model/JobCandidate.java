package praksa.intens.zadatakintens.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import praksa.intens.zadatakintens.dto.JobCandidateDTO;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "job_candidates")
public class JobCandidate {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "contact_number")
    private String contactNumber;

    @Column(unique = true)
    private String email;

    @ManyToMany
    private List<Skill> skills;


    public JobCandidate(JobCandidateDTO dto) {
        this.name = dto.getName();
        this.contactNumber = dto.getContactNumber();
        this.email = dto.getEmail();
        this.dateOfBirth = dto.getDateOfBirth();
    }

}
