// import {
//   Autocomplete,
//   Box,
//   Button,
//   CircularProgress,
//   Divider,
//   FormControlLabel,
//   FormHelperText,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   MenuItem,
//   Stack,
//   Switch,
//   TextField,
//   Typography
// } from '@mui/material';
// import Loader from 'components/Loader';
// import MainCard from 'components/MainCard';
// import Page from 'components/Page';
// import UploadSingleFile from 'components/third-party/dropzone/SingleFile';
// import { formatISO } from 'date-fns';
// import { Form, FormikProvider, useFormik } from 'formik';
// import Layout from 'layout';
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
// import { FormattedMessage, useIntl } from 'react-intl';
// import { useDispatch, useSelector } from 'store';
// import { editar, novo } from 'store/reducers/auto-declaracao';
// import { getAll as getEscola } from 'store/reducers/escola';
// import { getAll as getPaciente } from 'store/reducers/paciente';
// import { getAll as getPlanoSaude } from 'store/reducers/plano-saude';
// import { openSnackbar } from 'store/reducers/snackbar';
// import * as Yup from 'yup';

// const AutoDeclaracaoForm = (props) => {
//   const { initialValues, title, state } = props;

//   const intl = useIntl();
//   const router = useRouter();
//   // const { id } = router.query;
//   // const theme = useTheme();
//   const dispatch = useDispatch();

//   const { data: planos, isLoader: isLoaderPlanos } = useSelector((state) => state.planoSaude);
//   const { data: escolas, isLoader: isLoaderEscolas } = useSelector((state) => state.escola);
//   const { data: pacientes, isLoader: isLoaderPacientes } = useSelector((state) => state.paciente);

//   useEffect(() => {
//     dispatch(getPaciente());
//     dispatch(getEscola());
//     dispatch(getPlanoSaude());
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const serie = [
//     { ID: 'Berçario', NOME: 'Berçário' },
//     { ID: 'Maternal', NOME: 'Maternal' },
//     { ID: 'Jardim 1', NOME: 'Jardim 1' },
//     { ID: 'Jardim 2', NOME: 'Jardim 2' },
//     { ID: 'Jardim 3', NOME: 'Jardim 3' },
//     { ID: 'Infantil 1', NOME: 'Infantil 1' },
//     { ID: 'Infantil 2', NOME: 'Infantil 2' },
//     { ID: 'Infantil 3', NOME: 'Infantil 3' },
//     { ID: 'Infantil 4', NOME: 'Infantil 4' },
//     { ID: 'Infantil 5', NOME: 'Infantil 5' },
//     { ID: '1 ', NOME: '1ª' },
//     { ID: '2 ', NOME: '2ª' },
//     { ID: '3 ', NOME: '3ª' },
//     { ID: '4 ', NOME: '4ª' },
//     { ID: '5 ', NOME: '5ª' },
//     { ID: '6 ', NOME: '6ª' },
//     { ID: '7 ', NOME: '7ª' },
//     { ID: '8 ', NOME: '8ª' },
//     { ID: '9 ', NOME: '9ª' }
//   ];

//   const turma = [
//     { ID: 'A', NOME: 'A' },
//     { ID: 'B', NOME: 'B' },
//     { ID: 'C', NOME: 'C' },
//     { ID: 'D', NOME: 'D' },
//     { ID: 'E', NOME: 'E' },
//     { ID: 'F', NOME: 'F' },
//     { ID: 'G', NOME: 'G' },
//     { ID: 'H', NOME: 'H' }
//   ];

//   const turno = [
//     { ID: 'Integral', NOME: 'Integral' },
//     { ID: 'Matutino', NOME: 'Matutino' },
//     { ID: 'Vespertino', NOME: 'Vespertino' }
//   ];

//   const [view, setView] = useState(false);

//   useEffect(() => {
//     if (state === 'view') {
//       setView(true);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [state]);

//   const onCancel = () => {
//     router.push('/core/auto-declaracao');
//   };

//   const formik = useFormik({
//     initialValues: initialValues,
//     validationSchema: Yup.object().shape({
//       ds_auto_declaracao: Yup.string()
//         .max(255)
//         .required(intl.formatMessage({ id: 'autoDeclaracao.ds_auto_declaracao' }) + intl.formatMessage({ id: 'isRequired' }))
//       // dt_auto_declaracao: Yup.date()
//       //required(intl.formatMessage({ id: 'paciente.dt_nascimento' }) + intl.formatMessage({ id: 'isRequired' })),
//     }),
//     onSubmit: (values) => {
//       try {
//         values.dt_auto_declaracao = formatISO(new Date(values.dt_auto_declaracao));

//         if (state === 'edit') {
//           const autoEdit = { ...values };
//           delete autoEdit.paciente;
//           delete autoEdit.escola;
//           delete autoEdit.plano_saude;
//           // Se estiver no modo de edição, atualize o item
//           dispatch(editar(values.id_auto_declaracao, autoEdit))
//             .then(() => {
//               dispatch(
//                 openSnackbar({
//                   open: true,
//                   message: 'Auto Declaração armazenada com sucesso!',
//                   variant: 'alert',
//                   alert: {
//                     color: 'success'
//                   }
//                 })
//               );
//               router.push('/core/auto-declaracao');
//             })
//             .finally(() => {
//               setSubmitting(false);
//             });
//         } else if (state === 'create') {
//           // Se estiver no modo de criação, crie um novo item
//           dispatch(novo(values))
//             .then(() => {
//               dispatch(
//                 openSnackbar({
//                   open: true,
//                   message: 'Auto Declaração criada com sucesso!',
//                   variant: 'alert',
//                   alert: {
//                     color: 'success'
//                   }
//                 })
//               );
//               router.push('/core/auto-declaracao');
//             })
//             .finally(() => {
//               setSubmitting(false);
//             });
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   });

//   const { values, errors, touched, handleSubmit, handleBlur, handleChange, isSubmitting, setSubmitting, setFieldValue } = formik;

//   if (isLoaderPlanos && isLoaderEscolas && isLoaderPacientes) return <Loader />;

