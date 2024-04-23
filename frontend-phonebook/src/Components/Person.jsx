const Person = ({ value, handleDeletePersons }) => {
  return (
    <p className="mb-3">
      {value.name} {value.number}
      <button className="bg-slate-300 px-6 ml-5 rounded-sm hover:bg-slate-400" onClick={handleDeletePersons}>
        delete
      </button>
    </p>
  )
}

export default Person
