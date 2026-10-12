// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    BankOutlined,
    BorderOutlined,
    BoxPlotOutlined,
    ChromeOutlined,
    DeploymentUnitOutlined,
    EnvironmentOutlined,
    GatewayOutlined,
    MenuUnfoldOutlined,
    QuestionOutlined,
    SmileOutlined,
    SolutionOutlined,
    StopOutlined,
    UserOutlined
} from '@ant-design/icons';

// icons
const icons = {
    BorderOutlined,
    BoxPlotOutlined,
    ChromeOutlined,
    DeploymentUnitOutlined,
    GatewayOutlined,
    MenuUnfoldOutlined,
    QuestionOutlined,
    StopOutlined,
    SmileOutlined,
    BankOutlined,
    EnvironmentOutlined,
    UserOutlined,
    SolutionOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const other = {
    id: 'other',
    title: <FormattedMessage id="others" />,
    type: 'group',
    children: [
        {
            id: 'teste',
            title: <FormattedMessage id="menu.teste" />,
            type: 'item',
            url: '/sample-page',
            icon: icons.BankOutlined,
            breadcrumbs: true
        },
        {
            id: 'organizacao',
            title: <FormattedMessage id="menu.organizacao" />,
            type: 'item',
            url: '/core/organizacao',
            icon: icons.BankOutlined,
            breadcrumbs: true
        },
        {
            id: 'site',
            title: <FormattedMessage id="menu.site" />,
            type: 'item',
            url: '/core/site',
            icon: icons.EnvironmentOutlined
        },
        {
            id: 'dominio',
            title: <FormattedMessage id="menu.dominio" />,
            type: 'item',
            url: '/core/dominio',
            icon: icons.EnvironmentOutlined
        },
        {
            id: 'pessoa',
            title: <FormattedMessage id="menu.pessoa" />,
            type: 'item',
            url: '/core/pessoa',
            icon: icons.UserOutlined
        },
        {
            id: 'usuario',
            title: <FormattedMessage id="menu.usuario" />,
            type: 'item',
            url: '/core/usuario',
            icon: icons.SolutionOutlined,
            disabled: false
        },
        {
            id: 'aplicacao',
            title: <FormattedMessage id="menu.aplicacao" />,
            type: 'item',
            url: '/core/aplicacao',
            icon: icons.SolutionOutlined,
            disabled: false
        },
        {
            id: 'empresa',
            title: <FormattedMessage id="menu.empresa" />,
            type: 'item',
            url: '/core/empresa',
            icon: icons.SolutionOutlined,
            disabled: false
        },
        {
            id: 'pergunta',
            title: <FormattedMessage id="menu.pergunta" />,
            type: 'item',
            url: '/core/pergunta',
            icon: icons.SolutionOutlined,
            disabled: false
        },
        {
            id: 'grupo-seguranca',
            title: <FormattedMessage id="menu.grupo-seguranca" />,
            type: 'item',
            url: '/core/grupo-seguranca',
            icon: icons.SolutionOutlined,
            disabled: false
        },
        {
            id: 'company',
            title: <FormattedMessage id="menu.company" />,
            type: 'item',
            url: '/core/company',
            icon: icons.SolutionOutlined,
            disabled: false
        }
    ]
};

export default other;