//   return (
//     <Page title={title}>
//       <FormikProvider value={formik}>
//         <Form autoComplete="off" onSubmit={handleSubmit}>
//           <MainCard border={false} boxShadow>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={12}>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12}>
//                     <MainCard title={title}>
//                       <Grid container spacing={3}>
//                         <Grid item xs={12} md={6}>
//                           <Stack spacing={1}>
//                             <Autocomplete
//                               id="id_paciente"
//                               fullWidth
//                               value={pacientes.find((paciente) => paciente.ID === values?.id_paciente) || ''}
//                               onBlur={handleBlur}
//                               onChange={(event, newValue) => {
//                                 setFieldValue('id_paciente', newValue ? newValue.ID : '');
//                               }}
//                               options={pacientes}
//                               autoHighlight
//                               isOptionEqualToValue={(option, value) => option.ID === (value ? value.ID : null)}
//                               getOptionLabel={(option) => option.nm_paciente}
//                               renderOption={(props, option) => (
//                                 <Box component="li" {...props}>
//                                   <Typography>{option.nm_paciente}</Typography>
//                                 </Box>
//                               )}
//                               renderInput={(params) => (
//                                 <TextField
//                                   {...params}
//                                   placeholder="Escolha um paciente"
//                                   name="id_paciente"
//                                   label={<FormattedMessage id={'autoDeclaracao.id_paciente'} />}
//                                   inputProps={{
//                                     ...params.inputProps,
//                                     value: params.inputProps?.value ?? '' // <- evita `null` ou `undefined`
//                                   }}
//                                 />
//                               )}
//                             />
//                           </Stack>
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                           <Stack spacing={1}>
//                             <TextField
//                               id="dt_auto_declaracao"
//                               name="dt_auto_declaracao"
//                               type="date"
//                               label={<FormattedMessage id={'autoDeclaracao.dt_auto_declaracao'} />}
//                               error={Boolean(touched.dt_auto_declaracao && errors.dt_auto_declaracao)}
//                               helperText={errors.dt_auto_declaracao && touched.dt_auto_declaracao ? errors.dt_auto_declaracao : null}
//                               value={values.dt_auto_declaracao}
//                               onBlur={handleBlur}
//                               onChange={handleChange}
//                               InputProps={{
//                                 readOnly: view
//                               }}
//                             ></TextField>
//                           </Stack>
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                           <Stack spacing={1}>
//                             <Autocomplete
//                               id="id_escola"
//                               fullWidth
//                               value={escolas.find((escola) => escola.ID === values?.id_escola) || null}
//                               onBlur={handleBlur}
//                               onChange={(event, newValue) => {
//                                 setFieldValue('id_escola', newValue ? newValue.ID : '');
//                               }}
//                               options={escolas}
//                               autoHighlight
//                               isOptionEqualToValue={(option, value) => option.ID === (value ? value.ID : null)}
//                               getOptionLabel={(option) => option.nm_escola}
//                               renderOption={(props, option) => (
//                                 <Box component="li" {...props}>
//                                   <Typography>{option.nm_escola}</Typography>
//                                 </Box>
//                               )}
//                               renderInput={(params) => (
//                                 <TextField
//                                   {...params}
//                                   placeholder="Escolha uma escola"
//                                   name="id_escola"
//                                   label={<FormattedMessage id={'autoDeclaracao.id_escola'} />}
//                                   inputProps={{
//                                     ...params.inputProps
//                                   }}
//                                 />
//                               )}
//                             />
//                           </Stack>
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                           <Stack spacing={1}>
//                             <Autocomplete
//                               id="id_plano_saude"
//                               fullWidth
//                               value={planos.find((plano) => plano.ID === values?.id_plano_saude) || null}
//                               onBlur={handleBlur}
//                               onChange={(event, newValue) => {
//                                 setFieldValue('id_plano_saude', newValue ? newValue.ID : '');
//                               }}
//                               options={planos}
//                               autoHighlight
//                               isOptionEqualToValue={(option, value) => option.ID === (value ? value.ID : null)}
//                               getOptionLabel={(option) => option.nm_plano_saude}
//                               renderOption={(props, option) => (
//                                 <Box component="li" {...props}>
//                                   <Typography>{option.nm_plano_saude}</Typography>
//                                 </Box>
//                               )}
//                               renderInput={(params) => (
//                                 <TextField
//                                   {...params}
//                                   placeholder="Escolha um plano de saúde"
//                                   name="id_plano_saude"
//                                   label={<FormattedMessage id={'autoDeclaracao.id_plano_saude'} />}
//                                   inputProps={{
//                                     ...params.inputProps
//                                   }}
//                                 />
//                               )}
//                             />
//                           </Stack>
//                         </Grid>
//                         <Grid item xs={12} md={2}>
//                           <Stack spacing={1}>
//                             <TextField
//                               id="cs_serie"
//                               name="cs_serie"
//                               select
//                               label={<FormattedMessage id={'autoDeclaracao.cs_serie'} />}
//                               error={Boolean(touched.cs_serie && errors.cs_serie)}
//                               helperText={errors.cs_serie && touched.cs_serie ? errors.cs_serie : null}
//                               value={values.cs_serie || ''}
//                               onBlur={handleBlur}
//                               onChange={handleChange}
//                               InputProps={{
//                                 readOnly: view
//                               }}
//                             >
//                               <MenuItem value="">
//                                 <em>Selecione</em>
//                               </MenuItem>
//                               {serie.map((valor) => (
//                                 <MenuItem key={valor.ID} value={valor.ID}>
//                                   {valor.NOME}
//                                 </MenuItem>
//                               ))}
//                             </TextField>
//                           </Stack>
//                         </Grid>
//                         <Grid item xs={12} md={2}>
//                           <Stack spacing={1}>
//                             <TextField
//                               id="cs_turma"
//                               name="cs_turma"
//                               select
//                               label={<FormattedMessage id={'autoDeclaracao.cs_turma'} />}
//                               error={Boolean(touched.cs_turma && errors.cs_turma)}
//                               helperText={errors.cs_turma && touched.cs_turma ? errors.cs_turma : null}
//                               value={values.cs_turma || ''}
//                               onBlur={handleBlur}
//                               onChange={handleChange}
//                               InputProps={{
//                                 readOnly: view
//                               }}
//                             >
//                               <MenuItem value="">
//                                 <em>Selecione</em>
//                               </MenuItem>
//                               {turma.map((valor) => (
//                                 <MenuItem key={valor.ID} value={valor.ID}>
//                                   {valor.NOME}
//                                 </MenuItem>
//                               ))}
//                             </TextField>
//                           </Stack>
//                         </Grid>
//                         <Grid item xs={12} md={2}>
//                           <Stack spacing={1}>
//                             <TextField
//                               id="cs_turno"
//                               name="cs_turno"
//                               select
//                               label={<FormattedMessage id={'autoDeclaracao.cs_turno'} />}
//                               error={Boolean(touched.cs_turno && errors.cs_turno)}
//                               helperText={errors.cs_turno && touched.cs_turno ? errors.cs_turno : null}
//                               value={values.cs_turno || ''}
//                               onBlur={handleBlur}
//                               onChange={handleChange}
//                               InputProps={{
//                                 readOnly: view
//                               }}
//                             >
//                               <MenuItem value="">
//                                 <em>Selecione</em>
//                               </MenuItem>
//                               {turno.map((valor) => (
//                                 <MenuItem key={valor.ID} value={valor.ID}>
//                                   {valor.NOME}
//                                 </MenuItem>
//                               ))}
//                             </TextField>
//                           </Stack>
//                         </Grid>

//                         <Grid item xs={12} md={6}>
//                           <Stack spacing={1}>
//                             <TextField
//                               id="nr_carteirinha"
//                               name="nr_carteirinha"
//                               type="number"
//                               label={<FormattedMessage id={'autoDeclaracao.nr_carteirinha'} />}
//                               error={Boolean(touched.nr_carteirinha && errors.nr_carteirinha)}
//                               helperText={errors.nr_carteirinha && touched.nr_carteirinha ? errors.nr_carteirinha : null}
//                               value={values.nr_carteirinha}
//                               onBlur={handleBlur}
//                               onChange={handleChange}
//                               InputProps={{
//                                 readOnly: view
//                               }}
//                             ></TextField>
//                           </Stack>
//                         </Grid>

//                         <Grid item xs={12} md={6}>
//                           <Stack spacing={1} alignItems="center">
//                             <UploadSingleFile setFieldValue={setFieldValue} file={values.files} error={touched.files && !!errors.files} />
//                             {touched.files && errors.files && (
//                               <FormHelperText error id="standard-weight-helper-text-password-login">
//                                 {errors.files}
//                               </FormHelperText>
//                             )}
//                           </Stack>
//                         </Grid>

