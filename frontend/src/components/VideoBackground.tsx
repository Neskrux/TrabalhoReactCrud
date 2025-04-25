import React from 'react';
import { Box } from '@mui/material';

const VideoBackground: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
    </Box>
  );
};

export default VideoBackground; 