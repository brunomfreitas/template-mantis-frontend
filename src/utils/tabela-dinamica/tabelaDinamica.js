import {
    DeleteTwoTone,
    DownOutlined,
    EyeOutlined,
    // EditTwoTone,
    EyeTwoTone,
    FormOutlined,
    GroupOutlined,
    PlusOutlined,
    RightOutlined,
    // SendOutlined,
    UngroupOutlined
} from '@ant-design/icons';
import {
    Box,
    Button,
    // Chip,
    Divider,
    IconButton,
    // MenuItem,
    // Select,
    // Slider,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableRow,
    // TextField,
    Tooltip
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import Avatar from 'components/@extended/Avatar';
// import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import {
    CSVExport,
    DragPreview,
    DraggableHeader,
    EmptyTable,
    HeaderSort,
    HidingSelect,
    IndeterminateCheckbox,
    TablePagination
    // TableRowSelection
} from 'components/third-party/ReactTable';
// import { ThemeMode } from 'config';
// import { Form, Formik } from 'formik';
import update from 'immutability-helper';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
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
// import { atualizarStatusAtendimento } from 'store/reducers/prontuario';
import { DefaultColumnFilter, GlobalFilter, renderFilterTypes } from 'utils/react-table';

// ==============================|| REACT TABLE - ActionsCell ||============================== //
/* eslint-disable react/prop-types */
const ActionsCell = ({
    row,
    showButtonView,
    urlView,
    showButtonEdit,
    urlEdit,
    showButtonDelete,
    openDeleteModal,
    showButtonPreView,
    openPreViewModal
}) => {
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();
    const emAtendimento = { st_atendimento: 'E' };

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
            {/** IMPLEMENTAÇÃO DO BOTÃO DE VISUALIZAR REGISTRO */}
            {showButtonView ? (
                <Tooltip title="Visualizar Registro">
                    <IconButton
                        color="primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`${urlView}${row.original.ID}`);
                        }}
                    >
                        <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
                    </IconButton>
                </Tooltip>
            ) : null}
            {/** IMPLEMENTAÇÃO DO BOTÃO DE PRE VIEW REGISTRO */}
            {showButtonPreView ? (
                <Tooltip title="PreView">
                    <IconButton
                        color="primary"
                        disabled={false}
                        onClick={(e) => {
                            e.stopPropagation();
                            openPreViewModal(row.original);
                        }}
                    >
                        <EyeOutlined />
                    </IconButton>
                </Tooltip>
            ) : null}
            {/** IMPLEMENTAÇÃO DO BOTÃO DE EDITAR REGISTRO */}
            {showButtonEdit ? (
                row.original.st_atendimento == 'A' ? (
                    <Tooltip title="Iniciar Atendimento">
                        <IconButton
                            color="primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                router.push(`${urlEdit}${row.original.ID}`);
                                // dispatch(atualizarStatusAtendimento(row.original.ID, emAtendimento));
                            }}
                        >
                            <FormOutlined twoToneColor={theme.palette.primary.main} />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Editar Registro">
                        <IconButton
                            color="primary"
                            disabled={row.original.FLG_PERFIL_BASE == '1' || row.original.SIGLA == 'SAS' ? true : false}
                            onClick={(e) => {
                                e.stopPropagation();
                                router.push(`${urlEdit}${row.original.ID}`);
                            }}
                        >
                            <FormOutlined twoToneColor={theme.palette.primary.main} />
                        </IconButton>
                    </Tooltip>
                )
            ) : null}
            {/** IMPLEMENTAÇÃO DO BOTÃO DE EXCLUIR REGISTRO */}
            {showButtonDelete ? (
                <Tooltip title="Excluir">
                    <IconButton
                        color="error"
                        disabled={row.original.FLG_PERFIL_BASE == '1' || row.original.SIGLA == 'SAS' ? true : false}
                        onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(row.original.ID);
                        }}
                    >
                        <DeleteTwoTone
                            twoToneColor={
                                row.original.FLG_PERFIL_BASE == '1' || row.original.SIGLA == 'SAS' ? '#E0E0E0' : theme.palette.error.main
                            }
                        />
                    </IconButton>
                </Tooltip>
            ) : null}
            {/** IMPLEMENTAÇÃO DO BOTÃO DE EDITAR LINHA */}
            {/* {showButtonEditRow ? (
        <Tooltip title={editableRowIndex !== row.index ? 'Editar Linha' : 'Salvar'}>
          <IconButton
            color={editableRowIndex !== row.index ? 'primary' : 'success'}
            disabled={row.original.FLG_PERFIL_BASE == '1'}
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
      ) : null} */}
        </Stack>
    );
};