//                         <Grid item xs={12} md={6}>
//                           <Stack spacing={1}>
//                             <TextField
//                               id="ds_auto_declaracao"
//                               name="ds_auto_declaracao"
//                               fullWidth
//                               multiline
//                               rows={9}
//                               label={<FormattedMessage id={'autoDeclaracao.ds_auto_declaracao'} />}
//                               error={Boolean(touched.ds_auto_declaracao && errors.ds_auto_declaracao)}
//                               helperText={errors.ds_auto_declaracao && touched.ds_auto_declaracao ? errors.ds_auto_declaracao : null}
//                               value={values.ds_auto_declaracao}
//                               onBlur={handleBlur}
//                               onChange={handleChange}
//                               InputProps={{
//                                 readOnly: view
//                               }}
//                             ></TextField>
//                           </Stack>
//                         </Grid>
//                       </Grid>
//                     </MainCard>
//                   </Grid>
//                   <Grid item xs={12} sm={12}>
//                     <MainCard title="Questionário">
//                       <Stack spacing={2.5}>
//                         <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
//                           <ListItem>
//                             <ListItemText
//                               id="switch-list-label-dor-ouvido"
//                               primary={
//                                 <Typography variant="subtitle1">{<FormattedMessage id={'autoDeclaracao.cs_dor_ouvido'} />}</Typography>
//                               }
//                             />
//                             <Stack direction="row" spacing={1} alignItems="center">
//                               <Typography>Não</Typography>
//                               <FormControlLabel
//                                 value={true}
//                                 control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
//                                 name="cs_dor_ouvido"
//                                 checked={Boolean(values.cs_dor_ouvido)}
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                               />
//                               <Typography>Sim</Typography>
//                             </Stack>
//                           </ListItem>
//                         </List>
//                         <Divider />
//                         <Typography variant="subtitle1">{'Fala:'}</Typography>
//                         <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
//                         <ListItem>
//                             <ListItemText
//                               id="switch-list-label-dificuldade-fala"
//                               primary={
//                                 <Typography color="secondary">
//                                   <FormattedMessage id={'autoDeclaracao.cs_dif_fala'} />
//                                 </Typography>
//                               }
//                             />
//                             <Stack direction="row" spacing={1} alignItems="center">
//                               <Typography>Não</Typography>
//                               <FormControlLabel
//                                 value={true}
//                                 control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
//                                 name="cs_dif_fala"
//                                 checked={Boolean(values.cs_dif_fala)}
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                               />
//                               <Typography>Sim</Typography>
//                             </Stack>
//                           </ListItem>
//                           <ListItem>
//                             <ListItemText
//                               id="switch-list-label-dificuldade"
//                               primary={
//                                 <Typography color="secondary">
//                                   <FormattedMessage id={'autoDeclaracao.cs_dif_fala_em_terapia'} />
//                                 </Typography>
//                               }
//                             />
//                             <Stack direction="row" spacing={1} alignItems="center">
//                               <Typography>Não</Typography>
//                               <FormControlLabel
//                                 value={true}
//                                 control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
//                                 name="cs_dif_fala_em_terapia"
//                                 checked={Boolean(values.cs_dif_fala_em_terapia)}
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                               />
//                               <Typography>Sim</Typography>
//                             </Stack>
//                           </ListItem>
//                           <ListItem>
//                             <ListItemText
//                               id="switch-list-label-order-2"
//                               primary={
//                                 <Typography color="secondary">
//                                   <FormattedMessage id={'autoDeclaracao.cs_dif_fala_ja_fez_terapia'} />
//                                 </Typography>
//                               }
//                             />
//                             <Stack direction="row" spacing={1} alignItems="center">
//                               <Typography>Não</Typography>
//                               <FormControlLabel
//                                 value={true}
//                                 control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
//                                 name="cs_dif_fala_ja_fez_terapia"
//                                 checked={Boolean(values.cs_dif_fala_ja_fez_terapia)}
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                               />
//                               <Typography>Sim</Typography>
//                             </Stack>
//                           </ListItem>
//                         </List>
//                         <Divider />
//                         <Typography variant="subtitle1">{<FormattedMessage id={'autoDeclaracao.cs_aprendizagem'} />}</Typography>
//                         <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
//                           <ListItem>
//                             <ListItemText
//                               id="switch-list-label-order-1"
//                               primary={<Typography color="secondary">Baixo rendimento escolar</Typography>}
//                             />
//                             <Stack direction="row" spacing={1} alignItems="center">
//                               <Typography>Não</Typography>
//                               <FormControlLabel
//                                 value={true}
//                                 control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
//                                 name="cs_aprendizagem_baixo_rend"
//                                 checked={Boolean(values.cs_aprendizagem_baixo_rend)}
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                               />
//                               <Typography>Sim</Typography>
//                             </Stack>
//                           </ListItem>
//                           <ListItem>
//                             <ListItemText id="switch-list-label-order-2" primary={<Typography color="secondary">Desatento</Typography>} />
//                             <Stack direction="row" spacing={1} alignItems="center">
//                               <Typography>Não</Typography>
//                               <FormControlLabel
//                                 value={true}
//                                 control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
//                                 name="cs_aprendizagem_desatento"
//                                 checked={Boolean(values.cs_aprendizagem_desatento)}
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                               />
//                               <Typography>Sim</Typography>
//                             </Stack>
//                           </ListItem>
//                           <ListItem>
//                             <ListItemText id="switch-list-label-order-3" primary={<Typography color="secondary">Agitado</Typography>} />
//                             <Stack direction="row" spacing={1} alignItems="center">
//                               <Typography>Não</Typography>
//                               <FormControlLabel
//                                 value={true}
//                                 control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
//                                 name="cs_aprendizagem_agitado"
//                                 checked={Boolean(values.cs_aprendizagem_agitado)}
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                               />
//                               <Typography>Sim</Typography>
//                             </Stack>
//                           </ListItem>
//                         </List>
//                         <Divider />
//                         <Typography variant="subtitle1">{<FormattedMessage id={'autoDeclaracao.cs_usa'} />}</Typography>
//                         <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
//                           <ListItem>
//                             <ListItemText id="switch-list-label-order-1" primary={<Typography color="secondary">Chupeta</Typography>} />
//                             <Stack direction="row" spacing={1} alignItems="center">
//                               <Typography>Não</Typography>
//                               <FormControlLabel
//                                 value={true}
//                                 control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
//                                 name="cs_usa_chupeta"
//                                 checked={Boolean(values.cs_usa_chupeta)}
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                               />
//                               <Typography>Sim</Typography>
//                             </Stack>
//                           </ListItem>
//                           <ListItem>
//                             <ListItemText id="switch-list-label-order-2" primary={<Typography color="secondary">Dedo</Typography>} />
//                             <Stack direction="row" spacing={1} alignItems="center">
//                               <Typography>Não</Typography>
//                               <FormControlLabel
//                                 value={true}
//                                 control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
//                                 name="cs_usa_dedo"
//                                 checked={Boolean(values.cs_usa_dedo)}
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                               />
//                               <Typography>Sim</Typography>
//                             </Stack>
//                           </ListItem>
//                           <ListItem>
//                             <ListItemText id="switch-list-label-order-3" primary={<Typography color="secondary">Mamadeira</Typography>} />
//                             <Stack direction="row" spacing={1} alignItems="center">
//                               <Typography>Não</Typography>
//                               <FormControlLabel
//                                 value={true}
//                                 control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
//                                 name="cs_usa_mamadeira"
//                                 checked={Boolean(values.cs_usa_mamadeira)}
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                               />
//                               <Typography>Sim</Typography>
//                             </Stack>
//                           </ListItem>
//                         </List>
//                         <Divider />
//                         <Typography variant="subtitle1">{<FormattedMessage id={'autoDeclaracao.cs_autorizo_assinatura'} />}</Typography>
//                         <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
//                           {/* <ListItem>
//                             <ListItemText
//                               id="switch-list-label-order-1"
//                               primary={
//                                 <Typography color="secondary">
//                                   {<FormattedMessage id={'autoDeclaracao.cs_autorizo_assinatura_link'} />}
//                                 </Typography>
//                               }
//                             />

