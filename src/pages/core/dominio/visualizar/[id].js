import DominioForm from 'components/forms/core/dominio.form';
import Loader from 'components/Loader';
import Page from 'components/Page';
import Layout from 'layout';
import { getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { dispatch, useSelector } from 'store';
import { fetchById, search } from 'store/reducers/dominio';

const Visualizar = () => {
    const intl = useIntl();
    const router = useRouter();
    const { id } = router.query;
    const { list, item, isLoader } = useSelector((state) => state.dominio);

    useEffect(() => {
        if (id) {
            dispatch(fetchById(id));
            dispatch(
                search({
                    page: 1,
                    pageSize: 1000,
                    filter: 'st_ativo = true'
                })
            );
        }
    }, [id]);

    if (isLoader || list.length === 0) return <Loader />;

    return (
        <Page title={intl.formatMessage({ id: 'dominio.title' })}>
            <DominioForm
                initialValues={item}
                dominios={list}
                title={intl.formatMessage({ id: 'dominio.title' })}
                state="edit" // edit or view or create
            />
        </Page>
    );
};

Visualizar.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context);

    return {
        props: { csrfToken }
    };
}

export default Visualizar;
