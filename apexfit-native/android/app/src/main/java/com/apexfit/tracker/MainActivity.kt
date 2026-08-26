package com.apexfit.tracker

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.navigation.compose.rememberNavController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable

// ApexFit Final Build Trigger v1.1
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            ApexFitTheme {
                val navController = rememberNavController()
                NavHost(navController = navController, startDestination = Screen.Auth.route) {
                    composable(Screen.Auth.route) {
                        AuthScreen(onAuthSuccess = { navController.navigate(Screen.RoleSelection.route) })
                    }
                    composable(Screen.RoleSelection.route) {
                        RoleSelectionScreen(onRoleSelected = { navController.navigate(Screen.ProfileSetup.route) })
                    }
                    composable(Screen.ProfileSetup.route) {
                        ProfileSetupScreen(onSetupComplete = { navController.navigate(Screen.Home.route) })
                    }
                    composable(Screen.Home.route) {
                        HomeScreen(
                            onStartWorkout = { navController.navigate("workout") },
                            onOpenProfile = { navController.navigate(Screen.Profile.route) }
                        )
                    }
                    composable("workout") {
                        WorkoutScreen()
                    }
                    composable(Screen.Profile.route) {
                        ProfileScreen(onBack = { navController.navigate(Screen.Home.route) })
                    }
                }
            }
        }
    }
}

@Composable
fun ApexFitTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = androidx.compose.material3.darkColorScheme(
            primary = Color(0xFFCCFF00),
            secondary = Color(0x00E5FF),
            background = Color(0xFF121212),
            surface = Color(0xFF1E1E1E)
        ),
        content = content
    )
}
