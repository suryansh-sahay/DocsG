import React from 'react';
import { Box, Typography, IconButton, useTheme, alpha } from '@mui/material';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';

function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'background.paper',
        textAlign: 'center',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="body2" sx={{ mb: 2 }}>
        &copy; {currentYear} DocsG - A Google Docs Clone
      </Typography>
      
      {/* Social Links */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        <IconButton
          aria-label="LinkedIn"
          href="https://www.linkedin.com/in/suryansh-sahay-2a426a27a/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: theme.palette.mode === 'light' ? '#0077B5' : '#90caf9',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <LinkedIn fontSize="medium" />
        </IconButton>
        <IconButton
          aria-label="GitHub"
          href="https://github.com/suryansh-sahay"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: alpha(theme.palette.grey[500], 0.1),
            },
          }}
        >
          <GitHub fontSize="medium" />
        </IconButton>
        <IconButton
          aria-label="Twitter"
          href="https://x.com/surya79955?s=08"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: theme.palette.mode === 'light' ? '#1DA1F2' : '#90caf9',
            '&:hover': {
              backgroundColor: alpha(theme.palette.info.main, 0.1),
            },
          }}
        >
          <Twitter fontSize="medium" />
        </IconButton>
      </Box>

      <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary' }}>
        Created as a learning project by Suryansh Sahay
      </Typography>
    </Box>
  );
}

export default Footer;