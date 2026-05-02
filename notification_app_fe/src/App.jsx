import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllNotifications from './pages/AllNotifications';
import PriorityInbox from './pages/PriorityInbox';
import { CssBaseline, Container, Box, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-1px',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    }
  },
  palette: {
    background: {
      default: '#f5f5f4', // Stone 100
      paper: '#ffffff',
    },
    primary: {
      main: '#57534e', // Stone 600 (warm dark gray)
      light: '#78716c', // Stone 500
      dark: '#44403c', // Stone 700
    },
    secondary: {
      main: '#8a8683', // Warm mid-gray
    },
    success: {
      main: '#6b7280', // Cool Gray 500 (muted for placement)
    },
    info: {
      main: '#9ca3af', // Cool Gray 400 (muted for result)
    }
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          background: 'rgba(255, 255, 255, 0.7)',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '6px 16px',
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#ffffff',
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Navbar />
        <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
          <Container maxWidth="md" disableGutters>
            <Routes>
              <Route path="/" element={<AllNotifications />} />
              <Route path="/priority" element={<PriorityInbox />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
