import { useEffect, useRef, useState } from 'react'
import Thrash from '../../assets/icons8-trash.svg'
import api from '../../services/api'
import './style.css'

function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers(){

    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)

  }

  async function createUsers(){

    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })

    getUsers()

  }

   async function deleteUser(id){

    await api.delete(`/usuarios/${id}`)

   getUsers()

  }

  useEffect (() => {
    getUsers()
  }, [])

  return (

    <div className='container'>
      <form >
        <h1>User Registration</h1>
        <input placeholder='Name' name='name' type='text' ref={inputName}/>
        <input placeholder='Age' name='idade' type='number' ref={inputAge}/>
        <input placeholder='Email' name='email' type='text' ref={inputEmail}/>
        <button type='button' onClick={createUsers}>Register</button>
      </form>

      {users.map((user) =>
        <div key={user.id} className='card'>
          <div>
            <p>Name: <span>{user.name}</span> </p>
            <p>Age: <span>{user.age}</span> </p>
            <p>Email: <span>{user.email}</span> </p>
          </div>

          <button onClick={() => deleteUser(user.id)}>
            <img src={Thrash} alt="Trass can" />
          </button>
        </div>
      )}

    </div>
  )
}

export default Home
