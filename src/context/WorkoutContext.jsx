import {createContext, useReducer} from "react";

export const WorkoutContext = createContext();

export const workoutReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload // updates all the workouts to new workouts
            }
        case 'CREATE_WORKOUTS':
            return {
                    workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            }
        case 'UPDATE_WORKOUT': {
            const updatedWorkout = action.payload;
            const updatedWorkouts = state.workouts.map(workout => {
                if (workout._id === updatedWorkout._id) {
                    // swap workout for the new one if the ids match
                    return updatedWorkout
                }

                // return each workout
                return workout
            });
            return {
                workouts: updatedWorkouts
            }

        }
        default:
            return state
    }
}

export const WorkoutContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutReducer, {
        workouts: null
    })
    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}