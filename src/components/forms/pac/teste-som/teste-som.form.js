// REMOVI A RECUSA
// import { Divider, FormControl, FormControlLabel, FormGroup, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
// import Checkbox from '@mui/material/Checkbox';

import { Divider, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MainCard from 'components/MainCard';
import AudioPlayerButton from 'pages/audio/audio-player-button';
import styles from 'styles/styles.module.css';

const TesteSom = () => {
    const theme = useTheme();

    return (
        <Grid item xs={12} sm={12}>
            <MainCard
                title={
                    <Typography variant="h3" color="textPrimary" gutterBottom>
                        Teste o Som
                    </Typography>
                }
                content={false}
            >
                <CardContent>
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        Qual lado está saindo o som ?
                    </Typography>

                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                        <span role="img" aria-label="Headphone" className={styles.emoji}>
                            🎧
                        </span>
                    </Stack>
                </CardContent>
                <Divider />
                <ToggleButtonGroup
                    fullWidth
                    color="primary"
                    exclusive
                    aria-label="text alignment"
                    size="small"
                    sx={{
                        p: 1,
                        '& .MuiToggleButton-root': {
                            borderRadius: 0,
                            p: 0.75,
                            '&:not(.Mui-selected)': {
                                borderTopColor: 'transparent',
                                borderBottomColor: 'transparent'
                            },
                            '&:first-of-type': {
                                borderLeftColor: 'transparent'
                            },
                            '&:last-of-type': {
                                borderRightColor: 'transparent'
                            },
                            '&:hover': {
                                bgcolor: 'transparent',
                                color: theme.palette.primary.main
                            }
                        }
                    }}
                >
                    <ToggleButton value="web" aria-label="web" disableRipple>
                        <AudioPlayerButton src="/assets/audios/03 Track 3-ssw.mp3" variant="contained" color="primary" label="OE" />
                    </ToggleButton>
                    <ToggleButton value="android" aria-label="android" disableRipple>
                        <AudioPlayerButton src="/assets/audios/03 Track 3-ssw.mp3" variant="contained" color="error" label="OD" />
                    </ToggleButton>
                </ToggleButtonGroup>
            </MainCard>
        </Grid>
    );
};

export default TesteSom;
