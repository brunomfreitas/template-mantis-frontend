import Loader from 'components/Loader';
import Page from 'components/Page';
import SiteForm from 'components/forms/core/SiteForm';
import Layout from 'layout';
import { getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { dispatch, useSelector } from 'store';
import { fetchById } from 'store/reducers/site';

const Editar = () => {
    const intl = useIntl();
    const router = useRouter();
    const { id } = router.query;

    const { item: site, isLoader } = useSelector((state) => state.site);

    useEffect(() => {
        if (id) dispatch(fetchById(id));
    }, [id]);

    if (isLoader || !site) return <Loader />;

    return (
        <Page title={intl.formatMessage({ id: 'site' })}>
            <SiteForm initialValues={site} title={intl.formatMessage({ id: 'site.title' })} state="edit" />
        </Page>
    );
};

Editar.getLayout = (page) => <Layout>{page}</Layout>;
export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context);
    return { props: { csrfToken } };
}
export default Editar;
