import Button from '@mui/material/Button';
import 'dayjs/locale/de';
import 'dayjs/locale/zh-cn';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

// assets
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';

const AudioPlayerButton = (props) => {
    const { src, variant, color, label } = props;
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const handlePlayPauseClick = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <Button
                startIcon={
                    isPlaying ? <PauseOutlined sx={{ height: 20, width: 20 }} /> : <CaretRightOutlined sx={{ height: 20, width: 20 }} />
                }
                variant={variant}
                color={color}
                onClick={handlePlayPauseClick}
            >
                {label}
            </Button>

            <audio ref={audioRef}>
                <source src={src} type="audio/mpeg" />
                <track kind="captions" srcLang="pt" label="Portugues" />
            </audio>
        </>
    );
};

AudioPlayerButton.propTypes = {
    src: PropTypes.string.isRequired,
    variant: PropTypes.string,
    color: PropTypes.string,
    label: PropTypes.string
};

export default AudioPlayerButton;
