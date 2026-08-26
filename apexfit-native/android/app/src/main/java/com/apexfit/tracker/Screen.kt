package com.apexfit.tracker

sealed class Screen(val route: String) {
    object Auth : Screen("auth")
    object RoleSelection : Screen("role_selection")
    object ProfileSetup : Screen("profile_setup")
    object Home : Screen("home")
}
