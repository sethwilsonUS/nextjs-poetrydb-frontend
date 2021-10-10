import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from "./Link";

const ButtonAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ marginRight: 5 }}>
            <Link href="/" color="inherit">Home</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ marginRight: 5 }}>
            <Link href="/poets" color="inherit">Poets</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ButtonAppBar;
