import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Draggable from 'react-draggable';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { fetch } from 'store/reducers/aplicacao';
import { create } from 'store/reducers/grupo-aplicacao';
import * as Yup from 'yup';

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

// ==============================|| VINCULAR APLICAÇÃO ||============================== //

export default function DialogAplicacao({ open, setOpen, data, reload }) {
    const dispatch = useDispatch();
    const intl = useIntl();

    const { list: aplicacoes, isLoader } = useSelector((state) => state.aplicacao);

    useEffect(() => {
        dispatch(fetch());
    }, []);

    const initialValues = {
        id_grupo_seguranca: data,
        id_aplicacao: null
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            id_aplicacao: Yup.string().required(
                intl.formatMessage({ id: 'grupo-seguranca.nm_grupo_seguranca' }) + intl.formatMessage({ id: 'isRequired' })
            )
        }),
        onSubmit: (values) => {
            try {
                console.log('values', values);
                // Se estiver no modo de criação, crie um novo item
                dispatch(create(values)).finally(() => {
                    setSubmitting(false);
                });
            } catch (error) {
                console.error(error);
            }
        }
    });

    const { values, errors, touched, handleSubmit, handleBlur, setFieldValue, isSubmitting, setSubmitting } = formik;

    if (isLoader) return <Loader />;

    return (
        <Dialog
            open={open}
            onClose={() => setOpenUsuario(false)}
            fullWidth
            maxWidth="sm"
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                <Stack spacing={2}>
                    <Typography variant="h3">{`Vinculo de Pessoa do ${data?.dsc_componente}`}</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <MainCard title="" content={true}>
                            <Grid container spacing={3.5}>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        id="id_aplicacao"
                                        fullWidth
                                        value={aplicacoes.find((item) => item.id_aplicacao === values.id_aplicacao) || null}
                                        onBlur={handleBlur}
                                        onChange={(event, newValue) => {
                                            setFieldValue('id_aplicacao', newValue?.id_aplicacao ?? '');
                                        }}
                                        options={aplicacoes}
                                        autoHighlight
                                        isOptionEqualToValue={(option, value) => option.id_aplicacao === value?.id_aplicacao ?? null}
                                        getOptionLabel={(option) => option.nm_aplicacao}
                                        renderOption={(props, option) => (
                                            <Box component="li" {...props}>
                                                <Typography>{option.nm_aplicacao}</Typography>
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Escolha uma Aplicação"
                                                name="id_aplicacao"
                                                // inputRef={(el) => (fieldRefs.current.id_aplicacao = el)} // Adicione a referência
                                                label={<FormattedMessage id={'aplicacao.id_aplicacao'} />}
                                                error={Boolean(touched.id_aplicacao && errors.id_aplicacao)}
                                                helperText={errors.id_aplicacao && touched.id_aplicacao ? errors.id_aplicacao : null}
                                                inputProps={{
                                                    ...params.inputProps
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container justifyContent="flex-end" spacing={2}>
                                        <Grid item>
                                            <Button
                                                type="submit"
                                                variant="outlined"
                                                color="primary"
                                                disabled={isSubmitting}
                                                startIcon={isSubmitting && <CircularProgress size={24} />}
                                            >
                                                Vincular
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="outlined" color="secondary" onClick={() => setOpen(!open)}>
                                                Fechar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <br />
                        </MainCard>
                    </Form>
                </FormikProvider>
            </DialogContent>
        </Dialog>
    );
}

DialogAplicacao.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    setOpenUsuario: PropTypes.func
};
