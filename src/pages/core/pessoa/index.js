import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Loader from 'components/Loader';
import Page from 'components/Page';
import usePermissions from 'hooks/usePermissions';
import Layout from 'layout';
import { getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { dispatch, useSelector } from 'store';
import { fetch, search, softDelete } from 'store/reducers/pessoa';
import { openSnackbar } from 'store/reducers/snackbar';
import TabelaDinamica from 'utils/tabela-dinamica/tabelaDinamica';

const Listar = () => {
    const intl = useIntl();
    const router = useRouter();
    const [exclusionModal, setExclusionModal] = useState(false);
    const [exclusion, setExclusion] = useState(null);
    const { list, isLoader, total } = useSelector((state) => state.pessoa);

    const { canView, canCreate, canEdit, canDelete, clausulaWhere, loading } = usePermissions('pessoa');

    //orderDir?: "asc" | "desc";
    const [pagination, setPagination] = useState({
        // expr: "st_ativo = 'Ativo'", // 🔹 filtro base (perfil/sessão)
        pageIndex: 0, // 0-based para o ReactTable
        pageSize: 25,
        filter: '', // 🔹 aqui entra o JSON do ReactTable
        orderBy: 'nm_pessoa',
        orderDir: 'asc'
    });

    // Carregar dados sempre que pageIndex ou pageSize mudarem
    useEffect(() => {
        if (!loading) {
            dispatch(
                search({
                    page: pagination.pageIndex + 1, // backend normalmente 1-based
                    pageSize: pagination.pageSize,
                    filter: pagination.filter, // 🔹 agora vai junto
                    expr: clausulaWhere, // 🔹 agora vai junto
                    orderBy: pagination.orderBy,
                    orderDir: pagination.orderDir
                })
            );
        }
    }, [pagination.pageIndex, pagination.pageSize, pagination.filter, clausulaWhere]);

    // Sincronizar o total vindo do backend com o estado local de paginação
    useEffect(() => {
        if (typeof total === 'number') {
            setPagination((prev) => ({
                ...prev,
                total
            }));
        }
    }, [total]);

    const handleAdd = () => router.push('/core/pessoa/novo');

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id_pessoa',
                dataType: 'text',
                className: 'cell-center',
                fieldType: 'number', // 👈 novo
                filterMode: 'equals', // 👈 novo
                disableGlobalSearch: true, // 👈 não faz sentido buscar ID no global
                disableSortBy: false,
                disableFilters: false,
                disableGroupBy: true
            },
            {
                Header: 'Nome',
                accessor: 'nm_pessoa',
                dataType: 'text',
                fieldType: 'string',
                filterMode: 'contains', // "like '%texto%'"
                disableGlobalSearch: false, // 👈 incluímos no global search
                className: 'cell-right',
                disableGroupBy: true
            },
            {
                Header: 'CPF',
                accessor: 'nr_cpf',
                dataType: 'text',
                fieldType: 'string',
                filterMode: 'contains', // "like '%texto%'"
                disableGlobalSearch: false, // 👈 incluímos no global search
                className: 'cell-right',
                disableGroupBy: true
            },
            {
                Header: 'ORGANIZAÇÃO',
                accessor: 'organizacao.nm_organizacao',
                dataType: 'text',
                fieldType: 'string',
                filterMode: 'contains', // "like '%texto%'"
                disableGlobalSearch: false, // 👈 incluímos no global search
                className: 'cell-right',
                disableGroupBy: true
            },
            {
                Header: 'SITE',
                accessor: 'site.nm_site',
                dataType: 'text',
                fieldType: 'string',
                filterMode: 'contains', // "like '%texto%'"
                disableGlobalSearch: false, // 👈 incluímos no global search
                className: 'cell-right',
                disableGroupBy: true
            },
            {
                Header: 'Status',
                accessor: 'st_ativo',
                dataType: 'text',
                fieldType: 'boolean', // vamos mapear 'Ativo'/'Inativo'
                filterMode: 'equals',
                disableGlobalSearch: true, // 👈 não faz sentido buscar Status no global

                className: 'cell-right',
                disableGroupBy: true
                // filter: 'equals'
                // filter: 'equalsCase'
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const openDeleteModal = (item) => {
        setExclusion(item);
        setExclusionModal(true);
    };

    const remover = (item) => {
        console.log('softDelete item', item);
        dispatch(softDelete(item))
            .then(() => {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Pessoa excluída com sucesso!',
                        variant: 'alert',
                        alert: { color: 'success' }
                    })
                );
            })
            .finally(() => {
                setExclusionModal(false);
                setExclusion(null);
                dispatch(
                    fetch({
                        page: pagination.pageIndex + 1, // backend normalmente 1-based
                        pageSize: pagination.pageSize,
                        filter: pagination.filter // 🔹 agora vai junto
                    })
                );
            });
    };

    if (loading) return <Loader />;

    return (
        <>
            <Page title={intl.formatMessage({ id: 'pessoa.title' })}>
                <TabelaDinamica
                    columns={columns}
                    data={list}
                    handleAdd={handleAdd}
                    showCreate={canCreate}
                    showDelete={canDelete}
                    openDeleteModal={openDeleteModal}
                    showEdit={canEdit}
                    showView={canView}
                    editar="/core/pessoa/editar/"
                    visualizar="/core/pessoa/visualizar/"
                    showEditRow={false}
                    showAction
                    tableFooter={false}
                    pagination={pagination}
                    setPagination={setPagination}
                />
            </Page>

            <Dialog open={exclusionModal} onClose={() => setExclusionModal(false)}>
                <DialogTitle>Confirmação de exclusão</DialogTitle>
                <DialogContent>
                    <DialogContentText>Tem certeza de que deseja excluir este registro?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setExclusionModal(false)}>Cancelar</Button>
                    <Button
                        onClick={() => remover(exclusion)}
                        disabled={isLoader}
                        startIcon={isLoader && <CircularProgress size={20} />}
                        color="secondary"
                    >
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

Listar.getLayout = (page) => <Layout>{page}</Layout>;
export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context);
    return { props: { csrfToken } };
}
export default Listar;
