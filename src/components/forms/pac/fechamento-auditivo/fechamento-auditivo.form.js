import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Typography from '@mui/material/Typography';
import Layout from 'layout';
import PropTypes from 'prop-types';
import { useState } from 'react';
import FechamentoAuditivoFiguraForm from './fechamento-auditivo-figura.form';
import FechamentoAuditivoFraseForm from './fechamento-auditivo-frase.form';
const FechamentoAuditivoForm = (props) => {
  const { initialValues } = props;

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography sx={{ width: '100%', flexShrink: 0 }}>Fechamento Auditivo Figura</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FechamentoAuditivoFiguraForm initialValues={initialValues} />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
          <Typography sx={{ width: '100%', flexShrink: 0 }}>Fechamento Auditivo Frase</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FechamentoAuditivoFraseForm initialValues={initialValues} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

FechamentoAuditivoForm.propTypes = {
  initialValues: PropTypes.object,
  title: PropTypes.string,
  state: PropTypes.string
};

FechamentoAuditivoForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default FechamentoAuditivoForm;