ActionsCell.propTypes = {
    row: PropTypes.object,
    showButtonView: PropTypes.bool,
    urlView: PropTypes.string,
    showButtonEdit: PropTypes.bool,
    urlEdit: PropTypes.string,
    showButtonDelete: PropTypes.bool,
    openDeleteModal: PropTypes.func
};

// ==============================|| REACT TABLE - TabelaDinamica ||============================== //

const TabelaDinamica = (props) => {
    // eslint-disable-next-line no-unused-vars
    const {
        columns,
        data,
        handleAdd,
        renderRowSubComponent,
        showCreate,
        showEdit,
        editar,
        showView,
        visualizar,
        showDelete,
        openDeleteModal,
        showPreView,
        openPreViewModal,
        showEditRow,
        showAction,
        tableFooter,
        pagination,
        setPagination
    } = props;

    return (
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
            <MainCard content={false}>
                <ScrollX>
                    <ReactTable
                        columns={columns}
                        data={data}
                        handleAdd={handleAdd}
                        renderRowSubComponent={renderRowSubComponent}
                        getHeaderProps={(column) => column.getSortByToggleProps()}
                        showCreate={showCreate}
                        showEdit={showEdit}
                        editar={editar}
                        showView={showView}
                        visualizar={visualizar}
                        showDelete={showDelete}
                        openDeleteModal={openDeleteModal}
                        showPreView={showPreView}
                        openPreViewModal={openPreViewModal}
                        showEditRow={showEditRow}
                        showAction={showAction}
                        tableFooter={tableFooter}
                        pagination={pagination}
                        setPagination={setPagination}
                    />
                    <DragPreview />
                </ScrollX>
            </MainCard>
        </DndProvider>
    );
};

TabelaDinamica.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    getHeaderProps: PropTypes.func,
    handleAdd: PropTypes.func,
    renderRowSubComponent: PropTypes.any,
    actionsButton: PropTypes.func,
    showCreate: PropTypes.bool,
    showView: PropTypes.bool,
    showDelete: PropTypes.bool,
    showEdit: PropTypes.bool,
    showEditRow: PropTypes.bool,
    showAction: PropTypes.bool,
    tableFooter: PropTypes.bool,
    showView: PropTypes.bool,
    visualizar: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    editar: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    openDeleteModal: PropTypes.func
};

export default TabelaDinamica;

// ==============================|| REACT TABLE - UMBRELLA ||============================== //

