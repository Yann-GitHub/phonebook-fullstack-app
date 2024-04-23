import Person from './Person'

const Persons = ({ list, handleDeletePersons }) => {
  return (
    <div>
      {list.map((person, index) => (
        <Person key={index} value={person} handleDeletePersons={() => handleDeletePersons(person.id)} />
      ))}
    </div>
  )
}
export default Persons
