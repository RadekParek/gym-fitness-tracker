package com.apexfit.tracker

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun ApexButton(
    text: String,
    onClick: () -> Unit,
    primary: Boolean = true,
    modifier: Modifier = Modifier
) {
    val bgColor = if (primary) Color(0xFFCCFF00) else Color.Transparent
    val textColor = if (primary) Color(0xFF121212) else Color(0xFFCCFF00)
    val borderColor = if (primary) Color.Transparent else Color(0xFFCCFF00)

    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp)
            .background(bgColor, RoundedCornerShape(8.dp))
            .border(2.dp, borderColor, RoundedCornerShape(8.dp))
            .clickable { onClick() },
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = text.uppercase(),
            color = textColor,
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
fun ApexTextField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    modifier: Modifier = Modifier
) {
    Column(modifier = modifier.fillMaxWidth().padding(vertical = 8.dp)) {
        Text(
            text = label.uppercase(),
            color = Color(0xFFB0B0B0),
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 4.dp)
        )
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xFF1E1E1E), RoundedCornerShape(8.dp))
                .border(1.dp, Color(0xFF333333), RoundedCornerShape(8.dp))
                .padding(16.dp)
        ) {
            // Simplified text input for the architecture demo
            Text(
                text = if (value.isEmpty()) "Enter ${label}..." else value,
                color = if (value.isEmpty()) Color(0xFF666666) else Color.White
            )
        }
    }
}
