import Page from 'components/Page';
import OrganizacaoForm from 'components/forms/core/organizacao/OrganizacaoForm';
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
        <Page title={intl.formatMessage({ id: 'organizacao' })}>
            <OrganizacaoForm initialValues={data} title={intl.formatMessage({ id: 'organizacao' })} state="create" />
        </Page>
    );
};

Novo.getLayout = (page) => <Layout>{page}</Layout>;
export default Novo;
