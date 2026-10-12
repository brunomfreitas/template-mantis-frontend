export const getPessoaValidationMessages = (intl) => ({
    nr_cpf: intl.formatMessage({ id: 'pessoa.nr_cpf' }) + intl.formatMessage({ id: 'isRequired' }),
    nm_pessoa: intl.formatMessage({ id: 'pessoa.nm_pessoa' }) + intl.formatMessage({ id: 'isRequired' }),
    dt_nascimento: intl.formatMessage({ id: 'pessoa.dt_nascimento' }) + intl.formatMessage({ id: 'isRequired' }),
    nm_email: intl.formatMessage({ id: 'pessoa.nm_email' }) + intl.formatMessage({ id: 'isRequired' }),
    id_genero: intl.formatMessage({ id: 'pessoa.id_genero' }) + intl.formatMessage({ id: 'isRequired' })
});
