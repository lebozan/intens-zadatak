insert into job_candidates(name, date_of_birth, contact_number, email) values ('Bojan Cakic', '1997-08-22', '060123456', 'cb@mail.com');
insert into job_candidates(name, date_of_birth, contact_number, email) values ('Pera Peric', '2000-01-05', '0601234567', 'pp@mail.com');

insert into skills(skill_name) values ('Java programming');
insert into skills(skill_name) values ('C# programming');
insert into skills(skill_name) values ('Scala programming');
insert into skills(skill_name) values ('MYSQL');
insert into skills(skill_name) values ('English language');

insert into job_candidates_skills(job_candidate_id, skills_id) values (1, 1);
insert into job_candidates_skills(job_candidate_id, skills_id) values (1, 3);
-- insert into job_candidates_skills(job_candidate_id, skills_id) values (1, 5);


insert into job_candidates_skills(job_candidate_id, skills_id) values (2, 1);
insert into job_candidates_skills(job_candidate_id, skills_id) values (2, 5);

