import Page from 'components/Page';
import PerguntaForm from 'components/forms/core/PerguntaForm';
import Layout from 'layout';
import { useIntl } from 'react-intl';

const Novo = () => {
    const intl = useIntl();

    const data = {
        ds_pergunta: null
    };

    return (
        <Page title={intl.formatMessage({ id: 'pergunta.title' })}>
            <PerguntaForm initialValues={data} title={intl.formatMessage({ id: 'pergunta.title' })} state="create" />
        </Page>
    );
};

Novo.getLayout = (page) => <Layout>{page}</Layout>;
export default Novo;
