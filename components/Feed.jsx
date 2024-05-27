"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PromptCard from "./PromptCard";
import Loading from "./loading";

const Feed = () => {

  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className='mt-16 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClicks={handleTagClick}
          />
        ))}
      </div>
    );
  };

  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator?.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(prevText => prevText ? `${prevText}, ${tagName}` : tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleClearClick = () => {
    setSearchText('');
  };

  if (loading) {
    return <Loading/>
  }

  return (
    <section className='feed'>
      <form className='relative w-full'>
        <div className='search_input peer flex content-end'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className="w-11/12 focus:outline-none"
        />
        {searchText && (
        <button onClick={handleClearClick}>
           <Image 
        src='/assets/icons/cross.svg'
        alt='cancel-button'
        width={20}
        height={20}
        className='object-contain'
        />
        </button>
      )}
      </div>
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;