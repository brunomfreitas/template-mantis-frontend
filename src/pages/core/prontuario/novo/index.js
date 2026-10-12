import AplicacaoForm from 'components/forms/core/AplicacaoForm';
import Page from 'components/Page';
import Layout from 'layout';
import { useIntl } from 'react-intl';

const Novo = () => {
    const intl = useIntl();

    const data = {
        cd_aplicacao: null,
        nm_aplicacao: null
    };

    return (
        <Page title={intl.formatMessage({ id: 'aplicacao.title' })}>
            <AplicacaoForm initialValues={data} title={intl.formatMessage({ id: 'aplicacao.title' })} state="create" />
        </Page>
    );
};

Novo.getLayout = (page) => <Layout>{page}</Layout>;
export default Novo;
