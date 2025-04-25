const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Rota de teste para verificar conexão com banco
router.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) as total FROM tasks');
    res.json({ 
      message: 'Conexão com banco de dados OK!',
      totalTarefas: rows[0].total,
      status: 'success'
    });
  } catch (error) {
    console.error('Erro ao testar banco:', error);
    res.status(500).json({ 
      error: 'Erro ao conectar com banco de dados',
      details: error.message,
      status: 'error'
    });
  }
});

// Listar todas as tarefas
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks ORDER BY data_criacao DESC');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao listar tarefas:', error);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

// Buscar uma tarefa específica
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar tarefa:', error);
    res.status(500).json({ error: 'Erro ao buscar tarefa' });
  }
});

// Criar nova tarefa
router.post('/', async (req, res) => {
  const { titulo, descricao, prioridade, status, responsavel } = req.body;
  
  if (!titulo || !responsavel) {
    return res.status(400).json({ error: 'Título e responsável são obrigatórios' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO tasks (titulo, descricao, prioridade, status, responsavel) VALUES (?, ?, ?, ?, ?)',
      [titulo, descricao, prioridade, status, responsavel]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

// Atualizar tarefa
router.put('/:id', async (req, res) => {
  const { titulo, descricao, prioridade, status, data_conclusao } = req.body;
  
  if (!titulo) {
    return res.status(400).json({ error: 'Título é obrigatório' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE tasks SET titulo = ?, descricao = ?, prioridade = ?, status = ?, data_conclusao = ? WHERE id = ?',
      [titulo, descricao, prioridade, status, data_conclusao, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});

// Deletar tarefa
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
});

module.exports = router; 