# Referências verificadas do frontend

Caminhos relativos à raiz ca-cognitio-frontend. Releia a implementação atual antes de adaptar; estes exemplos orientam estrutura, não são modelos livres de defeitos.

| Responsabilidade | Referências |
| --- | --- |
| Fluxo de cadastro simples | src/pages/core/pergunta/index.js, novo/index.js, editar/[id].js e visualizar/[id].js |
| Formulário compartilhado | src/components/forms/core/PerguntaForm.js |
| Outros domínios para comparação | src/pages/core/dominio/, src/pages/core/organizacao/, src/pages/core/prontuario/ |
| Slice e actions reutilizáveis | src/store/reducers/baseSlice.js e src/store/actions/genericActions.js |
| Composição concreta e registro | src/store/reducers/pergunta.js e src/store/reducers/index.js |
| Cliente HTTP autenticado | src/utils/api.js |
| Tabela e operações de linha | src/utils/tabela-dinamica/tabelaDinamica.js |
| Permissões e filtro de menu | src/hooks/usePermissions.js e src/utils/menu-permissions.js |
| Navegação | src/menu-items/index.js, pages.js e other.js |
| Traduções observadas | src/utils/locales/en.json |
| Feedback e erros | src/store/reducers/snackbar.js e src/errors/hooks/use-api-error.js |
| DTOs e mensagens especializadas | src/dto/prontuario/ e src/validation/messages/ |

## Compatibilidade que precisa ser conferida

- O hook usePermissions retorna canRead, canCreate, canEdit, canDelete e loading. A listagem de Pergunta usa canView, que não é retornado. Use canRead para showView se a versão atual mantiver esse contrato.
- TabelaDinamica usa row.original.ID para visualizar, editar e excluir. As entidades têm chaves como id_pergunta. Confira a resposta real e adapte a apresentação quando o alias ID não vier da API; não presuma que accessor da coluna muda o identificador das ações.
- O reducer de Pergunta compõe e exporta as actions diretamente. src/store/actions/pergunta.js tenta importar perguntaSlice, que não é exportado no reducer observado. Siga o caminho de imports realmente utilizado, sem duplicar esse arquivo incompatível.
- createEntityActions usa GET /<endpoint>, GET /<endpoint>/search, GET /<endpoint>/editar/:id, POST /<endpoint>, PUT /<endpoint>/editar/:id, PUT /<endpoint>/:id para softDelete e DELETE /<endpoint>/:id para destroy. Nem todo router precisa oferecer todas essas operações. Para visualizar, confira a necessidade de GET /visualizar/:id em vez de reutilizar editar, principalmente quanto a permissões e resposta.
- setList e setSearch esperam { data, page, pageSize, total, totalPages }. setById espera o item direto. Não confunda response.data do Axios com data interno da página.
- create/update retornam dados e relançam erros; softDelete e destroy observados capturam erros sem relançar, portanto .then não prova sucesso. Garanta um resultado verificável na integração nova; uma mudança compartilhada exige análise de impacto.
- PerguntaForm usa try/catch externo com promises sem await/catch e compara IDs diferentes em alguns Autocomplete. Não reproduza esses problemas. O estado de view também precisa bloquear os controles completos e os handlers.
- A listagem de Pergunta define ordenação mas não envia todos os campos na busca, usa título de empresa e recarrega com fetch após search. Preserve a consulta correta na nova implementação, com seus filtros e ordenação.
- Não escolha src/utils/apiRepository.js só pelo nome: seus caminhos REST convencionais diferem das rotas /editar usadas pelas actions atuais. A integração inspecionada usa src/utils/api.js.

Essas observações servem para gerar corretamente a nova funcionalidade; não autorizam uma limpeza geral dos exemplos.
