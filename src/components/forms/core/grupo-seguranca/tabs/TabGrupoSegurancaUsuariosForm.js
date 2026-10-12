import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MainCard from 'components/MainCard';
import Layout from 'layout';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { dispatch, useSelector } from 'store';
import { destroy } from 'store/reducers/grupo-usuario';
import { openSnackbar } from 'store/reducers/snackbar';
import TabelaDinamica from 'utils/tabela-dinamica/tabelaDinamica';
import LookupUsuario from '../../lookup/LookupUsuario';

const TabGrupoSegurancaUsuariosForm = (props) => {
    const { data, id, load } = props;

    const [exclusionModal, setExclusionModal] = useState(false);
    const [exclusion, setExclusion] = useState(null);

    const [open, setOpen] = useState(false);
    const [grupoUsuario, setGrupoUsuario] = useState([]);

    const { isLoader } = useSelector((state) => state.grupoUsuario);

    useEffect(() => {
        if (data) {
            const values = data.map(({ id_grupo_usuario, id_grupo_seguranca, id_usuario, usuario }) => ({
                ID: id_grupo_usuario,
                id_grupo_seguranca: id_grupo_seguranca,
                id_usuario: id_usuario,
                login: usuario?.login
            }));
            setGrupoUsuario(values);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleAdd = () => {
        setOpen(!open);
    };
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'ID',
                dataType: 'text',
                className: 'cell-center',
                disableSortBy: false,
                disableFilters: false,
                disableGroupBy: true
            },
            {
                Header: 'GRUPO SEGURANÇA',
                accessor: 'id_grupo_seguranca',
                dataType: 'text',
                className: 'cell-center',
                disableGroupBy: true
            },
            {
                Header: 'Código usuário',
                accessor: 'id_usuario',
                dataType: 'text',
                className: 'cell-center',
                disableGroupBy: true
            },
            {
                Header: 'Login',
                accessor: 'login',
                dataType: 'text',
                className: 'cell-center',
                disableGroupBy: true
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const openDeleteModal = (item) => {
        console.log('item', item);
        setExclusion(item);
        setExclusionModal(true);
    };

    const remover = (item) => {
        dispatch(destroy(item))
            .then(() => {
                dispatch(
                    openSnackbar({ open: true, message: 'Usuario excluído com sucesso!', variant: 'alert', alert: { color: 'success' } })
                );
            })
            .finally(() => {
                setExclusionModal(false);
                setExclusion(null);
            });
    };

    return (
        <>
            <MainCard border={false} title={'Listagem de usuários vinculados ao grupo de segurança'} boxShadow>
                <TabelaDinamica
                    columns={columns}
                    data={grupoUsuario}
                    showCreate={true}
                    handleAdd={handleAdd}
                    showDelete={true}
                    openDeleteModal={openDeleteModal}
                    showEdit={false}
                    showView={false}
                    showEditRow={false}
                    showAction={true}
                    tableFooter={false}
                />
            </MainCard>
            <LookupUsuario open={open} setOpen={setOpen} id={id} load={load} />
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

TabGrupoSegurancaUsuariosForm.propTypes = {
    initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    title: PropTypes.string,
    state: PropTypes.string
};

TabGrupoSegurancaUsuariosForm.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default TabGrupoSegurancaUsuariosForm;
