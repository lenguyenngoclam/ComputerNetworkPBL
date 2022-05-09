import React from 'react'
import CocktailList from '../components/cocktail-list'
import SearchForm from '../components/search-form';
export default function Home() {
  return (
    <main>
      <SearchForm />
      <CocktailList />
    </main>
  )
}
