import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import AdbIcon from "@mui/icons-material/Adb";

const chrome = {
  bgcolor: "var(--sidebar)",
  color: "var(--sidebar-foreground)",
};

const Header = () => {
  return (
    <AppBar position="static" elevation={0} sx={{ ...chrome, borderBottom: "1px solid var(--sidebar-border)" }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 3 } }}>
        <Toolbar disableGutters sx={{ minHeight: 56 }}>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "var(--sidebar-primary)" }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            DASHBOARD APP
          </Typography>

          <Box sx={{ flexGrow: 1 }}></Box>

          <Avatar
            sx={{
              bgcolor: "var(--sidebar-primary)",
              color: "var(--sidebar-primary-foreground)",
              width: 32,
              height: 32,
              fontSize: "0.85rem",
            }}
          >
            M
          </Avatar>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
