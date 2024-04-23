const Search = ({ newSearch, handleFilter }) => {
  return (
    <div className="my-3">
      Filter shown with: <input value={newSearch} onChange={handleFilter} className="rounded-sm p-1" />
    </div>
  )
}

export default Search
