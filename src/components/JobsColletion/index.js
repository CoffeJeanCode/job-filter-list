import { useEffect } from "react";
import { atom, selector, useRecoilState } from "recoil";
import { queryAllJobs } from "../../services/job.service";
import { searchKeywordsAtom } from "../Heading";
import { JobItem } from "../JobItem";

const jobsAtom = selector({
  key: "jobs",
  get: ({ get }) => {
    const searchKeywords = get(searchKeywordsAtom);
    console.log(searchKeywords); // Data Fetching...
    return [];
  },
});

export const JobsColletion = () => {
  const [jobs, setJobs] = useRecoilState(jobsAtom);

  useEffect(() => {
    const getJobs = async () => {
      const jobs = await queryAllJobs();
      setJobs(jobs);
    };
    getJobs();
    // eslint-disable-next-line
  }, []);

  return (
    <section>
      <ul>
        {/* {jobs.map((job) => (
          <li key={job.id}>
            <JobItem job={job} />
          </li>
        ))} */}
      </ul>
    </section>
  );
};
