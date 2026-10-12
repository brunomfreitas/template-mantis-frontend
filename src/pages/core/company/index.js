import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Page from 'components/Page';
import usePermissions from 'hooks/usePermissions';
import Layout from 'layout';
import { getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { dispatch, useSelector } from 'store';
import { fetch, search, softDelete } from 'store/reducers/company';
import { openSnackbar } from 'store/reducers/snackbar';
import TabelaDinamica from 'utils/tabela-dinamica/tabelaDinamica';

const Listar = () => {
    const intl = useIntl();
    const router = useRouter();
    const [exclusionModal, setExclusionModal] = useState(false);
    const [exclusion, setExclusion] = useState(null);
    const { list, isLoader, total } = useSelector((state) => state.company);

    const { canView, canCreate, canEdit, canDelete } = usePermissions('company');

    const [pagination, setPagination] = useState({
        expr: "nm_company ilike '%a%'",
        pageIndex: 0,
        pageSize: 10,
        total: 0,
        filter: '',
        orderBy: 'nm_company',
        orderDir: 'asc'
    });

    useEffect(() => {
        dispatch(
            search({
                page: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
                filter: pagination.filter
            })
        );
    }, [pagination.pageIndex, pagination.pageSize, pagination.filter]);

    useEffect(() => {
        if (typeof total === 'number') {
            setPagination((prev) => ({
                ...prev,
                total
            }));
        }
    }, [total]);

    const handleAdd = () => router.push('/core/company/novo');

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id_company',
                dataType: 'text',
                className: 'cell-center',
                fieldType: 'number',
                filterMode: 'equals',
                disableGlobalSearch: true,
                disableSortBy: false,
                disableFilters: false,
                disableGroupBy: true
            },
            {
                Header: 'Company',
                accessor: 'nm_company',
                dataType: 'text',
                fieldType: 'string',
                filterMode: 'contains',
                disableGlobalSearch: false,
                className: 'cell-right',
                disableGroupBy: true
            },
            {
                Header: 'CNPJ',
                accessor: 'nr_cnpj',
                dataType: 'text',
                fieldType: 'string',
                filterMode: 'contains',
                disableGlobalSearch: false,
                className: 'cell-right',
                disableGroupBy: true
            },
            {
                Header: 'Status',
                accessor: 'st_ativo',
                dataType: 'text',
                fieldType: 'boolean',
                filterMode: 'equals',
                disableGlobalSearch: true,
                className: 'cell-right',
                disableGroupBy: true
            }
        ],
        []
    );

    const openDeleteModal = (item) => {
        setExclusion(item);
        setExclusionModal(true);
    };

    const remover = (item) => {
        dispatch(softDelete(item))
            .then(() => {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Company excluída com sucesso!',
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
                        page: pagination.pageIndex + 1,
                        pageSize: pagination.pageSize,
                        filter: pagination.filter
                    })
                );
            });
    };

    return (
        <>
            <Page title={intl.formatMessage({ id: 'company.title' })}>
                <TabelaDinamica
                    columns={columns}
                    data={list}
                    handleAdd={handleAdd}
                    showCreate={canCreate}
                    showDelete={canDelete}
                    openDeleteModal={openDeleteModal}
                    showEdit={canEdit}
                    showView={canView}
                    editar="/core/company/editar/"
                    visualizar="/core/company/visualizar/"
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
