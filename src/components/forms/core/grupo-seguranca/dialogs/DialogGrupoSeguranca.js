import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, Stack, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import MainCard from 'components/MainCard';
import { Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { create } from 'store/reducers/grupo-seguranca';
import { openSnackbar } from 'store/reducers/snackbar';
import * as Yup from 'yup';

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

// ==============================|| CRIAR GRUPO DE SEGURANÇA ||============================== //

export default function DialogGrupoSeguranca({ open, setOpen }) {
    const dispatch = useDispatch();
    const intl = useIntl();
    const router = useRouter();

    const initialValues = {
        nm_grupo_seguranca: null
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            nm_grupo_seguranca: Yup.string().required(
                intl.formatMessage({ id: 'grupo-seguranca.nm_grupo_seguranca' }) + intl.formatMessage({ id: 'isRequired' })
            )
        }),
        onSubmit: (values) => {
            try {
                // Se estiver no modo de criação, crie um novo item
                dispatch(create(values))
                    .then((resp) => {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Organização criada com sucesso!',
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                }
                            })
                        );
                        router.push(`/core/grupo-seguranca/editar/${resp.id_grupo_seguranca}`);
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            } catch (error) {
                console.error(error);
            }
        }
    });

    const { values, errors, touched, handleSubmit, handleBlur, handleChange, isSubmitting, setSubmitting } = formik;

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth="xs"
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                <Stack spacing={2}>
                    <Typography variant="h3">{`Criar Grupo de Segurança`}</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <MainCard title="" content={true}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="nm_grupo_seguranca"
                                        name="nm_grupo_seguranca"
                                        type="text"
                                        label={<FormattedMessage id={'grupo-seguranca.nm_grupo_seguranca'} />}
                                        fullWidth
                                        value={values?.nm_grupo_seguranca}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.nm_grupo_seguranca && errors.nm_grupo_seguranca)}
                                        helperText={
                                            errors.nm_grupo_seguranca && touched.nm_grupo_seguranca ? errors.nm_grupo_seguranca : null
                                        }
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
                                                Criar
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
                        </MainCard>
                    </Form>
                </FormikProvider>
            </DialogContent>
        </Dialog>
    );
}

DialogGrupoSeguranca.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    setOpen: PropTypes.func
};
