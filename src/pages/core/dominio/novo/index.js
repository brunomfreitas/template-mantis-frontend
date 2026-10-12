import Loader from 'components/Loader';
import Page from 'components/Page';
import DominioForm from 'components/forms/core/dominio.form';
import Layout from 'layout';
import { getCsrfToken } from 'next-auth/react';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { dispatch, useSelector } from 'store/index';
import { search } from 'store/reducers/dominio';

const Novo = () => {
    const intl = useIntl();

    const initialValues = {
        nm_dominio: null,
        ds_dominio: null,
        ds_alias: null,
        dominio_valor: [],
        id_dominio_sup: null,
        id_dominio_valor_sup: null
    };

    const { list, isLoader } = useSelector((state) => state.dominio);

    useEffect(() => {
        dispatch(
            search({
                page: 1,
                pageSize: 1000,
                filter: 'st_ativo = true'
            })
        );
    }, []);

    if (isLoader) return <Loader />;

    return (
        <Page title={intl.formatMessage({ id: 'dominio.title' })}>
            <DominioForm
                initialValues={initialValues}
                dominios={list}
                title={intl.formatMessage({ id: 'dominio.title' })}
                state="create" // edit or view or create
            />
        </Page>
    );
};

Novo.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context);

    return {
        props: { csrfToken }
    };
}

export default Novo;
