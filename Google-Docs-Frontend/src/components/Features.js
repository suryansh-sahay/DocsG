import React from 'react';
import { Box, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import { 
  Group as CollaborationIcon, 
  Lock as SecurityIcon 
} from '@mui/icons-material';

function Features() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      title: "Real-Time Collaboration",
      description: "Work together with your team in real-time on documents with seamless synchronization.",
      icon: <CollaborationIcon fontSize="large" />,
      color: "primary"
    },
    {
      title: "Secure Authentication",
      description: "Enterprise-grade security with JWT token authentication and data protection.",
      icon: <SecurityIcon fontSize="large" />,
      color: "secondary"
    }
  ];

  return (
    <Box 
      component="section"
      sx={{
        py: 8,
        px: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box
              sx={{
                height: '100%',
                p: 4,
                borderRadius: 4,
                backgroundColor: theme.palette.background.paper,
                boxShadow: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                  color: theme.palette[feature.color].contrastText,
                  backgroundColor: theme.palette[feature.color].main,
                }}
              >
                {feature.icon}
              </Box>
              <Typography 
                variant="h5" 
                component="h2"
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  color: theme.palette.text.primary
                }}
              >
                {feature.title}
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  color: theme.palette.text.secondary,
                  maxWidth: isMobile ? '100%' : '80%'
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Features;