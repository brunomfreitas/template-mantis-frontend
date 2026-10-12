import Page from 'components/Page';
import EmpresaForm from 'components/forms/core/EmpresaForm';
import Layout from 'layout';
import { useIntl } from 'react-intl';

const Novo = () => {
    const intl = useIntl();

    const data = {
        nm_empresa: null,
        nr_cnpj: null
    };

    return (
        <Page title={intl.formatMessage({ id: 'empresa.title' })}>
            <EmpresaForm initialValues={data} title={intl.formatMessage({ id: 'empresa.title' })} state="create" />
        </Page>
    );
};

Novo.getLayout = (page) => <Layout>{page}</Layout>;
export default Novo;
