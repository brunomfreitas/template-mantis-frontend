import GrupoSegurancaForm from 'components/forms/core/grupo-seguranca/GrupoSegurancaForm';
import Page from 'components/Page';
import Layout from 'layout';
import { useIntl } from 'react-intl';

const Novo = () => {
    const intl = useIntl();

    const data = {
        nm_grupo_seguranca: null
    };

    return (
        <Page title={intl.formatMessage({ id: 'grupo-seguranca.title' })}>
            <GrupoSegurancaForm initialValues={data} title={intl.formatMessage({ id: 'grupo-seguranca.title' })} state="create" />
        </Page>
    );
};

Novo.getLayout = (page) => <Layout>{page}</Layout>;
export default Novo;
