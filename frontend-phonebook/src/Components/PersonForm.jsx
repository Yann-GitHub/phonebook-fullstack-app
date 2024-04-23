const Personform = ({ addPersons, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={addPersons}>
      <div className="my-3">
        name: <input value={newName} onChange={handleNameChange} className="rounded-sm p-1" />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} className="rounded-sm p-1" />
      </div>
      <div className="mt-4 mb-4 ">
        <button className="rounded-sm bg-slate-300 w-24 hover:bg-slate-400 " type="submit">
          add
        </button>
      </div>
    </form>
  )
}

export default Personform
