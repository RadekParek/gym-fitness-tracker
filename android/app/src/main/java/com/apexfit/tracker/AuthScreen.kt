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
fun AuthScreen(onAuthSuccess: () -> Unit) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF121212))
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
                text = "APEXFIT",
                color = Color(0xFFCCFF00),
                fontSize = 42.sp,
                fontWeight = FontWeight.ExtraBold
            )
            Text(
                text = "PUSH YOUR LIMITS",
                color = Color.White,
                fontSize = 14.sp,
                fontWeight = FontWeight.Medium,
                modifier = Modifier.padding(bottom = 48.dp)
            )

            ApexTextField(value = email, onValueChange = { email = it }, label = "Email")
            ApexTextField(value = password, onValueChange = { password = it }, label = "Password")

            Spacer(modifier = Modifier.height(32.dp))

            ApexButton(text = "Join Now", onClick = onAuthSuccess)
            Spacer(modifier = Modifier.height(16.dp))
            ApexButton(text = "I have an account", onClick = onAuthSuccess, primary = false)
        }
    }
}
