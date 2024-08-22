import {useState} from 'react'
import axios from 'axios';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const baseURL = import.meta.env.VITE_API_BASE_URL

const WorkoutForm = () => {
    // dispatch for useContext
    const {dispatch} = useWorkoutsContext();
    // input state variables:
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'))
        const user_id = user.email

        // set up object to send to the database
        const workout = {title, load, reps, user_id}

        // HTTP Request:
        try {
            const response = await axios.post(`${baseURL}/api/workouts/`, workout, {
                headers : {
                    'Content-Type': 'application/json'
                }
            });
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            console.log('new workout added', response.data);
            dispatch({type: 'CREATE_WORKOUTS', payload: response.data})
            
        } catch (error) {
            setError(error.message)
        }

        
    }

  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add A New Workout</h3>

        <label>Exercise Title:</label>
        <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
        />

        <label>Load (in kg):</label>
        <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
        />

        <label>Reps:</label>
        <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
        />

        <button>Add Workout</button>
        {error && <div className='error'>{error}</div>}
    </form>

  )
}

export default WorkoutForm
