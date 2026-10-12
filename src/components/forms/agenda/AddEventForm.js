import { CalendarOutlined, DeleteFilled } from '@ant-design/icons';
import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import IconButton from 'components/@extended/IconButton';
import { Form, FormikProvider, useFormik } from 'formik';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { dispatch, useSelector } from 'store';
import { createAll, deleteEvent, updateEvent } from 'store/reducers/agendamento';
import { openSnackbar } from 'store/reducers/snackbar';
import * as Yup from 'yup';
import ColorPalette from './ColorPalette';
// import 'dayjs/locale/de';
// import 'dayjs/locale/zh-cn';
import { addMinutes } from 'date-fns';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getPacientes } from 'store/reducers/auto-declaracao';

// constant
const getInitialValues = (event, range) => {
  const newEvent = {
    title: null,
    description: '',
    color: '#1890ff',
    textColor: '#fff',
    allDay: false,
    start: range ? new Date(range.start) : new Date(),
    end: null,
    id_auto_declaracao: null
  };

  if (event || range) {
    return _.merge({}, newEvent, event);
  }

  return newEvent;
};

// ==============================|| CALENDAR EVENT ADD / EDIT / DELETE ||============================== //

const AddEventFrom = ({ event, range, onCancel }) => {
  const theme = useTheme();
  const isCreating = !event;

  const { pacientes } = useSelector((state) => state.autoDeclaracao);
  const [paciente, setPaciente] = useState([]);

  useEffect(() => {
    dispatch(getPacientes());
    setPaciente(pacientes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const EventSchema = Yup.object().shape({
    // title: Yup.string().max(200),
    // description: Yup.string().max(5000),
    // end: Yup.date().when('start', (start, schema) => start && schema.min(start, 'End date must be later than start date')),
    // start: Yup.date(),
    // color: Yup.string().max(255),
    // textColor: Yup.string().max(255),
    id_auto_declaracao: Yup.string().max(255).required('O Paciente é obrigatório')
  });

  const deleteHandler = () => {
    dispatch(deleteEvent(event?.id));
    dispatch(
      openSnackbar({
        open: true,
        message: 'Event deleted successfully.',
        variant: 'alert',
        alert: {
          color: 'success'
        },
        close: false
      })
    );
  };

  const formik = useFormik({
    initialValues: getInitialValues(event, range),
    validationSchema: EventSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        const newEvent = {
          title: values.title,
          id_auto_declaracao: values.id_auto_declaracao,
          description: values.description,
          color: values.color,
          textColor: values.textColor,
          allDay: values.allDay,
          start: values.start,
          end: addMinutes(values.start, 15)
        };

        if (event) {
          dispatch(updateEvent(event.id, newEvent));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Event updated successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        } else {
          dispatch(createAll(newEvent));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Agendamento realizado com sucesso.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        }
        //dispatch(updateStatus(newEvent.id_auto_declaracao));
        //dispatch(getEvents());
        //dispatch(getPacientes());

        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { values, errors, touched, handleSubmit, handleBlur, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle>{'Criar Agendamento'}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <Autocomplete
                    id="id_auto_declaracao"
                    fullWidth
                    value={paciente?.filter((item) => item.id_auto_declaracao === values?.id_auto_declaracao)[0]}
                    onBlur={handleBlur}
                    onChange={(event, newValue) => {
                      setFieldValue('id_auto_declaracao', newValue === null ? '' : newValue.id_auto_declaracao);
                      setFieldValue(
                        'title',
                        newValue === null
                          ? ''
                          : newValue.nm_paciente + ', ' + newValue.cs_serie + newValue.cs_turma + ' - ' + newValue.cs_turno
                      );
                    }}
                    options={paciente}
                    autoHighlight
                    isOptionEqualToValue={(option, value) => option.id_auto_declaracao === value?.id_auto_declaracao}
                    getOptionLabel={(option) => {
                      return option.nm_paciente + ', ' + option.cs_serie + option.cs_turma + ' - ' + option.cs_turno;
                    }}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <Typography>{option.nm_paciente + ', ' + option.cs_serie + option.cs_turma + ' - ' + option.cs_turno}</Typography>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Escolha um paciente"
                        name="id_auto_declaracao"
                        label={<FormattedMessage id={'prontuario.nm_paciente'} />}
                        inputProps={{
                          ...params.inputProps
                        }}
                      />
                    )}
                  />
                  {touched.id_auto_declaracao && errors.id_auto_declaracao && (
                    <FormHelperText error={true}>{errors.id_auto_declaracao}</FormHelperText>
                  )}
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
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 2.5 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                {!isCreating && (
                  <Tooltip title="Delete Event" placement="top">
                    <IconButton onClick={deleteHandler} size="large" color="error">
                      <DeleteFilled />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button color="error" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {event ? 'Edit' : 'Add'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </Form>
      </LocalizationProvider>
    </FormikProvider>
  );
};

AddEventFrom.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func
};

export default AddEventFrom;