//                             <Stack direction="row" spacing={1} alignItems="center">
//                               <Typography>Não</Typography>
//                               <FormControlLabel
//                                 value={true}
//                                 control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
//                                 name="cs_autorizo_assinatura_link"
//                                 checked={Boolean(values.cs_autorizo_assinatura_link)}
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                               />
//                               <Typography>Sim</Typography>
//                             </Stack>
//                           </ListItem> */}
//                           <ListItem>
//                             <ListItemText
//                               id="switch-list-label-order-2"
//                               primary={
//                                 <Typography color="secondary">
//                                   {<FormattedMessage id={'autoDeclaracao.cs_autorizo_assinatura_resp'} />}
//                                 </Typography>
//                               }
//                             />
//                             <Stack direction="row" spacing={1} alignItems="center">
//                               <Typography>Não</Typography>
//                               <FormControlLabel
//                                 value={true}
//                                 control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
//                                 name="cs_autorizo_assinatura_resp"
//                                 checked={Boolean(values.cs_autorizo_assinatura_resp)}
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                               />
//                               <Typography>Sim</Typography>
//                             </Stack>
//                           </ListItem>
//                         </List>

//                         <Divider />
//                         <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
//                           <ListItem>
//                             <ListItemText
//                               id="switch-list-label-order-1"
//                               primary={
//                                 <Typography variant="subtitle1">
//                                   {<FormattedMessage id={'autoDeclaracao.cs_autorizo_uso_fotos'} />}
//                                 </Typography>
//                               }
//                             />
//                             <Stack direction="row" spacing={1} alignItems="center">
//                               <Typography>Não</Typography>
//                               <FormControlLabel
//                                 value={true}
//                                 control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
//                                 name="cs_autorizo_uso_fotos"
//                                 checked={Boolean(values.cs_autorizo_uso_fotos)}
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                               />
//                               <Typography>Sim</Typography>
//                             </Stack>
//                           </ListItem>
//                         </List>

//                         <Divider />
//                         <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
//                           <ListItem>
//                             <ListItemText
//                               id="switch-list-label-order-1"
//                               primary={
//                                 <Typography variant="subtitle1">{<FormattedMessage id={'autoDeclaracao.cs_autorizo'} />}</Typography>
//                               }
//                             />
//                             <Stack direction="row" spacing={1} alignItems="center">
//                               <Typography>Não</Typography>
//                               <FormControlLabel
//                                 value={true}
//                                 control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
//                                 name="cs_autorizo"
//                                 checked={Boolean(values.cs_autorizo)}
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                               />
//                               <Typography>Sim</Typography>
//                             </Stack>
//                           </ListItem>
//                         </List>
//                       </Stack>
//                     </MainCard>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
//                       <Button variant="outlined" color="secondary" onClick={onCancel}>
//                         {view ? 'Voltar' : 'Cancelar'}
//                       </Button>
//                       {view ? null : (
//                         <Button
//                           disabled={isSubmitting}
//                           startIcon={isSubmitting && <CircularProgress size={20} />}
//                           type="submit"
//                           variant="contained"
//                         >
//                           {state === 'edit' ? 'Gravar' : 'Cadastrar'}
//                         </Button>
//                       )}
//                     </Stack>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </MainCard>
//         </Form>
//       </FormikProvider>
//     </Page>
//   );
// };

// AutoDeclaracaoForm.propTypes = {
//   initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
//   title: PropTypes.string,
//   state: PropTypes.string
// };

// AutoDeclaracaoForm.getLayout = function getLayout(page) {
//   return <Layout>{page}</Layout>;
// };

// export default AutoDeclaracaoForm;

// NOVA TELA DE AUTO DECLARACAO \\
import { MailOutlined, PhoneOutlined } from '@mui/icons-material';
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardMedia,
    CircularProgress,
    Divider,
    FormControlLabel,
    FormHelperText,
    Grid,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Stack,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import UploadSingleFile from 'components/third-party/dropzone/SingleFile';
import { Form, FormikProvider, useFormik } from 'formik';
import Layout from 'layout';
import { useRouter } from 'next/router';
import DialogMessageError from 'pages/core/auto-declaracao/dialog/dialog-message-error';
import DialogMessageSucess from 'pages/core/auto-declaracao/dialog/dialog-message-success';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PatternFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'store';
import { editar, excluir, novo } from 'store/reducers/auto-declaracao';
import { getAll as getEscola } from 'store/reducers/escola';
import { getAll as getPlanoSaude } from 'store/reducers/plano-saude';
import { openSnackbar } from 'store/reducers/snackbar';
import DialogExcluir from 'utils/dialog/DialogExcluir';
import formatDate from 'utils/formatDate';
import * as Yup from 'yup';

