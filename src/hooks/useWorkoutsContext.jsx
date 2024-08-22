import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext)

    //checking if we are inside the workoutcontextprovider
    if (!context) {
        throw Error('useWorkoutsContext hook must be used inside of WorkoutContextProvider')
    }

    return context
}