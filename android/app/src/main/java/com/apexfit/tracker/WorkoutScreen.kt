package com.apexfit.tracker

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun WorkoutScreen() {
    var selectedExercise by remember { mutableStateOf<Exercise?>(null) }
    val exercises la ExerciseList = remember { 
        listOf(
            Exercise("1", "Bench Press", "Chest"),
            Exercise("2", "Squat", "Legs"),
            Exercise("3", "Deadlift", "Back")
        ) 
    }
    val sets = remember { mutableStateListOf<WorkoutSet>() }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF121212))
            .padding(24.dp)
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            Text(
                text = "ACTIVE WORKOUT",
                color = Color(0xFFCCFF00),
                fontSize = 24.sp,
                fontWeight = FontWeight.ExtraBold,
                modifier = Modifier.padding(bottom = 24.dp)
            )

            Row(
                modifier = Modifier.fillMaxWidth().padding(bottom = 24.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = selectedExercise?.name ?: "SELECT EXERCISE",
                    color = Color.White,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold
                )
                ApexButton(
                    text = "ADD",
                    onClick = { selectedExercise = exercises.first() },
                    primary = false,
                    modifier = Modifier.width(100.dp).height(40.dp)
                )
            }

            LazyColumn(modifier = Modifier.weight(1f)) {
                items(sets) { set ->
                    SetRow(set)
                }
            }

            Row(
                modifier = Modifier.fillMaxWidth().padding(top = 24.dp),
                horizontalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                ApexButton(
                    text = "ADD SET",
                    onClick = { 
                        sets.add(WorkoutSet("set-id", 0f, 0, false)) 
                    },
                    modifier = Modifier.weight(1f)
                )
                ApexButton(
                    text = "FINISH",
                    onClick = { },
                    primary = false,
                    modifier = Modifier.weight(1f)
                )
            }
        }
    }
}

@Composable
fun SetRow(set: WorkoutSet) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp)
            .background(Color(0xFF1E1E1E), RoundedCornerShape(8.dp))
            .border(1.dp, Color(0xFF333333), RoundedCornerShape(8.dp))
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = "Set", color = Color.White, fontWeight = FontWeight.Bold)
        
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            ApexSmallInput(label = "kg", value = set.weight.toString())
            ApexSmallInput(label = "reps", value = set.reps.toString())
        }
        
        Box(
            modifier = Modifier
                .size(24.dp)
                .background(if(set.isCompleted) Color(0xFFCCFF00) else Color.DarkGray, RoundedCornerShape(50))
                .clickable { }
        )
    }
}

@Composable
fun ApexSmallInput(label: String, value: String) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(text = label, color = Color(0xFFB0B0B0), fontSize = 10.sp)
        Text(text = value, color = Color.White, fontWeight = FontWeight.Bold)
    }
}
