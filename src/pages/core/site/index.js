import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Page from 'components/Page';
import usePermissions from 'hooks/usePermissions';
import Layout from 'layout';
import { getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { dispatch, useSelector } from 'store';
import { fetch, softDelete } from 'store/reducers/site';
import { openSnackbar } from 'store/reducers/snackbar';
import TabelaDinamica from 'utils/tabela-dinamica/tabelaDinamica';

const Listar = () => {
    const intl = useIntl();
    const router = useRouter();

    const [exclusionModal, setExclusionModal] = useState(false);
    const [exclusion, setExclusion] = useState(null);

    // Agora assumindo que o reducer de site expõe também o total da base
    const { list, isLoader, total } = useSelector((state) => state.site);
    const { canView, canCreate, canEdit, canDelete } = usePermissions('site');

    // Estado de paginação controlado pelo componente pai
    const [pagination, setPagination] = useState({
        pageIndex: 0, // 0-based
        pageSize: 10,
        total: 0,
        filter: '' // string com o filtro que será mandada ao backend
    });

    // Carregar dados sempre que pageIndex ou pageSize mudarem
    useEffect(() => {
        dispatch(
            fetch({
                page: pagination.pageIndex + 1, // backend normalmente 1-based
                pageSize: pagination.pageSize,
                filter: pagination.filter // 🔹 agora vai junto
            })
        );
    }, [pagination.pageIndex, pagination.pageSize, pagination.filter]);

    // Sincronizar o total vindo do backend com o estado local de paginação
    useEffect(() => {
        if (typeof total === 'number') {
            setPagination((prev) => ({
                ...prev,
                total
            }));
        }
    }, [total]);

    const handleAdd = () => router.push('/core/site/novo');

    // Aqui você declara, por coluna, como quer que ela seja filtrada.
    // fieldType: 'string' | 'number' | 'boolean' | 'date'
    // filterMode: 'contains' | 'startsWith' | 'endsWith' | 'equals'
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id_site',
                dataType: 'text',
                fieldType: 'number', // 👈 novo
                filterMode: 'equals', // 👈 novo
                disableGlobalSearch: true, // 👈 não faz sentido buscar ID no global

                className: 'cell-center',
                disableSortBy: false,
                disableFilters: false,
                disableGroupBy: true
            },
            {
                Header: 'Site',
                accessor: 'nm_site',
                dataType: 'text',
                fieldType: 'string',
                filterMode: 'contains', // "like '%texto%'"
                disableGlobalSearch: false, // 👈 incluímos no global search

                className: 'cell-left',
                disableGroupBy: true
            },
            {
                Header: 'Organização',
                accessor: 'organizacao.nm_organizacao',
                dataType: 'text',
                fieldType: 'string',
                filterMode: 'contains',
                disableGlobalSearch: false, // 👈 incluímos no global search

                className: 'cell-left',
                disableGroupBy: true
            },
            {
                Header: 'Status',
                accessor: 'st_ativo',
                dataType: 'text',
                fieldType: 'boolean', // vamos mapear 'Ativo'/'Inativo'
                filterMode: 'equals',
                disableGlobalSearch: true, // 👈 não faz sentido buscar Status no global
                className: 'cell-center',
                disableGroupBy: true
            }
        ],
        []
    );

    const openDeleteModal = (item) => {
        // se item já vem completo, dá pra só guardar o ID,
        // mas mantive sua estrutura original
        // setExclusion({ ...item, st_ativo: false });
        setExclusion(item);
        setExclusionModal(true);
    };

    const remover = (item) => {
        if (!item) return;
        console.log('update item', item);
        dispatch(softDelete(item))
            .then(() => {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Site excluído com sucesso!',
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

    return (
        <>
            <Page title={intl.formatMessage({ id: 'site' })}>
                <TabelaDinamica
                    columns={columns}
                    data={list || []}
                    handleAdd={handleAdd}
                    showCreate={canCreate}
                    showDelete={canDelete}
                    openDeleteModal={openDeleteModal}
                    showEdit={canEdit}
                    showView={canView}
                    editar="/core/site/editar/"
                    visualizar="/core/site/visualizar/"
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
