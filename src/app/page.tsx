"use client";

import { useState, useEffect } from "react";
import Dashboard from "./pages/dashboard";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "next-themes";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme } = useTheme(); // Get current theme from next-themes
  const isDarkMode = theme === "dark";

  // Ensure theme state updates correctly in the client
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // MUI theme with dynamic mode
  const muiTheme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light", // Toggle dark/light mode
      primary: {
        main: isDarkMode ? "#90caf9" : "#1976d2",
      },
      background: {
        default: isDarkMode ? "#121212" : "#fff",
        paper: isDarkMode ? "#1e1e1e" : "#f5f5f5",
      },
      text: {
        primary: isDarkMode ? "#fff" : "#000",
      },
    },
  });

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.includes("@")) {
      alert("Please enter a valid email address!");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    const mockJWT = btoa(JSON.stringify({ email, exp: Date.now() + 60 * 60 * 1000 }));
    localStorage.setItem("token", mockJWT);
    setIsLoggedIn(true);
  };

  if (!mounted) return null; // Prevent hydration mismatch issues

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
              LOGIN
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
