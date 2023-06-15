"use client"

import { useState, useEffect } from "react"

import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {

  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        /> 
      ))}
    </div>
  )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([])

  //Search States
  const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResult, setSearchedResult] = useState([])

  // The other way to display the data
  //const data = searchedResult.length > 0 ? searchedResult : allPosts

  // fetch posts
  const fetchPosts = async () => {
    const res = await fetch("/api/prompt")
    const data = await res.json()
    setAllPosts(data)
  }
  
  useEffect(() => {
    fetchPosts()
  }, [])

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i") // i = case insensitive
    return allPosts.filter(
      (post) => 
        regex.test(post.creator.username) ||
        regex.test(post.prompt) ||
        regex.test(post.tag)
      )
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchedResult(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)
    const searchResult = filterPrompts(tag)
    setSearchedResult(searchResult)
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      { searchText ? (
        <PromptCardList
        data={searchedResult}
        handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts}  handleTagClick={handleTagClick} />
      )
      }
    </section>
  )
}

export default Feed