const AutoDeclaracaoForm = (props) => {
    const { initialValues, title, state } = props;

    const intl = useIntl();
    const router = useRouter();
    const dispatch = useDispatch();
    const fieldRefs = useRef({});
    const textPlanoSaude = 'Upload da Carteirinha do Plano de Saúde';
    const textDocumento = 'Upload do Documento do Responsável';

    const { data: planos, isLoader: isLoaderPlanos } = useSelector((state) => state.planoSaude);
    const { data: escolas, isLoader: isLoaderEscolas } = useSelector((state) => state.escola);

    useEffect(() => {
        dispatch(getEscola());
        dispatch(getPlanoSaude());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sexo = [
        { ID: 'F', NOME: 'Feminino' },
        { ID: 'M', NOME: 'Masculino' }
    ];

    const serie = [
        { ID: 'Berçario', NOME: 'Berçário' },
        { ID: 'Maternal', NOME: 'Maternal' },
        { ID: 'Jardim 1', NOME: 'Jardim 1' },
        { ID: 'Jardim 2', NOME: 'Jardim 2' },
        { ID: 'Jardim 3', NOME: 'Jardim 3' },
        { ID: 'Infantil 1', NOME: 'Infantil 1' },
        { ID: 'Infantil 2', NOME: 'Infantil 2' },
        { ID: 'Infantil 3', NOME: 'Infantil 3' },
        { ID: 'Infantil 4', NOME: 'Infantil 4' },
        { ID: 'Infantil 5', NOME: 'Infantil 5' },
        { ID: '1 ', NOME: '1ª' },
        { ID: '2 ', NOME: '2ª' },
        { ID: '3 ', NOME: '3ª' },
        { ID: '4 ', NOME: '4ª' },
        { ID: '5 ', NOME: '5ª' },
        { ID: '6 ', NOME: '6ª' },
        { ID: '7 ', NOME: '7ª' },
        { ID: '8 ', NOME: '8ª' },
        { ID: '9 ', NOME: '9ª' }
    ];

    const turma = [
        { ID: 'A', NOME: 'A' },
        { ID: 'B', NOME: 'B' },
        { ID: 'C', NOME: 'C' },
        { ID: 'D', NOME: 'D' },
        { ID: 'E', NOME: 'E' },
        { ID: 'F', NOME: 'F' },
        { ID: 'G', NOME: 'G' },
        { ID: 'H', NOME: 'H' }
    ];

    const turno = [
        { ID: 'Integral', NOME: 'Integral' },
        { ID: 'Matutino', NOME: 'Matutino' },
        { ID: 'Vespertino', NOME: 'Vespertino' }
    ];

    const [view, setView] = useState(false);

    useEffect(() => {
        if (state === 'view') {
            setView(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const onCancel = () => {
        router.push('/core/auto-declaracao');
    };

    // const aprovar = async () => {
    //   // Captura o retorno da ação novo
    //   const result = await dispatch(novo(values));

    //   if (result?.error) {
    //     dispatch(
    //       openSnackbar({
    //         open: true,
    //         message: 'Erro ao aprovar a pré auto declaração, favor verificar os dados novamente antes de aprovar.',
    //         variant: 'alert',
    //         alert: {
    //           color: 'warning'
    //         }
    //       })
    //     );
    //   } else {
    //     // remover(values);
    //     router.push('/core/auto-declaracao');
    //   }
    // };

    const [deletar, setDeletar] = useState(false);

    const remover = async () => {
        const result = await dispatch(excluir(values));

        if (result?.error) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Erro ao excluir a Auto Declaração.',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    }
                })
            );
        } else {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Auto Declaração excluída com sucesso!',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    }
                })
            );
            router.push('/core/auto-declaracao');
        }
    };

    const [messageError, setMessageError] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState(false);

    const handleFieldError = async () => {
        setSubmitting(true);

        setFieldValue(dt_nascimento, new Date(values.dt_nascimento));

        const formData = new FormData();

        if (values.fileDocumento) {
            formData.append('fileDocumento', values.fileDocumento[0]);
        }

        if (values.filePlanoSaude) {
            formData.append('filePlanoSaude', values.filePlanoSaude[0]);
        }

        const autoDeclaracaoValues = { ...values };
        delete autoDeclaracaoValues.escola;
        delete autoDeclaracaoValues.plano_saude;

        Object.keys(autoDeclaracaoValues).forEach((key) => {
            formData.append(key, autoDeclaracaoValues[key]);
        });

        if (state === 'create' || state === 'register') {
            // Marcar todos os campos como tocados
            await formik.setTouched(
                Object.keys(formik.values).reduce((acc, fieldName) => {
                    acc[fieldName] = true; // Marca cada campo como "tocado"
                    return acc;
                }, {}),
                true // O segundo argumento (true) garante que o estado será atualizado imediatamente
            );

            const errorsForm = await formik.validateForm();

            const firstErrorKey = Object.keys(errorsForm)[0];

            if (firstErrorKey) {
                const errorField = fieldRefs.current[firstErrorKey];

                if (errorField) {
                    errorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    errorField.focus();
                }
            }

            // NOVO
            const result = await dispatch(novo(formData));

            setSubmitting(false);

            if (result?.error) {
                console.error('erro:', result?.error);
                // setMessageError(true);
            } else {
                state === 'register' ? setMessageSuccess(true) : router.push(`/core/auto-declaracao/editar/${result.id_auto_declaracao}`);
            }
        } else {
            // EDITAR
            const result = await dispatch(editar(values.id_auto_declaracao, values));

            if (result?.error) {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Erro ao atualizar a Auto Declaração',
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        }
                    })
                );
            } else {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Auto Declaração atualizada com sucesso!',
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        }
                    })
                );
            }
        }

        setSubmitting(false);
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            dt_nascimento: Yup.date().required(
                intl.formatMessage({ id: 'autoDeclaracao.dt_nascimento' }) + intl.formatMessage({ id: 'isRequired' })
            ),
            nm_paciente: Yup.string()
                .max(255)
                .required(intl.formatMessage({ id: 'autoDeclaracao.nm_paciente' }) + intl.formatMessage({ id: 'isRequired' })),
            cs_genero: Yup.string().required(
                intl.formatMessage({ id: 'autoDeclaracao.cs_genero' }) + intl.formatMessage({ id: 'isRequired' })
            ),
            nm_responsavel: Yup.string()
                .max(255)
                .required(intl.formatMessage({ id: 'autoDeclaracao.nm_responsavel' }) + intl.formatMessage({ id: 'isRequired' })),

            nm_email: Yup.string()
                .email('Favor informar um e-mail válido')
                .max(255)
                .required(intl.formatMessage({ id: 'autoDeclaracao.nm_email' }) + intl.formatMessage({ id: 'isRequired' })),

            nr_telefone: Yup.string().required(
                intl.formatMessage({ id: 'autoDeclaracao.nr_telefone' }) + intl.formatMessage({ id: 'isRequired' })
            ),
            id_escola: Yup.number().required(
                intl.formatMessage({ id: 'autoDeclaracao.id_escola' }) + intl.formatMessage({ id: 'isRequired' })
            ),
            id_plano_saude: Yup.number().required(
                intl.formatMessage({ id: 'autoDeclaracao.id_plano_saude' }) + intl.formatMessage({ id: 'isRequired' })
            )
            //files: Yup.array().required(intl.formatMessage({ id: 'preAutoDeclaracao.files' }) + intl.formatMessage({ id: 'isRequired' }))
        })
        //, onSubmit: async (values, actions) => {}
    });

    const { values, errors, touched, handleBlur, handleSubmit, handleChange, isSubmitting, setSubmitting, setFieldValue } = formik;

    if (isLoaderPlanos || isLoaderEscolas) return <Loader />;

    return (
        <Page title={title}>
            <FormikProvider value={formik}>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <MainCard
                        title={
                            <Typography variant="h3" component="span">
                                Formulário
                            </Typography>
                        }
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <MainCard title={intl.formatMessage({ id: 'autoDeclaracao.title.aluno' })}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <PatternFormat
                                                    format="###.###.###-##"
                                                    mask="_"
                                                    fullWidth
                                                    customInput={TextField}
                                                    id="nr_cpf"
                                                    name="nr_cpf"
                                                    type="text"
                                                    inputRef={(el) => (fieldRefs.current.nr_cpf = el)}
                                                    label={<FormattedMessage id={'paciente.nr_cpf'} />}
                                                    value={state === 'edit' ? values?.paciente?.nr_cpf : values?.nr_cpf || ''}
                                                    error={Boolean(touched.nr_cpf && errors.nr_cpf)}
                                                    helperText={errors.nr_cpf && touched.nr_cpf ? errors.nr_cpf : null}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    disabled={state === 'edit' ? true : view}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <TextField
                                                    id="dt_nascimento"
                                                    name="dt_nascimento"
                                                    type="date"
                                                    inputRef={(el) => (fieldRefs.current.dt_nascimento = el)} // Certifique-se de incluir isso
                                                    label={<FormattedMessage id={'paciente.dt_nascimento'} />}
                                                    error={Boolean(touched.dt_nascimento && errors.dt_nascimento)}
                                                    helperText={errors.dt_nascimento && touched.dt_nascimento ? errors.dt_nascimento : null}
                                                    value={
                                                        state === 'edit'
                                                            ? formatDate(values.paciente?.dt_nascimento)
                                                            : formatDate(values.dt_nascimento)
                                                    }
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    disabled={state === 'edit' ? true : view}
                                                ></TextField>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <TextField
                                                    id="nm_paciente"
                                                    name="nm_paciente"
                                                    type="text"
                                                    inputRef={(el) => (fieldRefs.current.nm_paciente = el)} // Certifique-se de incluir isso
                                                    label={<FormattedMessage id={'paciente.nm_paciente'} />}
                                                    error={Boolean(touched.nm_paciente && errors.nm_paciente)}
                                                    helperText={errors.nm_paciente && touched.nm_paciente ? errors.nm_paciente : null}
                                                    value={state === 'edit' ? values?.paciente?.nm_paciente : values?.nm_paciente || ''}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    disabled={state === 'edit' ? true : view}
                                                ></TextField>
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <TextField
                                                    id="sexo"
                                                    name="cs_genero"
                                                    select
                                                    label={<FormattedMessage id={'paciente.cs_genero'} />}
                                                    error={Boolean(touched.cs_genero && errors.cs_genero)}
                                                    helperText={errors.cs_genero && touched.cs_genero ? errors.cs_genero : null}
                                                    value={state === 'edit' ? values?.paciente?.cs_genero : values?.cs_genero || ''}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    disabled={state === 'edit' ? true : view}
                                                >
                                                    <MenuItem value="">
                                                        <em>Selecione</em>
                                                    </MenuItem>
                                                    {sexo.map((valor) => (
                                                        <MenuItem key={valor.ID} value={valor.ID}>
                                                            {valor.NOME}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Stack spacing={1}>
                                                <TextField
                                                    id="ds_auto_declaracao"
                                                    name="ds_auto_declaracao"
                                                    fullWidth
                                                    multiline
                                                    minRows={3}
                                                    maxRows={Infinity}
                                                    label={<FormattedMessage id={'autoDeclaracao.ds_auto_declaracao'} />}
                                                    error={Boolean(touched.ds_auto_declaracao && errors.ds_auto_declaracao)}
                                                    helperText={
                                                        errors.ds_auto_declaracao && touched.ds_auto_declaracao
                                                            ? errors.ds_auto_declaracao
                                                            : null
                                                    }
                                                    value={values?.ds_auto_declaracao}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        readOnly: view
                                                    }}
                                                ></TextField>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </Grid>
                            <Grid item xs={12}>
                                <MainCard title={intl.formatMessage({ id: 'autoDeclaracao.title.responsavel' })}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={12}>
                                            <Stack spacing={1}>
                                                <TextField
                                                    id="nm_responsavel"
                                                    name="nm_responsavel"
                                                    type="text"
                                                    label={<FormattedMessage id={'paciente.nm_responsavel'} />}
                                                    error={Boolean(touched.nm_responsavel && errors.nm_responsavel)}
                                                    helperText={
                                                        errors.nm_responsavel && touched.nm_responsavel ? errors.nm_responsavel : null
                                                    }
                                                    value={
                                                        state === 'edit' ? values?.paciente?.nm_responsavel : values?.nm_responsavel || ''
                                                    }
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    disabled={state === 'edit' ? true : view}
                                                ></TextField>
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <TextField
                                                    id="nm_email"
                                                    name="nm_email"
                                                    type="email"
                                                    label={<FormattedMessage id={'paciente.nm_email'} />}
                                                    error={Boolean(touched.nm_email && errors.nm_email)}
                                                    helperText={errors.nm_email && touched.nm_email ? errors.nm_email : null}
                                                    value={state === 'edit' ? values?.paciente?.nm_email : values?.nm_email || ''}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    disabled={state === 'edit' ? true : view}
                                                    InputProps={{
                                                        startAdornment: <MailOutlined />
                                                    }}
                                                ></TextField>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <PatternFormat
                                                    format="(##) #####-####"
                                                    mask="_"
                                                    fullWidth
                                                    value={state === 'edit' ? values?.paciente?.nr_telefone : values?.nr_telefone || ''}
                                                    customInput={TextField}
                                                    placeholder="Tel. com DDD"
                                                    id="nr_telefone"
                                                    name="nr_telefone"
                                                    type="text"
                                                    label={<FormattedMessage id={'paciente.nr_telefone'} />}
                                                    error={Boolean(touched.nr_telefone && errors.nr_telefone)}
                                                    helperText={errors.nr_telefone && touched.nr_telefone ? errors.nr_telefone : null}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    disabled={state === 'edit' ? true : view}
                                                    InputProps={{
                                                        startAdornment: <PhoneOutlined />
                                                    }}
                                                />
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <MainCard title={intl.formatMessage({ id: 'autoDeclaracao.title.escola_plano' })}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <Autocomplete
                                                    id="id_escola"
                                                    fullWidth
                                                    value={escolas.find((escola) => escola.ID === values?.id_escola) || null}
                                                    onBlur={handleBlur}
                                                    onChange={(event, newValue) => {
                                                        setFieldValue('id_escola', newValue ? newValue.ID : '');
                                                    }}
                                                    options={escolas}
                                                    autoHighlight
                                                    isOptionEqualToValue={(option, value) => option.ID === (value ? value.ID : null)}
                                                    getOptionLabel={(option) => option.nm_escola}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" {...props}>
                                                            <Typography>{option.nm_escola}</Typography>
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            placeholder="Escolha uma escola"
                                                            name="id_escola"
                                                            inputRef={(el) => (fieldRefs.current.id_escola = el)} // Adicione a referência
                                                            label={<FormattedMessage id={'preAutoDeclaracao.id_escola'} />}
                                                            error={Boolean(touched.id_escola && errors.id_escola)}
                                                            helperText={errors.id_escola && touched.id_escola ? errors.id_escola : null}
                                                            inputProps={{
                                                                ...params.inputProps
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <Autocomplete
                                                    id="id_plano_saude"
                                                    fullWidth
                                                    value={planos.find((plano) => plano.ID === values?.id_plano_saude) || null}
                                                    onBlur={handleBlur}
                                                    onChange={(event, newValue) => {
                                                        setFieldValue('id_plano_saude', newValue ? newValue.ID : '');
                                                    }}
                                                    options={planos}
                                                    autoHighlight
                                                    isOptionEqualToValue={(option, value) => option.ID === (value ? value.ID : null)}
                                                    getOptionLabel={(option) => option.nm_plano_saude}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" {...props}>
                                                            <Typography>{option.nm_plano_saude}</Typography>
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            placeholder="Escolha um plano de saúde"
                                                            name="id_plano_saude"
                                                            inputRef={(el) => (fieldRefs.current.id_plano_saude = el)} // Certifique-se de incluir isso
                                                            label={<FormattedMessage id={'autoDeclaracao.id_plano_saude'} />}
                                                            error={Boolean(touched.id_plano_saude && errors.id_plano_saude)}
                                                            helperText={
                                                                errors.id_plano_saude && touched.id_plano_saude
                                                                    ? errors.id_plano_saude
                                                                    : null
                                                            }
                                                            inputProps={{
                                                                ...params.inputProps
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Stack spacing={1}>
                                                <TextField
                                                    id="cs_serie"
                                                    name="cs_serie"
                                                    select
                                                    label={<FormattedMessage id={'autoDeclaracao.cs_serie'} />}
                                                    error={Boolean(touched.cs_serie && errors.cs_serie)}
                                                    helperText={errors.cs_serie && touched.cs_serie ? errors.cs_serie : null}
                                                    value={values?.cs_serie || ''}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        readOnly: view
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>Selecione</em>
                                                    </MenuItem>
                                                    {serie.map((valor) => (
                                                        <MenuItem key={valor.ID} value={valor.ID}>
                                                            {valor.NOME}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Stack spacing={1}>
                                                <TextField
                                                    id="cs_turma"
                                                    name="cs_turma"
                                                    select
                                                    label={<FormattedMessage id={'autoDeclaracao.cs_turma'} />}
                                                    error={Boolean(touched.cs_turma && errors.cs_turma)}
                                                    helperText={errors.cs_turma && touched.cs_turma ? errors.cs_turma : null}
                                                    value={values?.cs_turma || ''}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        readOnly: view
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>Selecione</em>
                                                    </MenuItem>
                                                    {turma.map((valor) => (
                                                        <MenuItem key={valor.ID} value={valor.ID}>
                                                            {valor.NOME}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Stack spacing={1}>
                                                <TextField
                                                    id="cs_turno"
                                                    name="cs_turno"
                                                    select
                                                    label={<FormattedMessage id={'autoDeclaracao.cs_turno'} />}
                                                    error={Boolean(touched.cs_turno && errors.cs_turno)}
                                                    helperText={errors.cs_turno && touched.cs_turno ? errors.cs_turno : null}
                                                    value={values?.cs_turno || ''}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        readOnly: view
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>Selecione</em>
                                                    </MenuItem>
                                                    {turno.map((valor) => (
                                                        <MenuItem key={valor.ID} value={valor.ID}>
                                                            {valor.NOME}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <TextField
                                                    id="nr_carteirinha"
                                                    name="nr_carteirinha"
                                                    type="number"
                                                    label={<FormattedMessage id={'autoDeclaracao.nr_carteirinha'} />}
                                                    error={Boolean(touched.nr_carteirinha && errors.nr_carteirinha)}
                                                    helperText={
                                                        errors.nr_carteirinha && touched.nr_carteirinha ? errors.nr_carteirinha : null
                                                    }
                                                    value={values?.nr_carteirinha || ''}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        readOnly: view
                                                    }}
                                                ></TextField>
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            {state === 'create' || state === 'register' ? (
                                                <Stack spacing={1} alignItems="center">
                                                    <UploadSingleFile
                                                        setFieldValue={setFieldValue}
                                                        file={values.fileDocumento}
                                                        fieldName={'fileDocumento'}
                                                        error={touched.fileDocumento && !!errors.fileDocumento}
                                                        text={textDocumento}
                                                    />
                                                    {touched.fileDocumento && errors.fileDocumento && (
                                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                                            {errors.fileDocumento}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            ) : (
                                                <Stack spacing={1} alignItems="center">
                                                    <Card sx={{ maxWidth: 600 }}>
                                                        <CardMedia
                                                            fullWidth
                                                            sx={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: `4px`,
                                                                position: 'relative'
                                                            }}
                                                            component="img"
                                                            src={`${process.env.REACT_APP_API_URL}${values.ds_caminho_documento}`}
                                                            title="Documento"
                                                        />
                                                        <Stack direction="row" justifyContent="center" sx={{ p: 2 }}>
                                                            <Button
                                                                variant="outlined"
                                                                color="primary"
                                                                component="a"
                                                                href={`${process.env.REACT_APP_API_URL}${values.ds_caminho_documento}`}
                                                                download
                                                                target="_blank"
                                                            >
                                                                Visualizar Documento
                                                            </Button>
                                                        </Stack>
                                                    </Card>
                                                </Stack>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {state === 'create' || state === 'register' ? (
                                                <Stack spacing={1} alignItems="center">
                                                    <UploadSingleFile
                                                        setFieldValue={setFieldValue}
                                                        file={values.filePlanoSaude}
                                                        fieldName={'filePlanoSaude'}
                                                        error={touched.filePlanoSaude && !!errors.filePlanoSaude}
                                                        text={textPlanoSaude}
                                                    />
                                                    {touched.filePlanoSaude && errors.filePlanoSaude && (
                                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                                            {errors.filePlanoSaude}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            ) : (
                                                <Stack spacing={1} alignItems="center">
                                                    <Card sx={{ maxWidth: 600 }}>
                                                        <CardMedia
                                                            fullWidth
                                                            sx={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: `4px`,
                                                                position: 'relative'
                                                            }}
                                                            component="img"
                                                            // src="/assets/images/logo.jpeg"
                                                            src={`${process.env.REACT_APP_API_URL}${values.ds_caminho_carteirinha}`}
                                                            title="Carteirinha"
                                                        />
                                                        <Stack direction="row" justifyContent="center" sx={{ p: 2 }}>
                                                            <Button
                                                                variant="outlined"
                                                                color="primary"
                                                                component="a"
                                                                href={`${process.env.REACT_APP_API_URL}${values.ds_caminho_carteirinha}`}
                                                                download
                                                                target="_blank"
                                                            >
                                                                Visualizar Carteirinha
                                                            </Button>
                                                        </Stack>
                                                    </Card>
                                                </Stack>
                                            )}
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <MainCard
                                    title={
                                        <Stack>
                                            <Typography variant="h3">Questionário </Typography>
                                            <br />
                                            <Typography>
                                                <Typography variant="subtitle1" component="span">
                                                    Confirmo{' '}
                                                </Typography>
                                                que as informações fornecidas a seguir sobre o histórico de saúde do(a) aluno(a) são
                                                verdadeiras e de minha inteira responsabilidade.
                                            </Typography>
                                        </Stack>
                                    }
                                >
                                    <Stack spacing={2.5}>
                                        <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                                            <ListItem>
                                                <ListItemText
                                                    id="switch-list-label-dor-ouvido"
                                                    primary={
                                                        <Typography variant="subtitle1">
                                                            {<FormattedMessage id={'autoDeclaracao.cs_dor_ouvido'} />}
                                                        </Typography>
                                                    }
                                                />
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography>Não</Typography>
                                                    <FormControlLabel
                                                        value={true}
                                                        control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
                                                        name="cs_dor_ouvido"
                                                        checked={Boolean(values?.cs_dor_ouvido)}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <Typography>Sim</Typography>
                                                </Stack>
                                            </ListItem>
                                        </List>
                                        <Divider />
                                        <Typography variant="subtitle1">{'Fala:'}</Typography>
                                        <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                                            <ListItem>
                                                <ListItemText
                                                    id="switch-list-label-dificuldade"
                                                    primary={
                                                        <Typography color="secondary">
                                                            <FormattedMessage id={'autoDeclaracao.cs_dif_fala'} />
                                                        </Typography>
                                                    }
                                                />
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography>Não</Typography>
                                                    <FormControlLabel
                                                        value={true}
                                                        control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
                                                        name="cs_dif_fala"
                                                        checked={Boolean(values?.cs_dif_fala)}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <Typography>Sim</Typography>
                                                </Stack>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    id="switch-list-label-dificuldade-fala"
                                                    primary={
                                                        <Typography color="secondary">
                                                            <FormattedMessage id={'autoDeclaracao.cs_dif_fala_em_terapia'} />
                                                        </Typography>
                                                    }
                                                />
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography>Não</Typography>
                                                    <FormControlLabel
                                                        value={true}
                                                        control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
                                                        name="cs_dif_fala_em_terapia"
                                                        checked={Boolean(values?.cs_dif_fala_em_terapia)}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <Typography>Sim</Typography>
                                                </Stack>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    id="switch-list-label-order-2"
                                                    primary={
                                                        <Typography color="secondary">
                                                            <FormattedMessage id={'autoDeclaracao.cs_dif_fala_ja_fez_terapia'} />
                                                        </Typography>
                                                    }
                                                />
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography>Não</Typography>
                                                    <FormControlLabel
                                                        value={true}
                                                        control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
                                                        name="cs_dif_fala_ja_fez_terapia"
                                                        checked={Boolean(values?.cs_dif_fala_ja_fez_terapia)}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <Typography>Sim</Typography>
                                                </Stack>
                                            </ListItem>
                                        </List>
                                        <Divider />
                                        <Typography variant="subtitle1">
                                            {<FormattedMessage id={'autoDeclaracao.cs_aprendizagem'} />}
                                        </Typography>
                                        <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                                            <ListItem>
                                                <ListItemText
                                                    id="switch-list-label-order-1"
                                                    primary={<Typography color="secondary">Baixo rendimento escolar</Typography>}
                                                />
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography>Não</Typography>
                                                    <FormControlLabel
                                                        value={true}
                                                        control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
                                                        name="cs_aprendizagem_baixo_rend"
                                                        checked={Boolean(values?.cs_aprendizagem_baixo_rend)}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <Typography>Sim</Typography>
                                                </Stack>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    id="switch-list-label-order-2"
                                                    primary={<Typography color="secondary">Desatento</Typography>}
                                                />
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography>Não</Typography>
                                                    <FormControlLabel
                                                        value={true}
                                                        control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
                                                        name="cs_aprendizagem_desatento"
                                                        checked={Boolean(values?.cs_aprendizagem_desatento)}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <Typography>Sim</Typography>
                                                </Stack>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    id="switch-list-label-order-3"
                                                    primary={<Typography color="secondary">Agitado</Typography>}
                                                />
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography>Não</Typography>
                                                    <FormControlLabel
                                                        value={true}
                                                        control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
                                                        name="cs_aprendizagem_agitado"
                                                        checked={Boolean(values?.cs_aprendizagem_agitado)}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <Typography>Sim</Typography>
                                                </Stack>
                                            </ListItem>
                                        </List>
                                        <Divider />
                                        <Typography variant="subtitle1">{<FormattedMessage id={'autoDeclaracao.cs_usa'} />}</Typography>
                                        <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                                            <ListItem>
                                                <ListItemText
                                                    id="switch-list-label-order-1"
                                                    primary={<Typography color="secondary">Chupeta</Typography>}
                                                />
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography>Não</Typography>
                                                    <FormControlLabel
                                                        value={true}
                                                        control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
                                                        name="cs_usa_chupeta"
                                                        checked={Boolean(values?.cs_usa_chupeta)}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <Typography>Sim</Typography>
                                                </Stack>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    id="switch-list-label-order-2"
                                                    primary={<Typography color="secondary">Dedo</Typography>}
                                                />
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography>Não</Typography>
                                                    <FormControlLabel
                                                        value={true}
                                                        control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
                                                        name="cs_usa_dedo"
                                                        checked={Boolean(values?.cs_usa_dedo)}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <Typography>Sim</Typography>
                                                </Stack>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    id="switch-list-label-order-3"
                                                    primary={<Typography color="secondary">Mamadeira</Typography>}
                                                />
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography>Não</Typography>
                                                    <FormControlLabel
                                                        value={true}
                                                        control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
                                                        name="cs_usa_mamadeira"
                                                        checked={Boolean(values?.cs_usa_mamadeira)}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <Typography>Sim</Typography>
                                                </Stack>
                                            </ListItem>
                                        </List>
                                        <Divider />
                                        <Typography variant="subtitle1">
                                            {<FormattedMessage id={'autoDeclaracao.cs_autorizo_assinatura'} />}
                                        </Typography>
                                        <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                                            <ListItem>
                                                <ListItemText
                                                    id="switch-list-label-order-2"
                                                    primary={
                                                        <Typography color="secondary">
                                                            {<FormattedMessage id={'autoDeclaracao.cs_autorizo_assinatura_resp'} />}
                                                        </Typography>
                                                    }
                                                />
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography>Não</Typography>
                                                    <FormControlLabel
                                                        value={true}
                                                        control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
                                                        name="cs_autorizo_assinatura_resp"
                                                        checked={Boolean(values?.cs_autorizo_assinatura_resp)}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <Typography>Sim</Typography>
                                                </Stack>
                                            </ListItem>
                                        </List>

                                        <Divider />
                                        <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                                            <ListItem>
                                                <ListItemText
                                                    id="switch-list-label-order-1"
                                                    primary={
                                                        <Typography variant="subtitle1">
                                                            {<FormattedMessage id={'autoDeclaracao.cs_autorizo_uso_fotos'} />}
                                                        </Typography>
                                                    }
                                                />
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography>Não</Typography>
                                                    <FormControlLabel
                                                        value={true}
                                                        control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
                                                        name="cs_autorizo_uso_fotos"
                                                        checked={Boolean(values?.cs_autorizo_uso_fotos)}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <Typography>Sim</Typography>
                                                </Stack>
                                            </ListItem>
                                        </List>

                                        <Divider />
                                        <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                                            <ListItem>
                                                <ListItemText
                                                    id="switch-list-label-order-1"
                                                    primary={
                                                        <Typography variant="subtitle1">
                                                            {<FormattedMessage id={'autoDeclaracao.cs_autorizo'} />}
                                                        </Typography>
                                                    }
                                                />
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography>Não</Typography>
                                                    <FormControlLabel
                                                        value={true}
                                                        control={view ? <Switch color="primary" disabled /> : <Switch color="primary" />}
                                                        name="cs_autorizo"
                                                        checked={Boolean(values?.cs_autorizo)}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <Typography>Sim</Typography>
                                                </Stack>
                                            </ListItem>
                                        </List>
                                    </Stack>
                                </MainCard>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                                    <Button variant="outlined" color="secondary" onClick={onCancel}>
                                        {'Voltar'}
                                    </Button>
                                    <Button
                                        disabled={isSubmitting || !values.cs_autorizo}
                                        startIcon={isSubmitting && <CircularProgress size={20} />}
                                        // type="submit"
                                        variant="contained"
                                        onClick={handleFieldError}
                                    >
                                        {state === 'register' ? 'Enviar formulário' : 'Salvar'}
                                    </Button>

                                    {state === 'edit' ? (
                                        <>
                                            <Button
                                                disabled={isSubmitting}
                                                startIcon={isSubmitting && <CircularProgress size={20} />}
                                                onClick={() => {
                                                    setDeletar(true);
                                                }}
                                                variant="contained"
                                                color="error"
                                            >
                                                {'Excluir'}
                                            </Button>
                                        </>
                                    ) : null}
                                </Stack>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Form>
            </FormikProvider>
            <DialogExcluir title={values?.nm_paciente} open={deletar} setOpen={setDeletar} remover={remover} />
            <DialogMessageSucess title={values?.nm_paciente} open={messageSuccess} setOpen={setMessageSuccess} />
            <DialogMessageError title={values?.nm_paciente} open={messageError} setOpen={setMessageError} />
        </Page>
    );
};

AutoDeclaracaoForm.propTypes = {
    initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    title: PropTypes.string,
    state: PropTypes.string
};

AutoDeclaracaoForm.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default AutoDeclaracaoForm;
