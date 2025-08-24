'use client'
import { useCallback, useState } from "react";
import Header from './components/Header'
import SearchBar from "./components/SearchBar";

export const MainPage = () => {
    return (
      <div>
        <Header />
        <SearchBar />
      </div>
    );
  }

export default MainPage