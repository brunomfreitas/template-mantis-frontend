export const getProntuarioValidationMessages = (intl) => ({
    id_escola: intl.formatMessage({ id: 'prontuario.id_escola' }) + intl.formatMessage({ id: 'isRequired' }),
    nm_responsavel: 'Responsável é obrigatório',
    nr_telefone_responsavel: 'Telefone do responsável é obrigatório',
    ds_declaracao_responsavel: 'Declaração do responsável é obrigatória',
    id_paciente: intl.formatMessage({ id: 'prontuario.id_paciente' }) + intl.formatMessage({ id: 'isRequired' })
});
