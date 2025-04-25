-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS task_management;
USE task_management;

-- Criação da tabela de tarefas
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_conclusao DATETIME,
    prioridade ENUM('baixa', 'media', 'alta') DEFAULT 'media',
    status ENUM('pendente', 'em_andamento', 'concluida') DEFAULT 'pendente',
    responsavel VARCHAR(100) NOT NULL
);

-- Inserção de dados de exemplo
INSERT INTO tasks (titulo, descricao, prioridade, status, responsavel) VALUES
('Desenvolver Frontend', 'Criar interface do usuário usando React e Material-UI', 'alta', 'em_andamento', 'Bruno Sandoval'),
('Implementar API', 'Desenvolver endpoints REST com Node.js e Express', 'alta', 'pendente', 'Bruno Sandoval'),
('Configurar Banco de Dados', 'Configurar MySQL e criar queries', 'media', 'concluida', 'Bruno Sandoval'),
('Testar Sistema', 'Realizar testes de integração e funcionais', 'media', 'pendente', 'Bruno Sandoval'),
('Documentar Projeto', 'Criar documentação técnica e README', 'baixa', 'em_andamento', 'Bruno Sandoval'); 