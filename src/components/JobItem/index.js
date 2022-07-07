import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { flatten, head, map, pipe, props, tail, toLower, uniq } from "ramda";
import "./jobitem.css";
import { searchKeywordsAtom } from "../Heading";

export const JobItem = ({ job }) => {
  const [searchKeywords, setSearchKeywords] =
    useRecoilState(searchKeywordsAtom);
  const isMobile = useMediaQuery("(max-width: 375px)");

  const jobTags = getJobTags(job);

  const addTag = (tag) => () => {
    if (!searchKeywords.includes(tag))
      setSearchKeywords((prevState) => [...prevState, tag]);
  };

  return (
    <article className={`job-item ${job.featured && "featured"}`}>
      <div className="job-item__logo">
        <img src={job.logo} alt="logo" />
      </div>
      <div className="job-item__info">
        <div className="job-item__heading">
          <span className="job-item__company">{job.company}</span>
          {job.new && <span className="job-item__new">New!</span>}
          {job.featured && <span className="job-item__featured">Featured</span>}
        </div>
        <h3 className="job-item__position">{job.position}</h3>
        <div className="job-item__extra">
          <span className="job-item__posted">{job.postedAt}</span>.
          <span className="job-item__cotract">{job.contract}</span>.
          <span className="job-item__location">{job.location}</span>
        </div>
      </div>
      {isMobile && <hr></hr>}
      <div className="job-item__tags">
        {jobTags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="job-item__tag"
            onClick={addTag(tag)}
          >
            {`${head(tag).toUpperCase()}${tail(tag)}`}
          </span>
        ))}
      </div>
    </article>
  );
};

const getJobTags = pipe(
  props(["role", "level", "tools", "languages"]),
  flatten,
  map(toLower),
  uniq
);

function useMediaQuery(query) {
  const getMatches = (query) => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    handleChange();

    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}

export default useMediaQuery;
