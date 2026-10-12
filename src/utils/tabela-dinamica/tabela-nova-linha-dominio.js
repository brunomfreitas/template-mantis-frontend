/* eslint-disable react/prop-types */
import {
    DeleteTwoTone,
    DownOutlined,
    EditTwoTone,
    GroupOutlined,
    PlusOutlined,
    RightOutlined,
    SendOutlined,
    UngroupOutlined
} from '@ant-design/icons';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Pagination,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    // TableFooter,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import Page from 'components/Page';
import ScrollX from 'components/ScrollX';
import {
    DragPreview,
    DraggableHeader,
    EmptyTable,
    HeaderSort,
    HidingSelect,
    IndeterminateCheckbox
} from 'components/third-party/ReactTable';
import { ThemeMode } from 'config';
import { Form, Formik } from 'formik';
import update from 'immutability-helper';
import Layout from 'layout';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import {
    useColumnOrder,
    useExpanded,
    useFilters,
    useGlobalFilter,
    useGroupBy,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable
} from 'react-table';
import { useDispatch } from 'store';
import { create, excluir } from 'store/reducers/dominio-valor';
import { openSnackbar } from 'store/reducers/snackbar';
import { DefaultColumnFilter, GlobalFilter, renderFilterTypes } from 'utils/react-table';
import * as Yup from 'yup';

// ==============================|| REACT TABLE ||============================== //

const EditableRow = ({ value: initialValue, row: { index }, column: { id, dataType }, updateData }) => {
    const [value, setValue] = useState(initialValue);
    const theme = useTheme();

    const onChange = (e) => {
        setValue(e.target?.value);
    };

    const onBlur = () => {
        updateData(index, id, value);
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    let element;
    let userInfoSchema;

    switch (id) {
        case 'email':
            userInfoSchema = Yup.object().shape({
                userInfo: Yup.string().email('Enter valid email ').required('Email is a required field')
            });
            break;
        default:
            userInfoSchema = Yup.object().shape({
                userInfo: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is Required')
            });
            break;
    }

    let IsEditAble = true;

    switch (dataType) {
        case 'text':
            element = (
                <>
                    {IsEditAble ? (
                        <>
                            <Formik
                                initialValues={{
                                    userInfo: value
                                }}
                                enableReinitialize
                                validationSchema={userInfoSchema}
                                onSubmit={() => {}}
                            >
                                {({ values, errors, touched, handleChange }) => (
                                    <Form>
                                        <TextField
                                            value={values.userInfo}
                                            id={`${index}-${id}`}
                                            name="userInfo"
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleChange(e);
                                                onChange(e);
                                            }}
                                            onBlur={onBlur}
                                            error={touched.userInfo && Boolean(errors.userInfo)}
                                            helperText={touched.userInfo && errors.userInfo && errors.userInfo}
                                            sx={{
                                                '& .MuiOutlinedInput-input': {
                                                    py: 0.75,
                                                    px: 1,
                                                    backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'inherit' : 'common.white'
                                                }
                                            }}
                                        />
                                    </Form>
                                )}
                            </Formik>
                        </>
                    ) : (
                        value
                    )}
                </>
            );
            break;
        case 'longtext':
            element = (
                <>
                    {IsEditAble ? (
                        <>
                            <Formik
                                initialValues={{
                                    userInfo: value
                                }}
                                enableReinitialize
                                validationSchema={userInfoSchema}
                                onSubmit={() => {}}
                            >
                                {({ values, errors, touched, handleChange }) => (
                                    <Form>
                                        <TextField
                                            value={values.userInfo}
                                            id={`${index}-${id}`}
                                            name="userInfo"
                                            fullWidth
                                            multiline
                                            minRows={1}
                                            maxRows={Infinity}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleChange(e);
                                                onChange(e);
                                            }}
                                            onBlur={onBlur}
                                            error={touched.userInfo && Boolean(errors.userInfo)}
                                            helperText={touched.userInfo && errors.userInfo && errors.userInfo}
                                            sx={{
                                                '& .MuiOutlinedInput-input': {
                                                    py: 0.75,
                                                    px: 1,
                                                    backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'inherit' : 'common.white'
                                                }
                                            }}
                                        />
                                    </Form>
                                )}
                            </Formik>
                        </>
                    ) : (
                        value
                    )}
                </>
            );
            break;
        default:
            element = <span>{value}</span>;
            break;
    }
    return element;
};

