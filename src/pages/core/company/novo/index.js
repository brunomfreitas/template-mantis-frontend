import Page from 'components/Page';
import CompanyForm from 'components/forms/core/CompanyForm';
import Layout from 'layout';
import { useIntl } from 'react-intl';

const Novo = () => {
    const intl = useIntl();

    const data = {
        nm_company: null,
        nr_cnpj: null,
        ds_sector: null,
        ds_subsector: null,
        ds_segment: null
    };

    return (
        <Page title={intl.formatMessage({ id: 'company.title' })}>
            <CompanyForm initialValues={data} title={intl.formatMessage({ id: 'company.title' })} state="create" />
        </Page>
    );
};

Novo.getLayout = (page) => <Layout>{page}</Layout>;
export default Novo;
