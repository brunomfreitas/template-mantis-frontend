// third-party
import { combineReducers } from 'redux';

// project import
// import dominio from './dominio';
// import dominioValor from './dominio-valor';
import menu from './menu';
import preAutoDeclaracao from './pre-auto-declaracao';
import prontuarioReducer from './prontuario';
import site from './site';
import snackbar from './snackbar';

// ==============================|| NOVOS REDUCERS ||============================== //
import aplicacaoReducer from './aplicacao';
import dominioReducer from './dominio';
import dominioValorReducer from './dominio-valor';
import empresaReducer from './empresa';
import empresaPessoaReducer from './empresa-pessoa';
import figuraFundoReducer from './figura-fundo';
import grupoAplicacaoReducer from './grupo-aplicacao';
import grupoAplicacaoPermissaoReducer from './grupo-aplicacao-permissao';
import grupoAplicacaoRestricaoReducer from './grupo-aplicacao-restricao';
import grupoSegurancaReducer from './grupo-seguranca';
import grupoSiteReducer from './grupo-site';
import grupoUsuarioReducer from './grupo-usuario';
import meReducer from './me';
import organizacaoReducer from './organizacao';
import companyReducer from './company';
import pacReducer from './pac';
import perguntaReducer from './pergunta';
import pessoaReducer from './pessoa';
import prontuarioPerguntaReducer from './prontuario-pergunta';
import usuarioReducer from './usuario';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
    site,
    menu,
    snackbar,
    dominio: dominioReducer,
    dominioValor: dominioValorReducer,
    preAutoDeclaracao,
    organizacao: organizacaoReducer,
    pessoa: pessoaReducer,
    empresa: empresaReducer,
    empresaPessoa: empresaPessoaReducer,
    usuario: usuarioReducer,
    aplicacao: aplicacaoReducer,
    grupoSeguranca: grupoSegurancaReducer,
    grupoSite: grupoSiteReducer,
    grupoUsuario: grupoUsuarioReducer,
    grupoAplicacao: grupoAplicacaoReducer,
    grupoAplicacaoPermissao: grupoAplicacaoPermissaoReducer,
    grupoAplicacaoRestricao: grupoAplicacaoRestricaoReducer,
    me: meReducer,
    prontuario: prontuarioReducer,
    pergunta: perguntaReducer,
    prontuarioPergunta: prontuarioPerguntaReducer,
    pac: pacReducer,
    figuraFundo: figuraFundoReducer,
    company: companyReducer
});

export default reducers;
