import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Loader from 'components/Loader';
import Page from 'components/Page';
import dayjs from 'dayjs';
import usePermissions from 'hooks/usePermissions';
import Layout from 'layout';
import { getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { dispatch, useSelector } from 'store';
import { fetch, search, softDelete } from 'store/reducers/prontuario';
import { openSnackbar } from 'store/reducers/snackbar';
import TabelaDinamica from 'utils/tabela-dinamica/tabelaDinamica';

const Listar = () => {
    const intl = useIntl();
    const router = useRouter();
    const [exclusionModal, setExclusionModal] = useState(false);
    const [exclusion, setExclusion] = useState(null);
    const { list, isLoader, total } = useSelector((state) => state.prontuario);

    const { canView, canCreate, canEdit, canDelete, clausulaWhere, loading } = usePermissions('prontuario');

    console.log('list', list);

    //orderDir?: "asc" | "desc";
    const [pagination, setPagination] = useState({
        // expr: "nm_aplicacao ilike '%a%'",
        pageIndex: 0, // 0-based para o ReactTable
        pageSize: 25,
        filter: '', // 🔹 aqui entra o JSON do ReactTable
        orderBy: 'id_prontuario',
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

    const handleAdd = () => router.push('/core/prontuario/novo');

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id_prontuario',
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
                Header: 'Paciente',
                accessor: 'pessoa.nm_pessoa',
                dataType: 'text',
                className: 'cell-left',
                disableGroupBy: true
            },
            {
                Header: 'Escola',
                accessor: 'escola.nm_escola',
                dataType: 'text',
                className: 'cell-left',
                disableGroupBy: true
            },
            {
                Header: 'Data Atendimento',
                accessor: 'dh_inicio_atendimento',
                dataType: 'text',
                className: 'cell-left',
                disableGroupBy: true,
                Cell: ({ value }) => (value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '-')
            },
            // {
            //     Header: 'Código',
            //     accessor: 'dh_inicio_atendimento',
            //     dataType: 'date',
            //     fieldType: 'string',
            //     filterMode: 'contains', // "like '%texto%'"
            //     disableGlobalSearch: false, // 👈 incluímos no global search
            //     className: 'cell-right',
            //     disableGroupBy: true
            // },
            {
                Header: 'Nome',
                accessor: 'st_atendimento',
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
                        message: 'Prontuário excluído com sucesso!',
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

    const handleImportar = async (event) => {
        const file = event.target.files[0];

        try {
            await dispatch(prontuarioActions.importarExcel(file));

            alert('Importação realizada com sucesso');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDownloadTemplate = async () => {
        try {
            const blob = await dispatch(prontuarioActions.baixarTemplateExcel());

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');

            link.href = url;
            link.download = 'template-prontuario.xlsx';

            document.body.appendChild(link);

            link.click();

            link.remove();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Page title={intl.formatMessage({ id: 'aplicacao.title' })}>
                <input type="file" accept=".xlsx,.xls" onChange={handleImportar} />
                <Button onClick={handleDownloadTemplate}>Baixar Template</Button>
                <TabelaDinamica
                    columns={columns}
                    data={list}
                    handleAdd={handleAdd}
                    showCreate={canCreate}
                    showDelete={canDelete}
                    openDeleteModal={openDeleteModal}
                    showEdit={canEdit}
                    showView={canView}
                    editar="/core/prontuario/editar/"
                    visualizar="/core/prontuario/visualizar/"
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
