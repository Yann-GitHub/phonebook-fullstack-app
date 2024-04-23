import { useState, useEffect } from 'react'

import Search from './Components/Search'
import Header from './Components/Header'
import Persons from './Components/Persons'
import Personform from './Components/PersonForm'
import Notification from './Components/Notification'

import personService from './services/persons'

const App = () => {
  // mock data
  // const [initialPersons, setInitialPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  // ])
  const [initialPersons, setInitialPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  // Miss managment of isLoading status

  useEffect(() => {
    personService.getAll().then((allPersons) => {
      console.log('Response fulfilled - First data fetching')
      setInitialPersons(allPersons)
    })
  }, [])
  // console.log('render', initialPersons.length, 'persons')

  // addPersons function without possiblities to choose if we want to update the phonenumber of an already existing user or just cancel the adding
  // const addPersons = (event) => {
  //   event.preventDefault()
  //   // console.log('button clicked', event.target)
  //   const personObject = {
  //     name: newName,
  //     number: newNumber,
  //     // id: initialPersons.length + 1, // id implemented by json-server
  //   }

  //   if (initialPersons.some((person) => person.name.toLowerCase() === personObject.name.toLowerCase())) {
  //     alert(`${personObject.name} is already added to the phonebook`)
  //     setNewName('')
  //     setNewNumber('')
  //   } else {
  //     personService.create(personObject).then((returnedPerson) => {
  //       setInitialPersons(initialPersons.concat(returnedPerson))
  //       setNewName('')
  //       setNewNumber('')
  //       alert(`${personObject.name} was succesfully added to the phonebook`)
  //     })
  //   }
  // }

  const addPersons = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber,
      // id: initialPersons.length + 1, // id implemented by json-server
    }

    if (initialPersons.some((person) => person.name.toLowerCase() === personObject.name.toLowerCase())) {
      if (
        window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one ?`)
      ) {
        const personToModify = initialPersons.find(
          (person) => person.name.toLowerCase() === personObject.name.toLowerCase(),
        )
        personService
          .update(personToModify.id, personObject)
          .then((updatedPerson) => {
            setInitialPersons(initialPersons.map((initP) => (initP.id !== personToModify.id ? initP : updatedPerson)))
            setErrorMessage({ message: `${personObject.name}'s phonenumber was succesfully updated`, type: 'success' })
            // setErrorMessage(`${personObject.name}'s phonenumber was succesfully updated`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            // alert(`${personObject.name}'s phonenumber was succesfully updated`)
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            console.log(error.message)
            setErrorMessage({
              message: `Information of ${personObject.name} has already been removed from server`,
              type: 'error',
            })
            // setErrorMessage(`Information of ${personObject.name} has already been removed from server`)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      } else {
        // alert(`Updating ${personObject.name}'s phonenumber aborted`)
        setErrorMessage({ message: `Updating ${personObject.name}'s phonenumber aborted`, type: 'error' })
        // setErrorMessage(`Updating ${personObject.name}'s phonenumber aborted`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setInitialPersons(initialPersons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        // alert(`${personObject.name} was succesfully added to the phonebook`)
        // setErrorMessage(`Added ${personObject.name}`)
        setErrorMessage({ message: `Added ${personObject.name}`, type: 'success' })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  // Delete function without the confirmation window
  // const deletePersons = (id) => {
  //   personService
  //     .eraze(id)
  //     .then((response) => {
  //       if (window.confirm('Delete this ?')) {
  //         alert('Succed 🚀')
  //         console.log(response)
  //         const updatedPersons = initialPersons.filter((person) => person.id !== id)
  //         setInitialPersons(updatedPersons)
  //       } else {
  //         alert('Erazing aborded !!')
  //       }
  //     })
  //     .catch((error) => {
  //       alert('Can not delete this person - error server')
  //       console.log(error)
  //     })
  // }

  const deletePersons = (id) => {
    const personToDelete = initialPersons.find((person) => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .eraze(id)
        .then((response) => {
          alert('Succed 🚀')
          console.log(response)
          const updatedPersons = initialPersons.filter((person) => person.id !== id)
          setInitialPersons(updatedPersons)
        })
        .catch((error) => {
          alert('Can not delete this person - error server')
          console.log(error)
        })
    } else {
      alert('Deletion aborted !!')
    }
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const displayPersons = newFilter
    ? initialPersons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : initialPersons

  return (
    <div className="min-h-screen bg-slate-100">
      <h1 className="text-4xl font-bold">Phonebook</h1>
      {/* <div>debug: {newName}</div> */}
      <Notification message={errorMessage} />
      <Search newFilter={newFilter} handleFilter={handleFilterChange} />
      <Header value={'Add a new'} />
      <Personform
        newName={newName}
        newNumber={newNumber}
        addPersons={addPersons}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Header value={'Numbers'} />
      <Persons list={displayPersons} handleDeletePersons={deletePersons} />
    </div>
  )
}

export default App