// ==============================|| REACT TABLE - ActionsCell ||============================== //

const ActionsCell = ({ row, view, load }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const codDominioValor = row.original.cod_dominio_valor;

    const handleDelete = async () => {
        if (codDominioValor) {
            try {
                dispatch(excluir(codDominioValor))
                    .then(() => {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Dominio excluído com sucesso!',
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                }
                            })
                        );
                    })
                    .finally(() => {
                        // setSubmitting(false);
                        load();
                    });
            } catch (error) {
                console.error('Erro ao excluir o item:', error);
            }
        }
    };

    return (
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
            {!view && (
                <Tooltip title="Excluir">
                    <IconButton
                        color="error"
                        disabled={row.original.FLG_PERFIL_BASE == '1' || row.original.SIGLA == 'SAS' ? true : false}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                    >
                        <DeleteTwoTone
                            twoToneColor={
                                row.original.FLG_PERFIL_BASE == '1' || row.original.SIGLA == 'SAS' ? '#E0E0E0' : theme.palette.error.main
                            }
                        />
                    </IconButton>
                </Tooltip>
            )}
        </Stack>
    );
};

ActionsCell.propTypes = {
    row: PropTypes.object,
    showButtonDelete: PropTypes.bool
};

// ==============================|| REACT TABLE - ColumnCell ||============================== //
// ==============================|| REACT TABLE ||============================== //

const ColumnCell = ({ row, setEditableRowIndex, editableRowIndex }) => (
    <>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
            <Tooltip title={editableRowIndex !== row.index ? 'Edit' : 'Save'}>
                <IconButton
                    color={editableRowIndex !== row.index ? 'primary' : 'success'}
                    onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = row.index;
                        if (editableRowIndex !== currentIndex) {
                            setEditableRowIndex(currentIndex);
                        } else {
                            setEditableRowIndex(null);
                        }
                    }}
                >
                    {editableRowIndex !== row.index ? <EditTwoTone /> : <SendOutlined />}
                </IconButton>
            </Tooltip>
        </Stack>
    </>
);

ColumnCell.propTypes = {
    row: PropTypes.object,
    setEditableRowIndex: PropTypes.func,
    editableRowIndex: PropTypes.number
};

const TablePagination = ({ gotoPage, rows, setPageSize, pageSize, pageIndex }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChangePagination = (event, value) => {
        gotoPage(value - 1);
    };

    const handleChange = (event) => {
        setPageSize(+event.target.value);
    };

    return (
        <Grid container sx={{ width: 'auto' }} direction="row" alignItems="center" justifyContent="space-between">
            <Grid item>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%', pb: 2, pr: 2, pl: 2 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="caption" color="secondary">
                            Selecione por página
                        </Typography>
                        <FormControl sx={{ m: 1 }}>
                            <Select
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={pageSize}
                                onChange={handleChange}
                                size="small"
                                sx={{ '& .MuiSelect-select': { py: 0.75, px: 1.25 } }}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item sx={{ height: '100%', pb: 2, pr: 2, pl: 2 }} alignItems="center">
                <Pagination
                    count={Math.ceil(rows.length / pageSize)}
                    page={pageIndex + 1}
                    onChange={handleChangePagination}
                    color="primary"
                    variant="combined"
                    showFirstButton
                    showLastButton
                />
            </Grid>
        </Grid>
    );
};

