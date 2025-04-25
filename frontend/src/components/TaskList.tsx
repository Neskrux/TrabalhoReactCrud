import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  Box,
  Fade,
  Card,
  Grid,
  Tooltip,
  LinearProgress
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Flag as FlagIcon
} from '@mui/icons-material';
import axios from 'axios';

interface Task {
  id: number;
  titulo: string;
  descricao: string;
  data_criacao: string;
  data_conclusao: string | null;
  prioridade: 'baixa' | 'media' | 'alta';
  status: 'pendente' | 'em_andamento' | 'concluida';
  responsavel: string;
}

interface TaskListProps {
  onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEditTask }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'error';
      case 'media': return 'warning';
      case 'baixa': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluida': return 'success';
      case 'em_andamento': return 'warning';
      case 'pendente': return 'default';
      default: return 'default';
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'concluida': return 100;
      case 'em_andamento': return 50;
      case 'pendente': return 0;
      default: return 0;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Fade in timeout={1000}>
      <Box>
        <Card 
          sx={{ 
            p: 3,
            mb: 3,
            background: 'rgba(26, 26, 26, 0.8)',
            backdropFilter: 'blur(8px)',
            borderRadius: 2,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            Minhas Tarefas
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Gerencie suas tarefas de forma eficiente
          </Typography>
        </Card>

        <Box sx={{ display: 'grid', gap: 3 }}>
          {tasks.map((task) => (
            <Box key={task.id}>
              <Card 
                sx={{ 
                  p: 2,
                  background: 'rgba(26, 26, 26, 0.8)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {task.titulo}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
                      {task.descricao}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Editar">
                      <IconButton 
                        onClick={() => onEditTask(task)} 
                        size="small"
                        sx={{ 
                          color: '#2196f3',
                          '&:hover': { 
                            color: '#21cbf3',
                            transform: 'scale(1.1)',
                          }
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton 
                        onClick={() => handleDelete(task.id)} 
                        size="small"
                        sx={{ 
                          color: '#f50057',
                          '&:hover': { 
                            color: '#ff4081',
                            transform: 'scale(1.1)',
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TimeIcon sx={{ opacity: 0.7, fontSize: 20 }} />
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      {formatDate(task.data_criacao)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon sx={{ opacity: 0.7, fontSize: 20 }} />
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      {task.responsavel}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip 
                    icon={<FlagIcon />}
                    label={task.prioridade} 
                    color={getPrioridadeColor(task.prioridade) as any}
                    size="small"
                    sx={{ 
                      fontWeight: 'bold',
                      minWidth: 90
                    }}
                  />
                  <Chip 
                    label={task.status} 
                    color={getStatusColor(task.status) as any}
                    size="small"
                    sx={{ 
                      fontWeight: 'bold',
                      minWidth: 100
                    }}
                  />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={getStatusProgress(task.status)}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                      }
                    }}
                  />
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Fade>
  );
};

export default TaskList; 