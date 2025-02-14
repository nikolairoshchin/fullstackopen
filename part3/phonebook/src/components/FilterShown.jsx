const FilterShown = ( {filterShow, setFilterShow} ) => {
  const handleFilter = (event) => {
    setFilterShow(event.target.value)
  }
  return (
    <div>filter shown with <input 
      value={filterShow} 
      onChange={handleFilter} />
    </div>
  )
}

export default FilterShown