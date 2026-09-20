import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";
import ToyCard from "./ToyCard";


function App() {
  const [toys, setToys] = useState([])
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
    .then (r => {
      if (!r.ok) {throw new Error("failed to get toys")}
      return r.json()
    })
    .then(setToys)
    .catch(err => console.log(err.message))
  }, [])

  const addToy = newToy => setToys(previousToys => [...previousToys, newToy])

  const deleteToy = deletedToyId => setToys(previousToys => previousToys.filter(toys => toys.id !== deletedToyId))

  const likeToy = likedToy => setToys(previousToys => previousToys.map(toy => (toy.id === likedToy.id ? likedToy : toy)))

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} deleteToy={deleteToy} likeToy={likeToy}/>
    </>
  );
}

export default App;
