import Loader from 'components/Loader';
import Page from 'components/Page';
import PerguntaForm from 'components/forms/core/PerguntaForm';
import Layout from 'layout';
import { getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { dispatch, useSelector } from 'store';
import { fetchById } from 'store/reducers/pergunta';

const Visualizar = () => {
    const intl = useIntl();
    const router = useRouter();
    const { id } = router.query;
    const { item, isLoader } = useSelector((state) => state.pergunta);

    useEffect(() => {
        if (id) dispatch(fetchById(id));
    }, [id]);

    if (isLoader || !item) return <Loader />;
    return (
        <Page title={intl.formatMessage({ id: 'pergunta' })}>
            <PerguntaForm initialValues={item} title={intl.formatMessage({ id: 'pergunta' })} state="view" />
        </Page>
    );
};

Visualizar.getLayout = (page) => <Layout>{page}</Layout>;
export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context);
    return { props: { csrfToken } };
}
export default Visualizar;
