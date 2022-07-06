import { useState } from "react";
import { atom, useRecoilState } from "recoil";
import "./heading.css";

const searchAtom = atom({
  key: "search",
  default: "",
});

export const searchKeywordsAtom = atom({
  key: "searchKeywords",
  default: [],
});

export const Heading = () => {
  const [search, setSearch] = useRecoilState(searchAtom);
  const [searchKeywords, setSearchKeywords] =
    useRecoilState(searchKeywordsAtom);

  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const onChange = (evt) => setSearch(evt.target.value);
  const onKeyDown = (evt) => {
    const { key } = evt;
    const trimmedSearch = search.trim();

    if (
      (key === "," || key === "Enter") &&
      trimmedSearch.length &&
      !searchKeywords.includes(trimmedSearch)
    ) {
      evt.preventDefault();
      setSearchKeywords((prevState) => [...prevState, trimmedSearch]);
      setSearch("");
    }

    if (
      key === "Backspace" &&
      !search.length &&
      searchKeywords.length &&
      isKeyReleased
    ) {
      evt.preventDefault();
      const tagsCopy = [...searchKeywords];
      const poppedTag = tagsCopy.pop();

      setSearchKeywords(tagsCopy);
      setSearch(poppedTag);
    }
    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (indexTag) =>
    setSearchKeywords((prevState) =>
      prevState.filter((_, idx) => idx !== indexTag)
    );

  const clearKeyWords = () => setSearchKeywords([]);

  return (
    <header className="heading">
      <div className="heading__input">
        {searchKeywords.map((keyword, index) => (
          <div className="heading__input-tag" key={index}>
            {keyword}
            <button onClick={() => deleteTag(index)}>x</button>
          </div>
        ))}
        <input
          value={search}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
        />
        <button onClick={clearKeyWords}>Clear</button>
      </div>
    </header>
  );
};
