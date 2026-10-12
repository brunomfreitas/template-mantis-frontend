import MainCard from 'components/MainCard';
import Layout from 'layout';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { dispatch } from 'store';
import { update } from 'store/reducers/grupo-aplicacao-permissao';
import { update as updateRestricao } from 'store/reducers/grupo-aplicacao-restricao';
import TabelaGrupoAplicacaoPermissao from 'utils/tabela-dinamica/tabela-grupo-aplicacao-permissao';
import DialogAplicacao from '../dialogs/DialogAplicacao';

const TabGrupoSegurancaAplicacoesForm = (props) => {
    const { data, cod } = props;

    console.log('data', data);
    console.log('cod', cod);

    const [open, setOpen] = useState(false);

    const handleAdd = () => {
        setOpen(!open);
    };

    // const handleAdd = () => router.push('/core/organizacao/novo');

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id_grupo_aplicacao',
                dataType: 'readonly',
                className: 'cell-center',
                disableSortBy: false,
                disableFilters: false,
                disableGroupBy: true
            },
            // {
            //     Header: 'GRUPO SEGURANÇA',
            //     accessor: 'id_grupo_seguranca',
            //     dataType: 'readonly',
            //     className: 'cell-center',
            //     disableGroupBy: true
            // },
            // {
            //     Header: 'Código APLICAÇÃO',
            //     accessor: 'id_aplicacao',
            //     dataType: 'readonly',
            //     className: 'cell-center',
            //     disableGroupBy: true
            // },
            {
                Header: 'Nome Aplicação',
                accessor: 'aplicacao.nm_aplicacao',
                dataType: 'readonly',
                className: 'cell-center',
                disableGroupBy: true
            },
            {
                Header: 'Ler',
                id: 'grupo_aplicacao_permissao.cs_ler',
                accessor: (row) => row.grupo_aplicacao_permissao?.[0]?.cs_ler ?? false,
                dataType: 'checkbox',
                className: 'cell-center',
                disableGroupBy: true
            },
            {
                Header: 'Criar',
                id: 'grupo_aplicacao_permissao.cs_criar',
                accessor: (row) => row.grupo_aplicacao_permissao?.[0]?.cs_criar ?? false,
                dataType: 'checkbox',
                className: 'cell-center',
                disableGroupBy: true
            },
            {
                Header: 'Editar',
                id: 'grupo_aplicacao_permissao.cs_editar',
                accessor: (row) => row.grupo_aplicacao_permissao?.[0]?.cs_editar ?? false,
                dataType: 'checkbox',
                className: 'cell-center',
                disableGroupBy: true
            },
            {
                Header: 'Excluir',
                id: 'grupo_aplicacao_permissao.cs_excluir',
                accessor: (row) => row.grupo_aplicacao_permissao?.[0]?.cs_excluir ?? false,
                dataType: 'checkbox',
                className: 'cell-center',
                disableGroupBy: true
            },
            {
                Header: 'Clausula Where',
                id: 'grupo_aplicacao_restricao.ds_clausula_where',
                accessor: (row) => row.grupo_aplicacao_restricao?.[0]?.ds_clausula_where,
                dataType: 'text',
                className: 'cell-center',
                disableGroupBy: true
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const handleCellChange = async ({ field, value, row }) => {
        console.log('handleCellChange field:', field);
        console.log('handleCellChange row:', row);
        console.log('handleCellChange value:', value);

        const perm = row.grupo_aplicacao_permissao?.[0];
        if (!perm) return;
        else {
            dispatch(
                update(perm.id_grupo_aplicacao_permissao, {
                    id_grupo_aplicacao_permissao: perm.id_grupo_aplicacao_permissao,
                    id_grupo_aplicacao: row.id_grupo_aplicacao,
                    [field.split('.').pop()]: value
                })
            );
        }

        const rest = row.grupo_aplicacao_restricao?.[0];
        if (!rest) return;
        else {
            dispatch(
                updateRestricao(rest.id_grupo_aplicacao_restricao, {
                    id_grupo_aplicacao_permissao: rest.id_grupo_aplicacao_restricao,
                    id_grupo_aplicacao: row.id_grupo_aplicacao,
                    [field.split('.').pop()]: value
                })
            );
        }

        // switch (field) {
        //     case 'grupo_aplicacao_permissao.cs_ler':
        //         dispatch(
        //             update(row.grupo_aplicacao_permissao[0].id_grupo_aplicacao_permissao, {
        //                 id_grupo_aplicacao_permissao: row.grupo_aplicacao_permissao[0].id_grupo_aplicacao_permissao,
        //                 id_grupo_aplicacao: row.id_grupo_aplicacao, // ou o id que existir no row.original
        //                 cs_ler: value
        //             })
        //         );
        //         break;
        //     case 'grupo_aplicacao_permissao.cs_criar':
        //         dispatch(
        //             update({
        //                 id_grupo_aplicacao_permissao: row.grupo_aplicacao_permissao[0].id_grupo_aplicacao_permissao,
        //                 id_grupo_aplicacao: row.id_grupo_aplicacao, // ou o id que existir no row.original
        //                 cs_criar: value
        //             })
        //         );
        //         break;
        //     case 'grupo_aplicacao_permissao.cs_editar':
        //         dispatch(
        //             update({
        //                 id_grupo_aplicacao_permissao: row.grupo_aplicacao_permissao.id_grupo_aplicacao_permissao,
        //                 id_grupo_aplicacao: row.id_grupo_aplicacao, // ou o id que existir no row.original
        //                 cs_editar: value
        //             })
        //         );
        //         break;
        //     case 'grupo_aplicacao_permissao.cs_excluir':
        //         dispatch(
        //             update({
        //                 id_grupo_aplicacao_permissao: row.grupo_aplicacao_permissao.id_grupo_aplicacao_permissao,
        //                 id_grupo_aplicacao: row.id_grupo_aplicacao, // ou o id que existir no row.original
        //                 cs_excluir: value
        //             })
        //         );
        //         break;
        // }
    };

    return (
        <>
            <MainCard border={false} title={'Listagem de aplicações vinculados ao grupo de segurança'} boxShadow>
                <TabelaGrupoAplicacaoPermissao
                    columns={columns}
                    data={data}
                    handleAdd={handleAdd}
                    showCreate={true}
                    showDelete
                    showEdit
                    showView
                    showEditRow={false}
                    showAction={false}
                    tableFooter={false}
                    onCellChange={handleCellChange}
                />
            </MainCard>

            {/* //====================|| DIALOG FICHA INDICADOR ||====================\\ */}
            <DialogAplicacao open={open} setOpen={setOpen} data={cod} />
        </>
    );
};

TabGrupoSegurancaAplicacoesForm.propTypes = {
    initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    title: PropTypes.string,
    state: PropTypes.string
};

TabGrupoSegurancaAplicacoesForm.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default TabGrupoSegurancaAplicacoesForm;
