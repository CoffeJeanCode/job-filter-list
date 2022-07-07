import { map, toLower } from "ramda";
import { selector, useRecoilValue } from "recoil";
import { queryAllJobs } from "../../services/job.service";
import { searchKeywordsAtom } from "../Heading";
import { JobItem } from "../JobItem";
import "./jobscolletion.css";

const jobsAtom = selector({
  key: "jobs",
  get: async ({ get }) => {
    const searchKeywords = get(searchKeywordsAtom);

    const jobs = await queryAllJobs();

    const filteredJobs = searchKeywords.length
      ? jobs
          .map((job) => ({
            ...job,
            role: toLower(job.role),
            level: toLower(job.level),
            tools: map(toLower)(job.languages),
            languages: map(toLower)(job.languages),
          }))
          .filter(
            (job) =>
              searchKeywords.includes(job.role) ||
              searchKeywords.includes(job.level) ||
              job.tools.some((v) => searchKeywords.includes(v)) ||
              job.languages.some((v) => searchKeywords.includes(v))
          )
      : jobs;

    return filteredJobs || [];
  },
});

export const JobsColletion = () => {
  const jobs = useRecoilValue(jobsAtom);

  return (
    <section className="job-colletion">
      <ul className="job-colletion__list">
        {jobs.map((job) => (
          <li key={job.id} className="job-colletion__item">
            <JobItem job={job} />
          </li>
        ))}
      </ul>
    </section>
  );
};
