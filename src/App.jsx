import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css'

// import pages
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import SingleWorkout from './pages/singleWorkout'

const App = () => {

  const {user} = useAuthContext();

  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar/>
        <div className='pages'>
          <Routes>
            {/* if we have a user, show the homepage, else go to login */}
            <Route path='/' element={user ? <Home/> : <Navigate to='/login'/>}/>

            {/* if we dont have a user show the login, if we do go to home */}
            <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>

            {/* if we dont have a user show the signup, if we do go to home */}
            <Route path='/signup' element={!user ? <Signup/> : <Navigate to='/'/>}/>

            {/* if we have a user go to single workout, else go to login */}
            <Route path='/:id' element={user ? <SingleWorkout/> : <Navigate to='/login'/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App