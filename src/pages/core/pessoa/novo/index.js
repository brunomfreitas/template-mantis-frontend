import Page from 'components/Page';
import PessoaForm from 'components/forms/core/PessoaForm';
import Layout from 'layout';
import { useIntl } from 'react-intl';

const Novo = () => {
    const intl = useIntl();

    const data = {
        nr_cpf: null,
        nm_pessoa: null,

        dt_nascimento: null,
        id_genero: null,

        id_organizacao: null,
        id_site: null,

        nm_email: null,
        nr_telefone: null
    };

    return (
        <Page title={intl.formatMessage({ id: 'pessoa' })}>
            <PessoaForm initialValues={data} title={intl.formatMessage({ id: 'pessoa' })} state="create" />
        </Page>
    );
};

Novo.getLayout = (page) => <Layout>{page}</Layout>;
export default Novo;
