import { Button, Dialog, DialogContent, DialogTitle, Grid, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import Draggable from 'react-draggable';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { create } from 'store/reducers/grupo-usuario';
import { fetch } from 'store/reducers/usuario';
import TabelaLookup from 'utils/tabela-lookup/tabela-lookup';
import { CircularProgress } from '../../../../../node_modules/@mui/material/index';

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

// ==============================|| VINCULAR APLICAÇÃO ||============================== //

export default function LookupUsuario({ open, setOpen, id, load }) {
    const dispatch = useDispatch();
    const intl = useIntl();

    console.log('id', id);

    const { list: usuarios } = useSelector((state) => state.usuario);

    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(fetch());
    }, []);

    useEffect(() => {
        if (usuarios) {
            const values = usuarios.map((usuario) => ({
                selected: false,
                ...usuario
            }));

            setTableData(values);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usuarios]);

    const columns = useMemo(
        () => [
            {
                Header: 'Selecionar',
                id: 'selected',
                accessor: 'selected',
                dataType: 'checkbox',
                className: 'cell-center',
                disableSortBy: true,
                disableFilters: false,
                disableGroupBy: true
            },
            {
                Header: 'ID',
                accessor: 'id_usuario',
                dataType: 'text',
                className: 'cell-center',
                disableSortBy: false,
                disableFilters: false,
                disableGroupBy: true
            },
            {
                Header: 'Nome',
                accessor: 'pessoa.nm_pessoa',
                dataType: 'text',
                className: 'cell-right',
                disableSortBy: false,
                disableFilters: false,
                disableGroupBy: true
            },
            {
                Header: 'CPF',
                accessor: 'pessoa.nr_cpf',
                dataType: 'text',
                className: 'cell-right',
                disableSortBy: false,
                disableFilters: false,
                disableGroupBy: true
            },
            {
                Header: 'Status',
                accessor: 'st_ativo',
                dataType: 'text',
                className: 'cell-center',
                disableSortBy: false,
                disableFilters: false,
                disableGroupBy: true
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    function handleCellChange({ field, value, row, rowIndex }) {
        setTableData((prev) => {
            // atualiza por id (mais seguro) e cai pro rowIndex se precisar
            const rowId = row?.id ?? row?.id_usuario ?? null;

            if (rowId != null) {
                return prev.map((item) => (item.id === rowId || item.id_usuario === rowId ? { ...item, [field]: value } : item));
            }

            // fallback: index
            return prev.map((item, idx) => (idx === rowIndex ? { ...item, [field]: value } : item));
        });
    }

    async function handleAddToGroup() {
        setIsLoading(true);

        const selectedUsers = tableData.filter((u) => u.selected);

        console.log('selectedUsers', selectedUsers);

        // 4) cria vínculos + permissões (sequencial, seguro)
        for (const user of selectedUsers) {
            await dispatch(
                create({
                    id_grupo_seguranca: id,
                    id_usuario: user.id_usuario
                })
            );
        }

        setIsLoading(false);
        setOpen(false);
        load();
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth="sm"
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                <Stack spacing={2}>
                    <Typography variant="h3">{`Lista de Usuários`}</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <MainCard title="" content={true}>
                    <Grid container spacing={3.5}>
                        <Grid item xs={12}>
                            <TabelaLookup columns={columns} data={tableData} onCellChange={handleCellChange} />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container justifyContent="flex-end" spacing={2}>
                                <Grid item>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        disabled={isLoading}
                                        startIcon={isLoading && <CircularProgress size={24} />}
                                        onClick={() => handleAddToGroup()}
                                    >
                                        Vincular
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="secondary" onClick={() => setOpen(!open)}>
                                        Fechar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <br />
                </MainCard>
            </DialogContent>
        </Dialog>
    );
}

LookupUsuario.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    id: PropTypes.number
};
