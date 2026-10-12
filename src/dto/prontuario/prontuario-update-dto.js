export const prontuarioUpdateDTO = (data) => ({
    ds_prontuario: data.ds_prontuario,
    dh_inicio_atendimento: data.dh_inicio_atendimento,

    id_paciente: data.id_paciente,

    id_escola: data.id_escola,
    cs_serie: data.cs_serie,
    cs_turno: data.cs_turno,

    nm_responsavel: data.nm_responsavel,
    nr_telefone_responsavel: data.nr_telefone_responsavel,
    ds_declaracao_responsavel: data.ds_declaracao_responsavel,

    id_fonoaudiologo: data.id_fonoaudiologo,
    id_assistente: data.id_assistente,
    id_organizacao: data.id_organizacao,
    id_site: data.id_site,

    id_st_atendimento: data.id_st_atendimento,
    id_st_prontuario: data.id_st_prontuario,
    st_ativo: data.st_ativo
});
