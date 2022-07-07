import { head, tail } from "ramda";
import { atom, useRecoilState } from "recoil";
import "./heading.css";

export const searchKeywordsAtom = atom({
  key: "searchKeywords",
  default: [],
});

export const Heading = () => {
  const [searchKeywords, setSearchKeywords] =
    useRecoilState(searchKeywordsAtom);

  const deleteTag = (indexTag) =>
    setSearchKeywords((prevState) =>
      prevState.filter((_, idx) => idx !== indexTag)
    );

  const clearKeyWords = () => setSearchKeywords([]);

  return (
    <header className="heading">
      {searchKeywords.length ? (
        <div className="heading__input">
          <div className="heading__tags">
            {searchKeywords.map((keyword, index) => (
              <div className="heading__input-tag" key={index}>
                {`${head(keyword).toUpperCase()}${tail(keyword)}`}
                <button onClick={() => deleteTag(index)}>
                  <img src="/images/icon-remove.svg" alt="clear"></img>
                </button>
              </div>
            ))}
          </div>
          <button className="heading__clear" onClick={clearKeyWords}>
            Clear
          </button>
        </div>
      ) : (
        ""
      )}
    </header>
  );
};
