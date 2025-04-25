import React, { useState } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  alpha
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import VideoBackground from './components/VideoBackground';

interface Task {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta';
  status: 'pendente' | 'em_andamento' | 'concluida';
  responsavel: string;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: 'transparent',
      paper: alpha('#1a1a1a', 0.8),
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha('#1a1a1a', 0.8),
          backdropFilter: 'blur(8px)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  const handleAddTask = () => {
    setSelectedTask(undefined);
    setOpenForm(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedTask(undefined);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <VideoBackground />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="fixed" elevation={0}>
          <Toolbar>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Sistema de Gerenciamento de Tarefas
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mr: 2,
                opacity: 0.8
              }}
            >
              Bruno Sandoval
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddTask}
              sx={{
                borderRadius: 2,
                px: 3,
                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              }}
            >
              Nova Tarefa
            </Button>
          </Toolbar>
        </AppBar>
        <Container 
          maxWidth="lg" 
          sx={{ 
            mt: 10,
            mb: 4,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <TaskList onEditTask={handleEditTask} />
          {openForm && (
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1300,
                p: 2
              }}
            >
              <TaskForm
                onClose={handleCloseForm}
                taskToEdit={selectedTask}
              />
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