TablePagination.propTypes = {
    gotoPage: PropTypes.func,
    setPageSize: PropTypes.func,
    pageIndex: PropTypes.number,
    pageSize: PropTypes.number,
    rows: PropTypes.array
};

ReactTable.propTypes = {
    columns: PropTypes.array,
    dados: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    updateData: PropTypes.func,
    skipPageReset: PropTypes.bool,
    handleAdd: PropTypes.func,
    codDominio: PropTypes.number
};

// ==============================|| REACT TABLE - UMBRELLA ||============================== //

function ReactTable({ columns, dados, showDelete, openDeleteModal, load, codDominio, state }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [view, setView] = useState(false);
    const [, setUnsavedChanges] = useState(false);
    const [skipPageReset, setSkipPageReset] = useState(false);
    const [data, setData] = useState(dados);
    const [showButtonDelete, setShowButtonDelete] = useState(showDelete);
    const [isLoading, setIsLoading] = useState(false);
    const filterTypes = useMemo(() => renderFilterTypes, []);
    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter, Cell: EditableRow }), []);
    const initialState = useMemo(
        () => ({
            filters: [{ id: 'status', value: '' }],
            hiddenColumns: [],
            columnOrder: [],
            pageIndex: 0,
            pageSize: 5
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        page,
        prepareRow,
        setColumnOrder,
        gotoPage,
        setPageSize,
        setHiddenColumns,
        allColumns,
        state: { globalFilter, hiddenColumns, pageIndex, pageSize, columnOrder },
        preGlobalFilteredRows,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState,
            filterTypes,
            editableRowIndex,
            setEditableRowIndex,
            autoResetPage: !skipPageReset,
            updateData,
            handleDelete,
            showDelete,
            openDeleteModal,
            showButtonDelete,
            setShowButtonDelete,
            codDominio,
            load
        },
        useGlobalFilter,
        useFilters,
        useColumnOrder,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.allColumns.push((columns) => [
                ...columns,
                {
                    accessor: 'edit',
                    id: 'edit',
                    Header: 'AÇÃO',
                    disableFilters: true,
                    disableSortBy: true,
                    disableGroupBy: true,
                    groupByBoundary: true,
                    className: 'cell-center',
                    Cell: ActionsCell
                }
            ]);
        }
    );

    const reorder = (item, newIndex) => {
        const { index: currentIndex } = item;

        let dragRecord = columnOrder[currentIndex];
        if (!columnOrder.includes(item.id)) {
            dragRecord = item.id;
        }

        setColumnOrder(
            update(columnOrder, {
                $splice: [
                    [currentIndex, 1],
                    [newIndex, 0, dragRecord]
                ]
            })
        );
    };

    let headers = [];
    allColumns.map((item) => {
        if (!hiddenColumns?.includes(item.id) && item.id !== 'selection' && item.id !== 'edit') {
            headers.push({ label: typeof item.Header === 'string' ? item.Header : '#', key: item.id });
        }
        return item;
    });

    //=========================================================\\
    //=========================================================\\

    function findChangesAndAdditions(arr1, arr2) {
        const result = [];
        // Verifica alterações e adições
        arr1.forEach((obj1) => {
            const matchingObj = arr2.find((obj2) => obj2.id_dominio_valor === obj1.id_dominio_valor);

            if (matchingObj) {
                const hasChanges = Object.keys(matchingObj).some((key) => matchingObj[key] !== obj1[key]);

                if (hasChanges) {
                    result.push({ ...obj1, CHANGED: true });
                }
            } else {
                result.push({ ...obj1 });
            }
        });

        return result;
    }

    const handleSaveChanges = async () => {
        const dataToUpdate = findChangesAndAdditions(data, dados);
        setIsLoading(true);

        for (const item of dataToUpdate) {
            const updatedData = {
                id_dominio: codDominio,
                nm_dominio_valor: item.nm_dominio_valor,
                ds_dominio_valor: item.ds_dominio_valor
            };

            if (!item.id_dominio_valor) {
                dispatch(create(updatedData))
                    .then(() => {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Dominio criado com sucesso!',
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                }
                            })
                        );
                    })
                    .catch((err) => {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: err.error,
                                variant: 'alert',
                                alert: {
                                    color: 'error'
                                }
                            })
                        );
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            } else {
                dispatch(update(item.id_dominio_valor, updatedData))
                    .then(() => {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Dominio alterado com sucesso!',
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                }
                            })
                        );
                    })
                    .catch((err) => {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: err.error,
                                variant: 'alert',
                                alert: {
                                    color: 'error'
                                }
                            })
                        );
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        }

        load();
        setIsLoading(false);
    };

    useEffect(() => {
        setSkipPageReset(false);
    }, [data]);

    useEffect(() => {
        if (state === 'view') {
            setView(true);
        }
    }, [state]);

    function updateData(rowIndex, columnId, value) {
        setSkipPageReset(true);
        setData((old) =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    const updatedRow = {
                        ...old[rowIndex],
                        [columnId]: value
                    };
                    setUnsavedChanges(true);
                    return updatedRow;
                }
                return row;
            })
        );
    }

    const handleAddRow = () => {
        setSkipPageReset(true);
        setData((old) => [
            // estrutura da nova linha
            ...old,
            {
                id_dominio: codDominio,
                nm_dominio_valor: '',
                ds_dominio_valor: ''
            }
        ]);

        const pagina = Math.ceil(rows.length / pageSize);
        gotoPage(pagina - 1);
    };

    function handleDelete(index) {
        data.splice(index, 1);
        setData([...data]);
        setSkipPageReset(true);
    }

    //=========================================================\\
    //=========================================================\\

    return (
        <>
            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" sx={{ p: 2, pb: 0 }}>
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                        size="small"
                    />
                    <Stack direction="row" spacing={2}>
                        <HidingSelect hiddenColumns={hiddenColumns} setHiddenColumns={setHiddenColumns} allColumns={allColumns} />
                        {!view && (
                            <Button
                                color="primary"
                                startIcon={<PlusOutlined />}
                                onClick={handleAddRow}
                                variant="dashed"
                                sx={{ bgcolor: 'transparent !important' }}
                            >
                                Nova Linha
                            </Button>
                        )}
                    </Stack>
                </Stack>

                <Box sx={{ width: '100%', overflowX: 'auto', display: 'block' }}>
                    <Table {...getTableProps()}>
                        <TableHead sx={{ borderTopWidth: 2 }}>
                            {headerGroups.map((headerGroup, i) => (
                                <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column, index) => {
                                        const groupIcon = column.isGrouped ? <UngroupOutlined /> : <GroupOutlined />;
                                        return (
                                            <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                                                <DraggableHeader reorder={reorder} key={column.id} column={column} index={index}>
                                                    <Stack
                                                        direction="row"
                                                        spacing={1.15}
                                                        alignItems="center"
                                                        sx={{ display: 'inline-flex' }}
                                                    >
                                                        {column.canGroupBy ? (
                                                            <Box
                                                                sx={{
                                                                    color: column.isGrouped ? 'error.main' : 'primary.main',
                                                                    fontSize: '1rem'
                                                                }}
                                                                {...column.getGroupByToggleProps()}
                                                            >
                                                                {groupIcon}
                                                            </Box>
                                                        ) : null}
                                                        <HeaderSort column={column} sort />
                                                    </Stack>
                                                </DraggableHeader>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHead>

                        {/* striped table -> add class 'striped' */}
                        <TableBody {...getTableBodyProps()} className="striped">
                            {headerGroups.map((group, i) => (
                                <TableRow key={i} {...group.getHeaderGroupProps()}>
                                    {group.headers.map((column, index) => (
                                        <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                                            {column.canFilter ? column.render('Filter') : null}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                            {page.length > 0 ? (
                                page.map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        <TableRow
                                            key={i}
                                            {...row.getRowProps()}
                                            {...(editableRowIndex !== row.index && {
                                                onClick: () => {
                                                    row.toggleRowSelected();
                                                }
                                            })}
                                            sx={{
                                                cursor: 'pointer',
                                                bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit'
                                            }}
                                        >
                                            {row.cells.map((cell, index) => {
                                                let bgcolor = 'inherit';
                                                if (cell.isGrouped) bgcolor = 'success.lighter';
                                                if (cell.isAggregated) bgcolor = 'warning.lighter';
                                                if (cell.isPlaceholder) bgcolor = 'error.lighter';
                                                if (cell.isPlaceholder) bgcolor = 'error.lighter';
                                                if (row.isSelected) bgcolor = alpha(theme.palette.primary.lighter, 0.35);
                                                const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;

                                                return (
                                                    <TableCell
                                                        key={index}
                                                        {...cell.getCellProps([{ className: cell.column.className }])}
                                                        sx={{ bgcolor }}
                                                    >
                                                        {cell.isGrouped ? (
                                                            <Stack
                                                                direction="row"
                                                                spacing={1}
                                                                alignItems="center"
                                                                sx={{ display: 'inline-flex' }}
                                                            >
                                                                <Box
                                                                    sx={{ pr: 1.25, fontSize: '0.75rem', color: 'text.secondary' }}
                                                                    onClick={(e) => {
                                                                        row.toggleRowExpanded();
                                                                        e.stopPropagation();
                                                                    }}
                                                                >
                                                                    {collapseIcon}
                                                                </Box>
                                                                {cell.render('Cell')} ({row.subRows.length})
                                                            </Stack>
                                                        ) : cell.isAggregated ? (
                                                            cell.render('Aggregated')
                                                        ) : cell.isPlaceholder ? null : (
                                                            cell.render('Cell')
                                                        )}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <EmptyTable msg="Nenhum Registro Encontrado" colSpan={9} />
                            )}
                        </TableBody>
                    </Table>
                </Box>
                <Box sx={{ p: 2, py: 0 }}>
                    <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
                </Box>

                <Grid item xs={12} sm={12}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        spacing={2}
                        sx={{ height: '100%', pb: 2, pr: 2 }}
                    >
                        {!view && (
                            <Button
                                disabled={isLoading}
                                startIcon={isLoading && <CircularProgress size={20} />}
                                color="primary"
                                variant="contained"
                                type="submit"
                                onClick={handleSaveChanges}
                            >
                                Salvar
                            </Button>
                        )}
                    </Stack>
                </Grid>
            </Stack>
        </>
    );
}

// Section Cell and Header
const SelectionCell = ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
    <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
);

SelectionCell.propTypes = {
    row: PropTypes.object
};

SelectionHeader.propTypes = {
    getToggleAllPageRowsSelectedProps: PropTypes.func
};

// ==============================|| REACT TABLE - EDITABLE CELL ||============================== //

const TabelaNovaLinhaDominio = (props) => {
    const { columns, data, showDelete, openDeleteModal, load, codDominio, state, title } = props;

    const [dados, setDados] = useState(data);

    useEffect(() => {
        setDados(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <Page>
            <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                <ScrollX>
                    <ReactTable
                        columns={columns}
                        dados={dados}
                        showDelete={showDelete}
                        openDeleteModal={openDeleteModal}
                        load={load}
                        codDominio={codDominio}
                        state={state}
                        title={title}
                    />
                    <DragPreview />
                </ScrollX>
            </DndProvider>
        </Page>
    );
};

TabelaNovaLinhaDominio.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    showDelete: PropTypes.bool,
    handleAdd: PropTypes.func,
    codDominio: PropTypes.number
};

TabelaNovaLinhaDominio.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default TabelaNovaLinhaDominio;
