import axios from "axios";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Adb } from "@mui/icons-material";
import Link from "../../components/Link";
import { PoetsResponse } from "../../types";

const PoetsPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container maxWidth="sm">
      <Head>
        <title>Amazing Poets</title>
      </Head>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Eminent Poets
        </Typography>
        <p>Click on a poet&apos;s name to see a list of their available works.</p>
        <List>
          {props.poets.map((poet) => (
            <ListItem key={poet} disablePadding>
              <Link href={`/poets/${poet}`} color="inherit">
              <ListItemButton>
                <ListItemIcon>
                  <Adb />
                </ListItemIcon>
                <ListItemText primary={poet} />
              </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export const getStaticProps = async () => {
  const response = await axios.get<PoetsResponse>(
    "https://poetrydb.org/author"
  );
  const poets = response.data.authors;

  return { props: { poets } };
};

export default PoetsPage;
