import { Router } from 'express';
import { PessoaController } from './controllers/PessoaController';
import { AgendamentoController } from './controllers/AgendamentoController';

const routes = Router();

//rotas de pessoas
routes.get('/pessoas', new PessoaController().listAll);
routes.get('/pessoas/:idCliente/agendamentos', new PessoaController().listAllAgendamentosCliente);
routes.get('/pessoas/:id', new PessoaController().buscaByID);
routes.post('/pessoas', new PessoaController().create);
routes.post('/pessoas/:idCliente/createagendamento', new PessoaController().createAgendamento);
routes.put('/pessoas/:id/atualizarpessoa', new PessoaController().update);
routes.delete('/pessoas/:id/removepessoa', new PessoaController().remove);
routes.post('/pessoas/:id/restorepessoa', new PessoaController().restore);

//rotas de agendamentos
routes.get('/agendamentos', new AgendamentoController().listAll);
routes.get('/agendamentos/:id', new AgendamentoController().buscaByID);
routes.post('/agendamentos', new AgendamentoController().create);
routes.put('/agendamentos/:id/atualizaragendamento', new AgendamentoController().update);
routes.delete('/agendamentos/:id/removeagendamento', new AgendamentoController().remove);
routes.post('/agendamentos/:id/restoreagendamento', new AgendamentoController().restore);


export default routes;