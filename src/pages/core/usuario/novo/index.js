import Page from 'components/Page';
import UsuarioForm from 'components/forms/core/UsuarioForm';
import Layout from 'layout';
import { useIntl } from 'react-intl';

const Novo = () => {
    const intl = useIntl();

    const data = {};

    return (
        <Page title={intl.formatMessage({ id: 'usuario' })}>
            <UsuarioForm initialValues={data} title={intl.formatMessage({ id: 'usuario' })} state="create" />
        </Page>
    );
};

Novo.getLayout = (page) => <Layout>{page}</Layout>;
export default Novo;
