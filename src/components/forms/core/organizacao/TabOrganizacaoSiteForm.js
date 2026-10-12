import MainCard from 'components/MainCard';
import Layout from 'layout';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import TabelaDinamica from 'utils/tabela-dinamica/tabelaDinamica';

const TabOrganizacaoSiteForm = (props) => {
    const { data } = props;

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id_site',
                dataType: 'text',
                className: 'cell-center',
                disableSortBy: false,
                disableFilters: false,
                disableGroupBy: true
            },
            {
                Header: 'Site',
                accessor: 'nm_site',
                dataType: 'text',
                className: 'cell-right',
                disableGroupBy: true
            },
            {
                Header: 'Ativo',
                accessor: 'st_ativo',
                dataType: 'text',
                className: 'cell-center',
                disableGroupBy: true
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <MainCard border={false} title={'Listagem de sites vinculados a organização'} boxShadow>
            <TabelaDinamica
                columns={columns}
                data={data}
                showCreate={false}
                showDelete
                showEdit
                showView
                showEditRow={false}
                showAction={false}
                tableFooter={false}
            />
        </MainCard>
    );
};

TabOrganizacaoSiteForm.propTypes = {
    initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    title: PropTypes.string,
    state: PropTypes.string
};

TabOrganizacaoSiteForm.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default TabOrganizacaoSiteForm;
