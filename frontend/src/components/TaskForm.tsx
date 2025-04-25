import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Card,
  IconButton,
  Fade,
  Tooltip,
  SelectChangeEvent,
  Stack
} from '@mui/material';
import { Close as CloseIcon, Save as SaveIcon } from '@mui/icons-material';
import axios from 'axios';

interface Task {
  id?: number;
  titulo: string;
  descricao: string;
  prioridade: string;
  status: string;
  responsavel: string;
}

interface TaskFormProps {
  onClose: () => void;
  taskToEdit?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, taskToEdit }) => {
  const [task, setTask] = useState<Task>({
    titulo: '',
    descricao: '',
    prioridade: 'baixa',
    status: 'pendente',
    responsavel: ''
  });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (taskToEdit?.id) {
        await axios.put(`http://localhost:3001/api/tasks/${taskToEdit.id}`, task);
      } else {
        await axios.post('http://localhost:3001/api/tasks', task);
      }
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  return (
    <Fade in timeout={800}>
      <Card
        sx={{
          p: 3,
          background: 'rgba(26, 26, 26, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          maxWidth: 600,
          margin: 'auto'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {taskToEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
          </Typography>
          <Tooltip title="Fechar">
            <IconButton
              onClick={onClose}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  color: '#ff4081',
                  transform: 'scale(1.1)'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              name="titulo"
              label="Título"
              value={task.titulo}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)'
                  },
                  '&:hover fieldset': {
                    borderColor: '#2196f3'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2196f3'
                  }
                }
              }}
            />

            <TextField
              name="descricao"
              label="Descrição"
              value={task.descricao}
              onChange={handleChange}
              required
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)'
                  },
                  '&:hover fieldset': {
                    borderColor: '#2196f3'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2196f3'
                  }
                }
              }}
            />

            <FormControl fullWidth>
              <InputLabel>Prioridade</InputLabel>
              <Select
                name="prioridade"
                value={task.prioridade}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.23)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2196f3'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2196f3'
                  }
                }}
              >
                <MenuItem value="baixa">Baixa</MenuItem>
                <MenuItem value="media">Média</MenuItem>
                <MenuItem value="alta">Alta</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={task.status}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.23)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2196f3'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2196f3'
                  }
                }}
              >
                <MenuItem value="pendente">Pendente</MenuItem>
                <MenuItem value="em_andamento">Em Andamento</MenuItem>
                <MenuItem value="concluida">Concluída</MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="responsavel"
              label="Responsável"
              value={task.responsavel}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)'
                  },
                  '&:hover fieldset': {
                    borderColor: '#2196f3'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2196f3'
                  }
                }
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    borderColor: '#ff4081',
                    color: '#ff4081'
                  }
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #21cbf3 30%, #2196f3 90%)',
                    transform: 'scale(1.02)'
                  }
                }}
              >
                {taskToEdit ? 'Atualizar' : 'Salvar'}
              </Button>
            </Box>
          </Stack>
        </form>
      </Card>
    </Fade>
  );
};

export default TaskForm;