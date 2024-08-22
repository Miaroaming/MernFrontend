import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
//import custom context hook
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
// date fns - format date to now
import {formatDistanceToNow} from 'date-fns'

import { ImBin } from "react-icons/im";
import { GrEdit } from "react-icons/gr";

const baseURL = import.meta.env.VITE_API_BASE_URL

const WorkoutDetails = ({workout}) => {

    // bring in dispatch method
    const {dispatch} = useWorkoutsContext()
    // use navigate init
    const navigate = useNavigate()
    // state variables for edit
    const [isEditing, setIsEditing] = useState(false);
    // edit form inputs
    const [editTitle, setEditTitle] = useState(workout.title);
    const [editLoad, setEditLoad] = useState(workout.load);
    const [editReps, setEditReps] = useState(workout.reps);


    const handleDelete = async () => {
        console.log(baseURL);
        const response = await axios.delete(`${baseURL}/api/workouts/${workout._id}`)
    
        const json = await response.data
    
        if (response.status === 200 ) {
          console.log(json)
          dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    const handleEdit = () => {
      setIsEditing(true);
    }

    const handleSubmitEdit = async () => {
      const updatedWorkout = {
        title: editTitle,
        load: editLoad,
        reps: editReps
      };
  
      try {
        const response = await axios.patch(
          `${baseURL}/api/workouts/${workout._id}`,
          updatedWorkout
        );
        const updatedData = response.data;

        if (response.status === 200) {
          console.log(response);
          console.log(updatedData);
          dispatch({type: 'UPDATE_WORKOUT', payload: updatedData});
          setIsEditing(false);
        }

      } catch (error) {
        console.error('Error updating workout:', error);
      }
  
    }
  
    const handleCancelEdit = () => {
      setEditTitle(workout.title);
      setEditLoad(workout.load);
      setEditReps(workout.reps);
      setIsEditing(false);
    }
  
    const handleNavigate = () => {
      let path = `/${workout._id}`
      navigate(path)
    }

  return (
    <div className='workout-details'>
        {isEditing ? (
          <div className='edit-modal'>
          <label>Edit Exercise Title:</label>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <label>Edit Load:</label>
          <input
            type="number"
            value={editLoad}
            onChange={(e) => setEditLoad(e.target.value)}
          />

          <label>Edit Reps:</label>
          <input
            type="number"
            value={editReps}
            onChange={(e) => setEditReps(e.target.value)}
          />

          <button onClick={handleSubmitEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
        ) : (
          <>
            <div id='title-icons'>
              <h4>{workout.title}</h4>
              <p><strong>Created by: </strong>{workout.user_id}</p>

            <button onClick={handleNavigate}>Read more</button>

            {/* delete and edit buttons */}
              <div id='icons'>
                  <span onClick={handleEdit}><GrEdit /></span>
                  <span onClick={handleDelete}><ImBin /></span>
              </div>
            </div>
            
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {includeSeconds: true}, {addSuffix: true})}</p>
          </>
        )}
      
    </div>
  )
}

export default WorkoutDetails
