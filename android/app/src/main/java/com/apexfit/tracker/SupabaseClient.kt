package com.apexfit.tracker

import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

object SupabaseClient {
    fun getExercises(): Flow<List<Exercise>> = flow {
        emit(listOf(
            Exercise("uuid-1", "Bench Press", "Chest"),
            Exercise("uuid-2", "Squat", "Legs"),
            Exercise("uuid-3", "Deadlift", "Back"),
            Exercise("uuid-4", "Overhead Press", "Shoulders"),
        ))
    }

    suspend fun createWorkout(name: String, userId: String): String {
        return "workout-uuid-123"
    }

    suspend fun addSet(workoutId: String, exerciseId: String, weight: Float, reps: Int): Boolean {
        return true
    }
}

data class Exercise(val id: String, val name: String, val muscleGroup: String)
data class WorkoutSet(val id: String, val weight: Float, val reps: Int, val isCompleted: Boolean)
