import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Page from 'components/Page';
import usePermissions from 'hooks/usePermissions';
import Layout from 'layout';
import { getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { dispatch, useSelector } from 'store';
import { fetch, search, softDelete } from 'store/reducers/empresa';
import { openSnackbar } from 'store/reducers/snackbar';
import TabelaDinamica from 'utils/tabela-dinamica/tabelaDinamica';

const Listar = () => {
    const intl = useIntl();
    const router = useRouter();
    const [exclusionModal, setExclusionModal] = useState(false);
    const [exclusion, setExclusion] = useState(null);
    const { list, isLoader, total } = useSelector((state) => state.empresa);

    const { canView, canCreate, canEdit, canDelete } = usePermissions('empresa');

    //orderDir?: "asc" | "desc";
    const [pagination, setPagination] = useState({
        expr: "nm_empresa ilike '%a%'", // 🔹 filtro base (perfil/sessão)
        pageIndex: 0, // 0-based para o ReactTable
        pageSize: 10,
        total: 0,
        filter: '', // 🔹 aqui entra o JSON do ReactTable
        orderBy: 'nm_empresa',
        orderDir: 'asc'
    });

    // Carregar dados sempre que pageIndex ou pageSize mudarem
    useEffect(() => {
        dispatch(
            search({
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

    const handleAdd = () => router.push('/core/empresa/novo');

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id_empresa',
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
                Header: 'Empresa',
                accessor: 'nm_empresa',
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
                        message: 'Organização excluída com sucesso!',
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
            <Page title={intl.formatMessage({ id: 'empresa.title' })}>
                <TabelaDinamica
                    columns={columns}
                    data={list}
                    handleAdd={handleAdd}
                    showCreate={canCreate}
                    showDelete={canDelete}
                    openDeleteModal={openDeleteModal}
                    showEdit={canEdit}
                    showView={canView}
                    editar="/core/empresa/editar/"
                    visualizar="/core/empresa/visualizar/"
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
