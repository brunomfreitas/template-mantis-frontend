import Loader from 'components/Loader';
import Page from 'components/Page';
import GrupoSegurancaForm from 'components/forms/core/grupo-seguranca/GrupoSegurancaForm';
import Layout from 'layout';
import { getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { dispatch, useSelector } from 'store';
import { fetchById } from 'store/reducers/grupo-seguranca';

const Editar = () => {
    const intl = useIntl();
    const router = useRouter();
    const { id } = router.query;
    const { item, isLoader } = useSelector((state) => state.grupoSeguranca);

    const load = () => {
        dispatch(fetchById(id));
    };

    useEffect(() => {
        if (id) load();
    }, [id]);

    if (isLoader || !item) return <Loader />;

    return (
        <Page title={intl.formatMessage({ id: 'grupo-seguranca.title' })}>
            <GrupoSegurancaForm initialValues={item} title={intl.formatMessage({ id: 'grupo-seguranca.title' })} state="edit" load={load} />
        </Page>
    );
};

Editar.getLayout = (page) => <Layout>{page}</Layout>;
export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context);
    return { props: { csrfToken } };
}
export default Editar;
