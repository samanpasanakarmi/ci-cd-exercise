import React from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'   // No Router import
import { useApi } from './useApi'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import PokemonPage from './PokemonPage'
import PokemonList from './PokemonList'

const mapResults = ({ results }) =>
  results.map(({ url, name }) => ({
    url,
    name,
    id: parseInt(url.match(/\/(\d+)\//)[1]),
  }))

const AppRoutes = ({ pokemonList }) => {
  const match = useMatch('/pokemon/:name')

  let next = null
  let previous = null
  if (match && match.params) {
    const current = pokemonList.find(({ name }) => name === match.params.name)
    if (current) {
      previous = pokemonList.find(({ id }) => id === current.id - 1)
      next = pokemonList.find(({ id }) => id === current.id + 1)
    }
  }

  return (
    <Routes>
      <Route path="/" element={<PokemonList pokemonList={pokemonList} />} />
      <Route
        path="/pokemon/:name"
        element={
          <PokemonPage
            pokemonList={pokemonList}
            previous={previous}
            next={next}
          />
        }
      />
    </Routes>
  )
}

const App = () => {
  const {
    data: pokemonList,
    error,
    isLoading,
  } = useApi('https://pokeapi.co/api/v2/pokemon/?limit=50', mapResults)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  return <AppRoutes pokemonList={pokemonList} />   // No Router here
}

export default App