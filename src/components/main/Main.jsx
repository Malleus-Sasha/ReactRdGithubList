import React, { useEffect, useState } from "react";
import './main.less';
import { useDispatch, useSelector } from "react-redux";
import { getRepos } from "../actions/repos";
import Repo from "./repo/Repo";
import { setCurentPage } from "../../reducers/reposReducer";
import { createPages } from "../../utils/pagesCreator";
import { Redirect } from 'react-router-dom';

const Main = () => {
  const dispatch = useDispatch();
  const repos = useSelector(state => state.repos.items);
  const isFetching = useSelector(state => state.repos.isFetching);
  const currentPage = useSelector(state => state.repos.currentPage);
  const totalCount = useSelector(state => state.repos.totalCount);
  const perPage = useSelector(state => state.repos.perPage);
  const isFetchError = useSelector(state => state.repos.isFetchError);
  const [searchValue, setSearchValue] = useState('');
  const pagesCount = Math.ceil(totalCount/perPage);
  const pages = [];
  createPages(pages, pagesCount, currentPage);

  useEffect(() => {
    dispatch(getRepos(searchValue, currentPage, perPage));
  }, [currentPage]);  

  function searchHandler() {
    dispatch(setCurentPage(1));
    dispatch(getRepos(searchValue, currentPage, perPage));
  }

  return (
    <div>
      { isFetchError && 
        <div className="app-alert">
          An error has occurred! Please refresh the page!
        </div>
      }
      
      <div className="search">
        <input 
          type="text" 
          placeholder="Input repo name" 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"/>
        <button onClick={() => searchHandler()} className="search-btn">Search</button>
      </div>
      {
        isFetching === false
        ?
        repos.map(repo => <Repo key={repo.id} repo={repo}/>)
        :
        <div className="fetching"></div>
      }

      <div className="pages">
        {pages.map((page, index) => 
          <span 
            key={index}
            onClick={() => dispatch(setCurentPage(page))} 
            className={currentPage == page ? 'current-page' : 'page'}>
            {page}
          </span>)}
      </div>
    </div>
  );
};

export default Main;