// eslint-disable-next-line no-unused-vars
function ReactTable({
    columns,
    data,
    handleAdd,
    showCreate,
    showView,
    visualizar,
    showEdit,
    editar,
    showDelete,
    openDeleteModal,
    showPreView,
    openPreViewModal,
    showAction,
    tableFooter,
    pagination,
    setPagination
}) {
    const theme = useTheme();
    const filterTypes = useMemo(() => renderFilterTypes(), []);

    // const filterTypes = useMemo(() => renderFilterTypes, []);
    // const [showButtonEdit, setShowButtonEdit] = useState(showEdit);
    // const [showButtonView, setShowButtonView] = useState(showView);
    // const [showButtonDelete, setShowButtonDelete] = useState(showDelete);
    // const [showButtonPreView, setShowButtonPreView] = useState(showPreView);
    // const [urlEdit, setUrlEdit] = useState(editar);
    // const [urlView, setUrlView] = useState(visualizar);

    const showButtonEdit = !!showEdit;
    const showButtonView = !!showView;
    const showButtonDelete = !!showDelete;
    const showButtonPreView = !!showPreView;
    const urlEdit = editar;
    const urlView = visualizar;

    const defaultColumn = useMemo(
        () => ({
            Filter: DefaultColumnFilter
        }),
        []
    );

    const pageIndexFromParent = pagination?.pageIndex ?? 0;
    const pageSizeFromParent = pagination?.pageSize ?? 10;
    const totalFromParent = pagination?.total ?? data.length;
    const pageCount = Math.max(1, Math.ceil(totalFromParent / pageSizeFromParent));

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        page,
        prepareRow,
        setColumnOrder,
        gotoPage,
        setPageSize,
        setHiddenColumns,
        allColumns,
        state: { globalFilter, filters, hiddenColumns, pageIndex, pageSize, columnOrder },
        preGlobalFilteredRows,
        setGlobalFilter,
        selectedFlatRows
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
            initialState: {
                pageIndex: pageIndexFromParent,
                pageSize: pageSizeFromParent
            },
            manualPagination: true, // paginação no backend
            manualGlobalFilter: true, // filtro global no backend
            manualFilters: true, // filtros de coluna no backend
            autoResetGlobalFilter: false,
            autoResetFilters: false,

            pageCount,

            showEdit,
            urlEdit,
            // setUrlEdit,

            showButtonEdit,
            // setShowButtonEdit,

            showView,
            urlView,
            // setUrlView,

            showButtonView,
            // setShowButtonView,

            showDelete,
            openDeleteModal,
            showButtonDelete,
            // setShowButtonDelete,

            showPreView,
            showButtonPreView,
            // setShowButtonPreView,
            openPreViewModal,

            tableFooter
        },
        // se for tudo server-side, você pode remover useFilters & useGlobalFilter
        useGlobalFilter,
        useFilters,
        useColumnOrder,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        (hooks) => {
            if (showAction) {
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

    // quando o pai mudar pageIndex/pageSize (por causa da API), sincroniza o react-table
    useEffect(() => {
        if (pageIndex !== pageIndexFromParent) {
            gotoPage(pageIndexFromParent);
        }
    }, [pageIndexFromParent, gotoPage]);

    useEffect(() => {
        if (pageSize !== pageSizeFromParent) {
            setPageSize(pageSizeFromParent);
        }
    }, [pageSizeFromParent, setPageSize]);

    useEffect(() => {
        if (!setPagination) return;

        const serializedFilters = (filters || []).map((f) => {
            const col = allColumns.find((c) => c.id === f.id);
            const fieldType = col?.fieldType ?? (col?.dataType === 'text' ? 'string' : undefined);
            const mode = col?.filterMode;

            return {
                id: f.id,
                value: f.value,
                fieldType,
                mode
            };
        });

        const filterPayload = JSON.stringify({
            global: globalFilter || '',
            filters: serializedFilters,
            config: serializedFilters // 👈 vai junto para o backend
        });

        setPagination((prev) => {
            const prevFilter = prev?.filter ?? '';

            // se o filtro não mudou, não faz nada (não reseta página)
            if (prevFilter === filterPayload) return prev;

            return {
                ...(prev || {}),
                pageIndex: 0, // 👉 só aqui, quando o filtro mudou de verdade
                filter: filterPayload
            };
        });
    }, [globalFilter, filters, allColumns, setPagination]);

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
                        <CSVExport
                            data={
                                selectedFlatRows.length > 0 ? selectedFlatRows.map((d) => d.original).filter((d) => d !== undefined) : data
                            }
                            filename={'table.csv'}
                            headers={headers}
                        />
                        {showCreate ? (
                            <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAdd}>
                                Cadastrar/Incluir
                            </Button>
                        ) : (
                            ''
                        )}
                    </Stack>
                </Stack>

                <Box sx={{ width: '100%', overflowX: 'auto', display: 'block' }}>
                    <Table {...getTableProps()}>
                        <TableHead sx={{ borderTopWidth: 2 }}>
                            {headerGroups.map((headerGroup, i) => {
                                const { key: headerGroupKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                                return (
                                    <TableRow key={headerGroupKey || i} {...restHeaderGroupProps}>
                                        {headerGroup.headers.map((column, index) => {
                                            const { key: columnKey, ...restColumnProps } = column.getHeaderProps([
                                                { className: 'cell-center' }
                                            ]);
                                            const groupIcon = column.isGrouped ? <UngroupOutlined /> : <GroupOutlined />;

                                            return (
                                                <TableCell key={columnKey || index} {...restColumnProps}>
                                                    <DraggableHeader reorder={reorder} column={column} index={index}>
                                                        <Stack
                                                            direction="row"
                                                            spacing={1.15}
                                                            alignItems="center"
                                                            sx={{ display: 'inline-flex' }}
                                                        >
                                                            {column.canGroupBy && (
                                                                <Box
                                                                    sx={{
                                                                        color: column.isGrouped ? 'error.main' : 'primary.main',
                                                                        fontSize: '1rem'
                                                                    }}
                                                                    {...column.getGroupByToggleProps()}
                                                                >
                                                                    {groupIcon}
                                                                </Box>
                                                            )}
                                                            <HeaderSort column={column} sort />
                                                        </Stack>
                                                    </DraggableHeader>
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableHead>

                        {/* striped table -> add class 'striped' */}
                        <TableBody {...getTableBodyProps()} className="striped">
                            {headerGroups.map((group, i) => {
                                const { key: groupKey, ...restGroupProps } = group.getHeaderGroupProps();
                                return (
                                    <TableRow key={groupKey || i} {...restGroupProps}>
                                        {group.headers.map((column, index) => {
                                            const { key: columnKey, ...restColumnProps } = column.getHeaderProps([
                                                { className: column.className }
                                            ]);

                                            return (
                                                <TableCell key={columnKey || index} {...restColumnProps}>
                                                    {column.canFilter ? column.render('Filter') : null}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                            {page.length > 0 ? (
                                page.map((row, i) => {
                                    prepareRow(row);

                                    const { key: rowKey, ...restRowProps } = row.getRowProps();

                                    return (
                                        <TableRow
                                            key={rowKey || i}
                                            {...restRowProps}
                                            sx={{
                                                cursor: 'pointer',
                                                bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit'
                                            }}
                                        >
                                            {row.cells.map((cell, index) => {
                                                const { key: cellKey, ...restCellProps } = cell.getCellProps([
                                                    { className: cell.column.className }
                                                ]);

                                                let bgcolor = 'inherit';
                                                if (cell.isGrouped) bgcolor = 'success.lighter';
                                                if (cell.isAggregated) bgcolor = 'warning.lighter';
                                                if (cell.isPlaceholder) bgcolor = 'error.lighter';
                                                if (row.isSelected) bgcolor = alpha(theme.palette.primary.lighter, 0.35);

                                                const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;

                                                return (
                                                    <TableCell key={cellKey || index} {...restCellProps} sx={{ bgcolor }}>
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

                            {/* footer table */}
                            {tableFooter ? (
                                <TableFooter sx={{ borderBottomWidth: 2 }}>
                                    {footerGroups.map((group, i) => {
                                        const { key: groupKey, ...restGroupProps } = group.getFooterGroupProps();

                                        return (
                                            <TableRow key={groupKey || i} {...restGroupProps}>
                                                {group.headers.map((column, index) => {
                                                    const { key: columnKey, ...restFooterProps } = column.getFooterProps([
                                                        { className: column.className }
                                                    ]);

                                                    return (
                                                        <TableCell key={columnKey || index} {...restFooterProps}>
                                                            {column.render('Footer')}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableFooter>
                            ) : null}

                            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
                                <TableCell sx={{ p: 2, py: 2 }} colSpan={9}>
                                    <TablePagination
                                        gotoPage={gotoPage}
                                        rows={rows}
                                        setPageSize={setPageSize}
                                        pageSize={pageSizeFromParent}
                                        pageIndex={pageIndexFromParent}
                                        pagination={pagination}
                                        setPagination={setPagination}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
                <Divider />
            </Stack>
        </>
    );
}

ReactTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    getHeaderProps: PropTypes.func,
    handleAdd: PropTypes.func,
    renderRowSubComponent: PropTypes.any,
    showCreate: PropTypes.bool,
    showEditRow: PropTypes.bool,
    showDelete: PropTypes.bool,
    showEdit: PropTypes.bool,
    showAction: PropTypes.bool,
    tableFooter: PropTypes.bool,
    showView: PropTypes.bool,
    visualizar: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    editar: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    openDeleteModal: PropTypes.func
};

// ==============================|| REACT TABLE - UMBRELLA ||============================== //

// Section Cell Avatar
const CellAvatar = ({ value }) => <Avatar alt="Avatar 1" size="sm" src={`/assets/images/users/avatar-${!value ? 1 : value}.png`} />;

CellAvatar.propTypes = {
    value: PropTypes.number
};

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
