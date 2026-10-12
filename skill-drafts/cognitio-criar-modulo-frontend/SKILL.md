---
name: cognitio-criar-modulo-frontend
description: Criar a interface de entidades do backend Cognitio no frontend, seguindo os cadastros existentes em Next.js, Material UI, Formik, Yup e Redux. Use para adicionar módulos, telas de listagem, criação, edição ou visualização e sua integração com a API deste projeto.
---

# Criar módulos no frontend Cognitio

Implemente a interface solicitada seguindo o fluxo real do frontend. Confirme a raiz pelo package.json e src/pages, leia os AGENTS.md aplicáveis, inclusive o do diretório pai, e respeite suas regras de comunicação. Esta skill complementa o trabalho do backend, mas não depende de executar outra skill.

## Delimitar e descobrir

Identifique entidade, operações pedidas, domínio da rota e campos. Para um cadastro completo, integre listagem, criação, edição, visualização, formulário, acesso à API, registro do reducer, traduções e navegação pertinente. Para um pedido parcial, crie apenas as partes necessárias. Não gere uma classe de entidade, serviço paralelo ou endpoints apenas por analogia com o backend.

Procure a entidade e módulos semelhantes antes de criar arquivos. Use pesquisas delimitadas a src e ao backend irmão, excluindo node_modules, builds e arquivos de credenciais. Leia o fluxo completo mais próximo; os caminhos em [references/padroes.md](references/padroes.md) orientam essa escolha e registram incompatibilidades que precisam ser verificadas antes de adaptar exemplos.

Consulte no backend irmão `../ca-cognitio-backend` o modelo em prisma/schema.prisma, interfaces, validação dos controllers, router e use cases da entidade. Confirme campos, chave primária, tipos, nulabilidade, defaults, relações, entradas de create/update, respostas, métodos HTTP, paginação e código de aplicação. O schema sozinho não define o payload HTTP. Preserve os identificadores originais, como id_entidade e nm_entidade. Não envie relações expandidas ou campos internos apenas porque vieram na consulta.

Se o backend estiver indisponível, procure contratos documentados e consumidores existentes. Pergunte somente pelo contrato ou decisão de domínio indispensável que continuar ausente. Não invente endpoints nem simule integração concluída. Uma entidade criada sem rotas no backend não implica que exista CRUD HTTP. Informe a dependência; não altere o backend sem escopo para isso.

Apresente um plano curto com referência escolhida e arquivos afetados antes de implementar.

## Implementar o fluxo

Use o Pages Router e JavaScript já adotados, aliases de jsconfig.json, Page, Layout/getLayout, MainCard e componentes MUI existentes. Preserve os mecanismos de sessão e carregamento do módulo equivalente. Não introduza App Router, biblioteca de tabela ou arquitetura de estado nova.

Reutilize createEntitySlice e createEntityActions quando compatíveis com o contrato; confira exports/imports e registre o reducer em src/store/reducers/index.js. Para uma operação não atendida pela factory, use uma action específica com utils/api, mantendo interceptors e tratamento de erro. Não dispare HTTP diretamente do formulário. Antes de mudar uma factory compartilhada, verifique os consumidores e prefira a menor adaptação que atenda à nova entidade.

Monte a listagem com TabelaDinamica, colunas do domínio e tipos de filtro corretos. Preserve paginação, ordenação, seleção e pesquisa. Converta pageIndex zero-based em page one-based; envie filtro, orderBy e orderDir conforme o contrato e mantenha-os no recarregamento após mutações. Confira como a tabela obtém o identificador de cada linha. Preserve a chave original e, se necessário, adapte os dados de apresentação à propriedade ID exigida pela tabela, sem enviar esse alias no payload.

Use um formulário compartilhado com initialValues, title e state nas páginas pertinentes. Derive isView/isEdit/isCreate; mantenha Formik como fonte dos campos e Yup compatível com as regras da API. Inicialize valores controlados e converta vazios, números, booleanos e datas explicitamente conforme o contrato. Identificadores e auditoria permanecem somente leitura quando aplicável, sem inventar campos ausentes no modelo.

Em Autocomplete, mantenha o ID no Formik quando o contrato assim exigir, obtenha o objeto selecionado das opções e compare objetos pelo mesmo identificador em isOptionEqualToValue. Preserve touched/error e trate opções ainda não carregadas, relações nulas e limpeza. Em view, bloqueie o Autocomplete inteiro, inclusive seleção e limpeza; somente readOnly no TextField interno é insuficiente. Impeça submit e mutações também nos handlers.

Carregue por ID apenas quando a rota estiver pronta. Trate carregamento, erro, registro ausente e mudança de ID sem exibir dados antigos ou deixar um Loader infinito. Use reinitialização do Formik apenas quando necessária ao fluxo, evitando sobrescrever alterações do usuário por atualizações incidentais.

Use async/await com try/catch/finally ou encadeamento com catch para mutações; libere isSubmitting ao concluir. Use useApiError e openSnackbar conforme o padrão local. Só mostre sucesso e navegue após confirmação da operação. Exclusão deve respeitar soft delete versus delete físico e ter confirmação; não exponha uma operação só porque a factory a oferece.

## Integrar permissões e textos

Consulte usePermissions com o código de aplicação correto. Confira os nomes realmente retornados pelo hook; controle listagem, botões e acesso direto às páginas conforme as permissões e loading. Não confunda ocultar botão com autorização do servidor. Não envie uma expressão de acesso calculada no cliente para substituir as restrições aplicadas pelo backend.

Adicione navegação na seção apropriada de src/menu-items, usando identificadores compatíveis com utils/menu-permissions e ícones existentes. Informe eventual cadastro de aplicação/permissão necessário no backend; não conceda acesso automaticamente.

Pesquise traduções existentes e adicione as chaves necessárias aos catálogos efetivamente carregados. Preserve react-intl para títulos, campos, ações, validações e feedback da nova funcionalidade. Verifique DTOs e helpers existentes antes de criar transformações novas. Para fórmulas, preserve identificadores e expressões e valide antes de enviar.

## Validar e entregar

Leia package.json atual antes de escolher comandos. Execute npm run lint quando disponível, testes relevantes quando existentes e npm run build quando apropriado. No estado inspecionado, há build mas não scripts lint/test e não há node_modules local; não declare checks executados nessas condições nem crie scripts ou instale dependências apenas para cumprir uma lista. Se possível use verificações locais existentes e informe os limites.

Revise os imports, reducer registrado, chaves de tradução, URLs, identificadores, payloads e contratos. Quando houver runtime disponível, exercite listagem vazia, busca/paginação/ordenação, criação válida/inválida, edição, visualização bloqueada, falha da API, exclusão e permissões; confira console e campos controlados. Use ambiente/dados de teste para mutações. Para lógica nova relevante, adicione testes compatíveis com a estrutura existente.

Informe arquivos criados/alterados, operações implementadas, referência seguida, verificações realmente executadas e pendências concretas de API ou configuração. Diferencie revisão estática, build e execução no navegador. Não reformate ou corrija módulos alheios como efeito da geração.
