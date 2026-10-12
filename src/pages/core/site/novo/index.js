import Page from 'components/Page';
import SiteForm from 'components/forms/core/SiteForm';
import Layout from 'layout';
import { useIntl } from 'react-intl';

const Novo = () => {
    const intl = useIntl();

    const data = {
        nm_site: '',
        id_organizacao: '',
        dt_cadastro: '',
        st_ativo: ''
    };

    return (
        <Page title={intl.formatMessage({ id: 'site' })}>
            <SiteForm initialValues={data} title={intl.formatMessage({ id: 'site' })} state="create" />
        </Page>
    );
};

Novo.getLayout = (page) => <Layout>{page}</Layout>;
export default Novo;
