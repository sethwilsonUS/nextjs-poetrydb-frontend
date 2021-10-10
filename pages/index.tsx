import * as React from 'react';
import Head from "next/head";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from "../components/Link";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Head>
        <title>A PoetryDB Frontend</title>
      </Head>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Read Great Poetry
        </Typography>
        <p>Welcome to a collection of some of the greatest poetry of all time, powered by the excellent PoetryDB!</p>
        <p>This is very much a work in progress - stay tuned for enhancements.</p>
        <Link href="/poets" color="inherit">Check out the poets!</Link>
      </Box>
    </Container>
  );
}
