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
    Chip,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Pagination,
    Select,
    Slider,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import Page from 'components/Page';
import ScrollX from 'components/ScrollX';
import { CSVExport, DragPreview, DraggableHeader, EmptyTable, HeaderSort, IndeterminateCheckbox } from 'components/third-party/ReactTable';
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
import { DefaultColumnFilter, renderFilterTypes } from 'utils/react-table';
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

    const ShowStatus = (value) => {
        switch (value) {
            case 'Inativo':
                return <Chip color="error" label="Inativo" size="small" variant="light" />;
            case 'Ativo':
                return <Chip color="success" label="Ativo" size="small" variant="light" />;
            case null:
            default:
                return <Chip color="info" label="Null" size="small" variant="light" />;
        }
    };

    let element;
    let userInfoSchema;

    switch (id) {
        case 'email':
            userInfoSchema = Yup.object().shape({
                userInfo: Yup.string().email('Enter valid email ').required('Email is a required field')
            });
            break;
        case 'age':
            userInfoSchema = Yup.object().shape({
                userInfo: Yup.number()
                    .required('Age is required')
                    .typeError('Age must be number')
                    .min(18, 'You must be at least 18 years')
                    .max(100, 'You must be at most 60 years')
            });
            break;
        case 'visits':
            userInfoSchema = Yup.object().shape({
                userInfo: Yup.number().typeError('Visits must be number').required('Required')
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
                                {({ values, errors, touched }) => (
                                    <Form>
                                        <TextField
                                            value={values.userInfo}
                                            id={`${index}-${id}`}
                                            name="userInfo"
                                            onChange={onChange}
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
        case 'select':
            element = (
                <>
                    {IsEditAble ? (
                        <Select
                            labelId="demo-simple-select-label"
                            sx={{
                                '& .MuiOutlinedInput-input': {
                                    py: 0.75,
                                    px: 1,
                                    backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'inherit' : 'common.white'
                                }
                            }}
                            id="demo-simple-select"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                        >
                            <MenuItem value={false}>
                                <Chip color="error" label="Inativo" size="small" variant="light" />
                            </MenuItem>
                            <MenuItem value={true}>
                                <Chip color="success" label="Ativo" size="small" variant="light" />
                            </MenuItem>
                            <MenuItem value={null}>
                                <Chip color="info" label="Selecione" size="small" variant="light" />
                            </MenuItem>
                        </Select>
                    ) : (
                        ShowStatus(value)
                    )}
                </>
            );
            break;
        case 'progress':
            element = (
                <>
                    {IsEditAble ? (
                        <>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ pl: 1, minWidth: 120 }}>
                                <Slider
                                    value={value}
                                    min={0}
                                    max={100}
                                    step={1}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="non-linear-slider"
                                />
                            </Stack>
                        </>
                    ) : (
                        <div>
                            <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
                        </div>
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

const ActionsCell = ({ row, showButtonDelete, openDeleteModal }) => {
    const theme = useTheme();

    return (
        /* TEMPLATE
    return (
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
        <Tooltip title="View">
          <IconButton
            color="secondary"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/apps/invoice/details/${row.values.ID}`);
            }}
          >
            <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
          </IconButton>
        </Tooltip>
      </Stack>
    );
  */

        <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
            {/** IMPLEMENTAÇÃO DO BOTÃO DE EXCLUIR REGISTRO */}
            {/* <Tooltip title={editableRowIndex !== row.index ? 'Edit' : 'Save'}>
        <IconButton
          color={editableRowIndex !== row.index ? 'primary' : 'success'}
          onClick={(e) => {
            e.stopPropagation();
            const currentIndex = row.index;
            if (editableRowIndex !== currentIndex) {
              // row requested for edit access
              setEditableRowIndex(currentIndex);
            } else {
              // request for saving the updated row
              setEditableRowIndex(null);
            }
          }}
        >
          {editableRowIndex !== row.index ? <EditTwoTone /> : <SendOutlined />}
        </IconButton>
      </Tooltip> */}
            {/** IMPLEMENTAÇÃO DO BOTÃO DE EXCLUIR REGISTRO */}
            {showButtonDelete ? (
                <Tooltip title="Excluir">
                    <IconButton
                        color="error"
                        disabled={false}
                        onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(row.original.id_dominio_valor);
                        }}
                    >
                        <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                    </IconButton>
                </Tooltip>
            ) : null}
        </Stack>
    );
};

ActionsCell.propTypes = {
    row: PropTypes.object,
    showButtonDelete: PropTypes.bool,
    handleDelete: PropTypes.func,
    setEditableRowIndex: PropTypes.func,
    editableRowIndex: PropTypes.number,

    openDeleteModal: PropTypes.func,
    showDelete: PropTypes.bool,
    title: PropTypes.func
};

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
                            // row requested for edit access
                            setEditableRowIndex(currentIndex);
                        } else {
                            // request for saving the updated row
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

// ==============================|| TABLE PAGINATION ||============================== //

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
        <Grid container alignItems="center" justifyContent="space-between" sx={{ width: 'auto' }}>
            <Grid item>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="caption" color="secondary">
                            Row per page
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
                    <Typography variant="caption" color="secondary">
                        Go to
                    </Typography>
                    <TextField
                        size="small"
                        type="number"
                        value={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) : 0;
                            gotoPage(page - 1);
                        }}
                        sx={{ '& .MuiOutlinedInput-input': { py: 0.75, px: 1.25, width: 36 } }}
                    />
                </Stack>
            </Grid>
            <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
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

// ==============================|| REACT TABLE - UMBRELLA ||============================== //

// const CellAvatar = ({ value }) => <Avatar alt="Avatar 1" size="sm" src={`/assets/images/users/avatar-${!value ? 1 : value}.png`} />;

// CellAvatar.propTypes = {
//   value: PropTypes.number
// };

// ==============================|| REACT TABLE - UMBRELLA ||============================== //

ReactTable.propTypes = {
    columns: PropTypes.array,
    datas: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    updateData: PropTypes.func,
    skipPageReset: PropTypes.bool,
    handleAdd: PropTypes.func,
    codDominio: PropTypes.number,
    openDeleteModal: PropTypes.func,
    showDelete: PropTypes.bool,
    title: PropTypes.func
};

function ReactTable({ columns, datas, showDelete, openDeleteModal, handleAdd, codDominio, title }) {
    const theme = useTheme();

    const [, setUnsavedChanges] = useState(false);
    const [skipPageReset, setSkipPageReset] = useState(false);
    const [data, setData] = useState(datas);
    const [showButtonDelete, setShowButtonDelete] = useState(showDelete);

    const filterTypes = useMemo(() => renderFilterTypes, []);
    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter, Cell: EditableRow }), []);
    const initialState = useMemo(
        () => ({
            filters: [{ id: 'status', value: '' }],
            hiddenColumns: [],
            columnOrder: [],
            // hiddenColumns: ['id', 'role', 'contact', 'country', 'fatherName'],
            // columnOrder: ['selection', 'avatar', 'lastName', 'firstName', 'email', 'age', 'visits', 'status', 'progress'],
            pageIndex: 0,
            pageSize: 10
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
        // setHiddenColumns,
        allColumns,
        state: {
            // globalFilter,
            hiddenColumns,
            pageIndex,
            pageSize,
            columnOrder
            // , selectedRowIds
        },
        // preGlobalFilteredRows,
        // setGlobalFilter,
        selectedFlatRows
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
            codDominio
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
                    Header: 'AÇÕES',
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

    const handleSaveChanges = () => {
        // Aqui montamos um objeto que contém os dados editados em formato JSON
        // Agora você tem os dados editados em formato JSON em `dataToExport`
        // Você pode implementar a lógica para enviar `dataToExport` para o serviço correto
        // Por exemplo, usando uma solicitação POST para o servidor.

        // Depois de salvar as mudanças, você pode redefinir a marcação das mudanças não salvas
        setUnsavedChanges(false);
        // VALIDAR O SEGUINTE RESULTADO:
        handleAdd(data);
    };

    useEffect(() => {
        setSkipPageReset(false);
    }, [data]);

    function updateData(rowIndex, columnId, value) {
        setSkipPageReset(true);
        setData((old) =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    const updatedRow = {
                        ...old[rowIndex],
                        [columnId]: value
                    };
                    setUnsavedChanges(true); // Marca as mudanças não salvas
                    return updatedRow;
                }
                return row;
            })
        );
    }

    const handleAddRow = () => {
        setSkipPageReset(true);
        setData((old) => [
            ...old,
            // estrutura da nova linha
            {
                id_dominio: codDominio,
                nm_dominio_valor: null,
                ds_dominio_valor: null,
                st_ativo: true
            }
        ]);
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
                <Stack direction="row" justifyContent="space-between" sx={{ p: 0, pb: 0 }}>
                    <Typography variant="h5">{title}</Typography>
                    <Stack direction="row" spacing={2}>
                        <CSVExport
                            data={
                                selectedFlatRows.length > 0 ? selectedFlatRows.map((d) => d.original).filter((d) => d !== undefined) : data
                            }
                            filename={'umbrella-table.csv'}
                            headers={headers}
                        />
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
                                            <TableCell
                                                key={`umbrella-header-cell-${index}`}
                                                {...column.getHeaderProps([{ className: column.className }])}
                                            >
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
                                <EmptyTable msg="No Data" colSpan={9} />
                            )}
                        </TableBody>

                        {/* footer table */}
                        {/* <TableFooter sx={{ borderBottomWidth: 2 }}>
              {footerGroups.map((group, i) => (
                <TableRow key={i} {...group.getFooterGroupProps()}>
                  {group.headers.map((column, index) => (
                    <TableCell key={index} {...column.getFooterProps([{ className: column.className }])}>
                      {column.render('Footer')}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableFooter> */}
                    </Table>
                </Box>
                <Box sx={{ p: 2, py: 0 }}>
                    <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
                </Box>

                <Grid item xs={12} md={12}>
                    <Stack spacing={1} justifyContent="space-between">
                        <Box sx={{ pt: 2.5, pr: 2.5, pb: 2.5, pl: 2 }}>
                            <Button
                                color="primary"
                                startIcon={<PlusOutlined />}
                                onClick={handleAddRow}
                                variant="dashed"
                                sx={{ bgcolor: 'transparent !important' }}
                            >
                                Nova Linha
                            </Button>
                        </Box>
                    </Stack>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        spacing={2}
                        sx={{ height: '100%', pb: 2, pr: 2 }}
                    >
                        <Button variant="outlined" color="secondary" sx={{ color: 'secondary.dark' }} onClick={() => onCancel()}>
                            Cancelar
                        </Button>
                        <Button color="primary" variant="contained" type="submit" onClick={handleSaveChanges}>
                            Salvar
                        </Button>
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

const TabelaNovaLinha = (props) => {
    const { columns, data, showDelete, openDeleteModal, handleAdd, codDominio, title } = props;

    return (
        <Page>
            <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                <ScrollX>
                    <ReactTable
                        columns={columns}
                        datas={data}
                        showDelete={showDelete}
                        openDeleteModal={openDeleteModal}
                        handleAdd={handleAdd}
                        codDominio={codDominio}
                        title={title}
                    />
                    <DragPreview />
                </ScrollX>
            </DndProvider>
        </Page>
    );
};

TabelaNovaLinha.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    showDelete: PropTypes.bool,
    handleAdd: PropTypes.func,
    codDominio: PropTypes.number,
    title: PropTypes.string,
    openDeleteModal: PropTypes.func
};

TabelaNovaLinha.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default TabelaNovaLinha;
