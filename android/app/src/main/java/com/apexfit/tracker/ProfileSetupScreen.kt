package com.apexfit.tracker

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun ProfileSetupScreen(onSetupComplete: () -> Unit) {
    var username by remember { mutableStateOf("") }
    var weight by remember { mutableStateOf("") }
    var height by remember { mutableStateOf("") }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF121212))
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
                text = "COMPLETE YOUR PROFILE",
                color = Color.White,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(bottom = 48.dp)
            )

            ApexTextField(value = username, onValueChange = { username = it }, label = "Username")
            ApexTextField(value = weight, onValueChange = { weight = it }, label = "Weight (kg)")
            ApexTextField(value = height, onValueChange = { height = it }, label = "Height (cm)")

            Spacer(modifier = Modifier.height(32.dp))

            ApexButton(text = "Start Training", onClick = onSetupComplete)
        }
    }
}
