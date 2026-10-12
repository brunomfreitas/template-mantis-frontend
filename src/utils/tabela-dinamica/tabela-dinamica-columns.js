import { Chip, MenuItem, Select, Slider, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import NumericFormatCustom from 'components/NumeroFormatado';
import { ThemeMode } from 'config';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
// import { isMobile } from 'react-device-detect';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { TouchBackend } from 'react-dnd-touch-backend';
import * as Yup from 'yup';

const EditableRow = ({
    value: initialValue,
    row: { index },
    column: { id, dataType },
    updateData,
    unidadeGestora,
    gestao,
    unidadeOrganizacional,
    row,
    // eslint-disable-next-line no-unused-vars
    updateMeta,
    // eslint-disable-next-line no-unused-vars
    editandoIndicadores,
    // eslint-disable-next-line no-unused-vars
    atualizarValoresIndicadores
    // IsEditAble
}) => {
    const [value, setValue] = useState(initialValue);
    const theme = useTheme();
    // eslint-disable-next-line no-unused-vars
    const rowId = row.original.ID;

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const onBlur = () => {
        updateData(index, id, value);
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    // eslint-disable-next-line react/prop-types
    const ShowAtendimentoStatus = ({ value }) => {
        switch (value) {
            case 'A':
                return <Chip color="error" label="Em Espera" size="small" variant="light" />;
            case 'E':
                return <Chip color="primary" label="Em Consulta" size="small" variant="light" />;
            case 'C':
                return <Chip color="success" label="Atendido" size="small" variant="light" />;
        }
    };

    //'A', 'E', 'C'
    const atendimentoStatus = [
        { ID: 'A', NOME: 'Em Espera' },
        { ID: 'E', NOME: 'Em Consulta' },
        { ID: 'C', NOME: 'Atendido' }
    ];

    const ShowStatus = (value) => {
        switch (value) {
            case 'Inativo':
                return <Chip color="error" label="Inativo" size="small" variant="light" />;
            case 'Ativo':
                return <Chip color="success" label="Ativo" size="small" variant="light" />;
            case null:
            default:
                return <Chip color="info" label="Null" size="small" variant="light" />;
        }
    };

    const ShowDescription = (data, value) => {
        switch (data) {
            case 'unidade-gestora':
                return <Typography>{unidadeGestora.filter((item) => item.COD_DOMINIO_VALOR == value)[0]?.DSC_DESCRICAO}</Typography>;
            case 'gestao':
                return <Typography>{gestao.filter((item) => item.COD_DOMINIO_VALOR == value)[0]?.DSC_DESCRICAO}</Typography>;
            case 'organizacional':
                return <Typography>{unidadeOrganizacional.filter((item) => item.COD_DOMINIO_VALOR == value)[0]?.DSC_DESCRICAO}</Typography>;
            case null:
            default:
                return <Chip color="info" label="Null" size="small" variant="light" />;
        }
    };

    let element;
    let userInfoSchema;

    switch (id) {
        case 'email':
            userInfoSchema = Yup.object().shape({
                userInfo: Yup.string().email('Enter valid email ').required('Email is a required field')
            });
            break;
        case 'age':
            userInfoSchema = Yup.object().shape({
                userInfo: Yup.number()
                    .required('Age is required')
                    .typeError('Age must be number')
                    .min(18, 'You must be at least 18 years')
                    .max(100, 'You must be at most 60 years')
            });
            break;
        case 'visits':
            userInfoSchema = Yup.object().shape({
                userInfo: Yup.number().typeError('Visits must be number').required('Required')
            });
            break;
        case 'date':
            userInfoSchema = Yup.object().shape({
                date: Yup.date().required('Invoice date is required')
            });
            break;
        default:
            userInfoSchema = Yup.object().shape({
                userInfo: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is Required'),
                dateInfo: Yup.date()
            });
            break;
    }
    // let IsEditAble = index === editableRowIndex;
    let IsEditAble = true;

    switch (dataType) {
        case 'text':
            element = (
                <>
                    {IsEditAble ? (
                        <>
                            <Formik
                                initialValues={{
                                    userInfo: value
                                }}
                                enableReinitialize
                                validationSchema={userInfoSchema}
                                onSubmit={() => {}}
                            >
                                {({ values, errors, handleChange, touched }) => (
                                    <Form>
                                        <TextField
                                            id={`${index}-${id}`}
                                            value={values.userInfo}
                                            type="text"
                                            fullWidth
                                            name="userInfo"
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleChange(e);
                                                onChange(e);
                                            }}
                                            onBlur={onBlur}
                                            error={touched.userInfo && Boolean(errors.userInfo)}
                                            helperText={touched.userInfo && errors.userInfo && errors.userInfo}
                                            sx={{
                                                '& .MuiOutlinedInput-input': {
                                                    py: 0.75,
                                                    px: 1,
                                                    backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'inherit' : 'common.white'
                                                }
                                            }}
                                            InputProps={{
                                                readOnly: true
                                            }}
                                        />
                                    </Form>
                                )}
                            </Formik>
                        </>
                    ) : (
                        value
                    )}
                </>
            );
            break;

        case 'money':
            element = (
                <>
                    {IsEditAble ? (
                        <>
                            <Formik
                                initialValues={{
                                    userInfo: value
                                }}
                                enableReinitialize
                                validationSchema={userInfoSchema}
                                onSubmit={() => {}}
                            >
                                {({ values, errors, handleChange, touched }) => (
                                    <Form>
                                        <TextField
                                            id={`${index}-${id}`}
                                            value={values.userInfo}
                                            fullWidth
                                            name="userInfo"
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleChange(e);
                                                onChange(e);
                                            }}
                                            onBlur={onBlur}
                                            error={touched.userInfo && Boolean(errors.userInfo)}
                                            helperText={touched.userInfo && errors.userInfo && errors.userInfo}
                                            InputProps={{
                                                inputComponent: NumericFormatCustom,
                                                startAdornment: 'R$',
                                                readOnly: true
                                            }}
                                        />
                                    </Form>
                                )}
                            </Formik>
                        </>
                    ) : (
                        value
                    )}
                </>
            );
            break;
        case 'select-unidade-gestora':
            element = (
                <>
                    {IsEditAble ? (
                        <Select
                            labelId="demo-simple-select-label"
                            sx={{
                                '& .MuiOutlinedInput-input': {
                                    py: 0.75,
                                    px: 1,
                                    backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'inherit' : 'common.white'
                                }
                            }}
                            id="demo-simple-select"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            inputProps={{ readOnly: true }}
                        >
                            <MenuItem value={null}>Selecione</MenuItem>
                            {unidadeGestora.map((option) => (
                                <MenuItem key={option.COD_DOMINIO_VALOR} value={option ? option.COD_DOMINIO_VALOR : ''}>
                                    {option ? option.DSC_NOME : ''}
                                </MenuItem>
                            ))}
                        </Select>
                    ) : (
                        ShowDescription('unidade-gestora', value)
                    )}
                </>
            );
            break;
        case 'select-gestao':
            element = (
                <>
                    {IsEditAble ? (
                        <Select
                            labelId="select-gestao-label"
                            sx={{
                                '& .MuiOutlinedInput-input': {
                                    py: 0.75,
                                    px: 1,
                                    backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'inherit' : 'common.white'
                                }
                            }}
                            id="select-gestao"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            inputProps={{ readOnly: true }}
                        >
                            <MenuItem value={null}>Selecione</MenuItem>
                            {gestao.map((option) => (
                                <MenuItem key={option.COD_DOMINIO_VALOR} value={option ? option.COD_DOMINIO_VALOR : ''}>
                                    {option ? option.DSC_NOME : ''}
                                </MenuItem>
                            ))}
                        </Select>
                    ) : (
                        ShowDescription('gestao', value)
                    )}
                </>
            );
            break;
        case 'select-unidade-organizacional':
            element = (
                <>
                    {IsEditAble ? (
                        <Select
                            labelId="select-unidade-organizacional-label"
                            sx={{
                                '& .MuiOutlinedInput-input': {
                                    py: 0.75,
                                    px: 1,
                                    backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'inherit' : 'common.white'
                                }
                            }}
                            id="select-unidade-organizacional"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            inputProps={{ readOnly: true }}
                        >
                            <MenuItem value={null}>Selecione</MenuItem>
                            {unidadeOrganizacional.map((option) => (
                                <MenuItem key={option.COD_DOMINIO_VALOR} value={option ? option.COD_DOMINIO_VALOR : ''}>
                                    {option ? option.DSC_NOME : ''}
                                </MenuItem>
                            ))}
                        </Select>
                    ) : (
                        ShowDescription('organizacional', value)
                    )}
                </>
            );
            break;
        case 'select':
            element = (
                <>
                    {IsEditAble ? (
                        <Select
                            labelId="demo-simple-select-label"
                            sx={{
                                '& .MuiOutlinedInput-input': {
                                    py: 0.75,
                                    px: 1,
                                    backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'inherit' : 'common.white'
                                }
                            }}
                            id="demo-simple-select"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            inputProps={{ readOnly: true }}
                        >
                            {options.map((option) => (
                                <MenuItem key={option.COD_DOMINIO_VALOR} value={option ? option.COD_DOMINIO_VALOR : ''}>
                                    <Chip color="success" label={option ? option.DSC_NOME : ''} size="small" variant="light" />
                                </MenuItem>
                            ))}
                        </Select>
                    ) : (
                        ShowStatus(value)
                    )}
                </>
            );
            break;

        // case 'data':
        //   element = (
        //     <>
        //       {IsEditAble ? (
        //         <Formik initialValues={{ userInfo: value }} enableReinitialize validationSchema={userInfoSchema} onSubmit={() => {}}>
        //           {({ values,  errors, touched }) => (
        //             <Form>
        //               <FormControl sx={{ width: '100%' }} error={Boolean(touched.date && errors.date)}>
        //                 <LocalizationProvider dateAdapter={AdapterDateFns}>
        //                   <DatePicker
        //                     format="dd/MM/yyyy"
        //                     value={values.userInfo}
        //                     // onChange={(newValue) => setFieldValue('userInfo', newValue)}
        //                     onChange={onChange}
        //                     onBlur={onBlur}
        //                   />
        //                 </LocalizationProvider>
        //               </FormControl>
        //               <TextField name="userInfo" mask value={values.userInfo} type="text" onChange={onChange} onBlur={onBlur} />
        //             </Form>
        //           )}
        //         </Formik>
        //       ) : (
        //         <Typography>{value}</Typography>
        //       )}
        //     </>
        //   );
        //   break;

        case 'data':
            element = (
                <>
                    {IsEditAble ? (
                        <Formik
                            initialValues={{
                                userInfo: value
                            }}
                            enableReinitialize
                            validationSchema={userInfoSchema}
                            onSubmit={() => {}}
                        >
                            {({ values, errors, handleChange, touched }) => (
                                <Form>
                                    <TextField
                                        id={`${index}-${id}`}
                                        value={values.userInfo}
                                        type="datetime-local"
                                        fullWidth
                                        name="userInfo"
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            handleChange(e);
                                            onChange(e);
                                        }}
                                        onBlur={onBlur}
                                        error={touched.userInfo && Boolean(errors.userInfo)}
                                        helperText={touched.userInfo && errors.userInfo && errors.userInfo}
                                        inputProps={{ readOnly: true }}
                                    />
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <Typography>{value}</Typography>
                    )}
                </>
            );
            break;

        case 'progress':
            element = (
                <>
                    {IsEditAble ? (
                        <>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ pl: 1, minWidth: 120 }}>
                                <Slider
                                    value={value}
                                    min={0}
                                    max={100}
                                    step={1}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="non-linear-slider"
                                />
                            </Stack>
                        </>
                    ) : (
                        <div>
                            <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
                        </div>
                    )}
                </>
            );
            break;

        case 'moi':
            element = (
                <>
                    {IsEditAble ? (
                        <Select
                            labelId="demo-simple-select-label"
                            sx={{
                                '& .MuiOutlinedInput-input': {
                                    py: 0.75,
                                    px: 1,
                                    backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'inherit' : 'common.white'
                                }
                            }}
                            id="demo-simple-select"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            inputProps={{ readOnly: true }}
                        >
                            {atendimentoStatus.map((option) => (
                                <MenuItem key={option.ID} value={option.NOME}>
                                    <Chip color="info" label={option.NOME} size="small" variant="light" />
                                </MenuItem>
                            ))}
                        </Select>
                    ) : (
                        ShowAtendimentoStatus(value)
                    )}
                </>
            );
            break;

        default:
            element = <span>{value}</span>;
            break;
    }
    return element;
};

export default EditableRow;
