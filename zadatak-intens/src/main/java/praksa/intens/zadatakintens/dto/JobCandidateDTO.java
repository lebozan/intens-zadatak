package praksa.intens.zadatakintens.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobCandidateDTO {

    @NotNull
    private String name, email, contactNumber;

    @NotNull
    private Date dateOfBirth;

    private List<String> skills;
}
