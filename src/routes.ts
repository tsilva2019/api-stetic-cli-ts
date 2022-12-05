import { Router } from 'express';
import { PessoaController } from './controllers/PessoaController';
import { AgendamentoController } from './controllers/AgendamentoController';
import { LoginController } from './controllers/LoginController';
import { authMiddleware } from './middlewares/authMiddleware';
import { HabitosDiariosController } from './controllers/HabitosDiariosController';

const routes = Router();

routes.post('/login', new LoginController().login);
routes.post('/pessoas', new PessoaController().create);
routes.use(authMiddleware);

//rotas de login
routes.post('/validaToken', new LoginController().validaToken)
routes.get('/profile', new LoginController().getProfile);

//rotas de pessoas
routes.get('/pessoas', new PessoaController().listAll);
routes.get('/pessoas/:idCliente/agendamentos', new PessoaController().listAllAgendamentosCliente);
routes.get('/pessoas/:id', new PessoaController().buscaByID);
routes.post('/pessoas', new PessoaController().create);
routes.post('/pessoas/:idCliente/createagendamento', new PessoaController().createAgendamento);
routes.post('/pessoas/:id/restorepessoa', new PessoaController().restore);
routes.put('/pessoas/:id/atualizarpessoa', new PessoaController().update);
routes.delete('/pessoas/:id/removepessoa', new PessoaController().remove);

//rotas de agendamentos
routes.get('/agendamentos', new AgendamentoController().listAll);
routes.get('/agendamentos/:id', new AgendamentoController().buscaByID);
routes.post('/agendamentos', new AgendamentoController().create);
routes.put('/agendamentos/:id/atualizaragendamento', new AgendamentoController().update);
routes.delete('/agendamentos/:id/removeagendamento', new AgendamentoController().remove);
routes.post('/agendamentos/:id/restoreagendamento', new AgendamentoController().restore);

//rotas de habitos diarios
routes.get('/habitosDiarios', new HabitosDiariosController().listAll);
routes.get('/habitosDiarios/:id', new HabitosDiariosController().buscaByID);
routes.post('/habitosDiarios/:idCliente', new HabitosDiariosController().create);
routes.put('/habitosDiarios/:id/atualizarhabito', new HabitosDiariosController().update);
// routes.delete('/agendamentos/:id/removeagendamento', new AgendamentoController().remove);
// routes.post('/agendamentos/:id/restoreagendamento', new AgendamentoController().restore);

export default routes;