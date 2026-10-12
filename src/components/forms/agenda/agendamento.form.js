import {
  Button,
  DialogActions,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PropTypes from 'prop-types';

// third-party
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';

// project imports
import ColorPalette from './ColorPalette';

import { dispatch } from 'store';
import { updateEvent } from 'store/reducers/agendamento';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { CalendarOutlined } from '@ant-design/icons';

// material-ui

// project imports
import 'dayjs/locale/de';
import 'dayjs/locale/zh-cn';
import { FormattedMessage } from 'react-intl';

// material-ui

// project imports
import 'dayjs/locale/de';
import 'dayjs/locale/zh-cn';

// material-ui

// project imports
import 'dayjs/locale/de';
import 'dayjs/locale/zh-cn';

import MainCard from 'components/MainCard';

// ==============================|| CALENDAR EVENT ADD / EDIT / DELETE ||============================== //
//react/prop-types
const AgendamentoForm = ({ event, state }) => {
  const initialValues = {
    title: event.title,
    description: event.description,
    color: event.color,
    textColor: event.textColor,
    allDay: false,
    start: event.start,
    end: event.end,
    id_auto_declaracao: event.id_auto_declaracao
  };

  const theme = useTheme();

  const backgroundColor = [
    {
      value: theme.palette.primary.main,
      color: 'primary.main'
    },
    {
      value: theme.palette.error.main,
      color: 'error.main'
    },
    {
      value: theme.palette.success.main,
      color: 'success.main'
    },
    {
      value: theme.palette.secondary.main,
      color: 'secondary.main'
    },
    {
      value: theme.palette.warning.main,
      color: 'warning.main'
    },
    {
      value: theme.palette.primary.lighter,
      color: 'primary.lighter'
    },
    {
      value: theme.palette.error.lighter,
      color: 'error.lighter'
    },
    {
      value: theme.palette.success.lighter,
      color: 'success.lighter'
    },
    {
      value: theme.palette.secondary.lighter,
      color: 'secondary.lighter'
    },
    {
      value: theme.palette.warning.lighter,
      color: 'warning.lighter'
    }
  ];

  const textColor = [
    {
      value: '#fff',
      color: 'white'
    },
    {
      value: theme.palette.error.lighter,
      color: 'error.lighter'
    },
    {
      value: theme.palette.success.lighter,
      color: 'success.lighter'
    },
    {
      value: theme.palette.secondary.lighter,
      color: 'secondary.lighter'
    },
    {
      value: theme.palette.warning.lighter,
      color: 'warning.lighter'
    },
    {
      value: theme.palette.primary.lighter,
      color: 'primary.lighter'
    },
    {
      value: theme.palette.primary.main,
      color: 'primary.main'
    },
    {
      value: theme.palette.error.main,
      color: 'error.main'
    },
    {
      value: theme.palette.success.main,
      color: 'success.main'
    },
    {
      value: theme.palette.secondary.main,
      color: 'secondary.main'
    },
    {
      value: theme.palette.warning.main,
      color: 'warning.main'
    }
  ];

  const onCancel = () => {
    router.push('/core/agenda');
  };

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(200),
    description: Yup.string().max(5000),
    end: Yup.date().when('start', (start, schema) => start && schema.min(start, 'End date must be later than start date')),
    start: Yup.date(),
    color: Yup.string().max(255),
    textColor: Yup.string().max(255)
  });

  // const deleteHandler = () => {
  //   dispatch(deleteEvent(event?.id));
  //   dispatch(
  //     openSnackbar({
  //       open: true,
  //       message: 'Event deleted successfully.',
  //       variant: 'alert',
  //       alert: {
  //         color: 'success'
  //       },
  //       close: false
  //     })
  //   );
  // };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: EventSchema,
    onSubmit: (values) => {
      try {
        if (state === 'edit') {
          dispatch(updateEvent(values.id, values));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Agendamento atualizado com sucesso.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <MainCard border={false} boxShadow>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <MainCard title="Paciente">
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <TextField
                              id="title"
                              fullWidth
                              value={values.title}
                              placeholder="Escolha um paciente"
                              name="id_auto_declaracao"
                              label={<FormattedMessage id={'prontuario.nm_paciente'} />}
                              inputProps={{
                                readonly: true
                              }}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1.25}>
                            <MobileDateTimePicker
                              label="Data e Hora do Agendamento"
                              value={new Date(values.start)}
                              format="dd/MM/yyyy hh:mm a"
                              onChange={(date) => setFieldValue('start', date)}
                              slotProps={{
                                textField: {
                                  InputProps: {
                                    endAdornment: (
                                      <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                                        <CalendarOutlined />
                                      </InputAdornment>
                                    )
                                  }
                                }
                              }}
                            />
                            {touched.start && errors.start && <FormHelperText error={true}>{errors.start}</FormHelperText>}
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography variant="subtitle1">Cor</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl>
                                <RadioGroup
                                  row
                                  aria-label="color"
                                  {...getFieldProps('color')}
                                  onChange={(e) => setFieldValue('color', e.target.value)}
                                  name="color-radio-buttons-group"
                                  sx={{ '& .MuiFormControlLabel-root': { mr: 2 } }}
                                >
                                  {backgroundColor.map((item, index) => (
                                    <ColorPalette key={index} value={item.value} color={item.color} />
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography variant="subtitle1">Text Color</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl component="fieldset">
                                <RadioGroup
                                  row
                                  aria-label="textColor"
                                  {...getFieldProps('textColor')}
                                  onChange={(e) => setFieldValue('textColor', e.target.value)}
                                  name="text-color-radio-buttons-group"
                                  sx={{ '& .MuiFormControlLabel-root': { mr: 2 } }}
                                >
                                  {textColor.map((item, index) => (
                                    <ColorPalette key={index} value={item.value} color={item.color} />
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Divider />
                      <DialogActions sx={{ p: 2.5 }}>
                        <Grid container justifyContent="space-between" alignItems="center">
                          <Grid item>
                            <Stack direction="row" spacing={2} alignItems="center">
                              <Button color="error" onClick={onCancel}>
                                Voltar
                              </Button>
                              <Button type="submit" variant="contained" disabled={isSubmitting}>
                                {event ? 'Edit' : 'Add'}
                              </Button>
                            </Stack>
                          </Grid>
                        </Grid>
                      </DialogActions>
                    </MainCard>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        </Form>
      </LocalizationProvider>
    </FormikProvider>
  );
};

AgendamentoForm.propTypes = {
  state: PropTypes.string,
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func
};

export default AgendamentoForm;
