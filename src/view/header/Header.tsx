import React, { ChangeEvent } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
    searchText: string;
    handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }

export const Header = ({searchText, handleSearchChange}: HeaderProps) => {
  return (
    <div className="top-nav">
        <div className="logo">
          <span><FontAwesomeIcon icon ={faVideoSlash}/> Imagine Movie Listing App</span>
        </div>
        <div className="search-bar">
          <div className="search-input-container">
            <input
              className="search-input search-input-large"
              type="text"
              placeholder="Search Movie..."
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
  )
}
