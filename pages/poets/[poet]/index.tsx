import axios from "axios";
import Head from "next/head";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
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
import { Subject } from "@mui/icons-material";
import Link from "../../../components/Link";

const PoetPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const poet = router.query.poet;

  return (
    <Container maxWidth="sm">
      <Head>
        <title>The poems of {poet}</title>
      </Head>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Poems of {poet}
        </Typography>
        <List>
          {props.poems &&
            props.poems.map((poem, index) => (
              <ListItem key={index} disablePadding>
                <Link href={`/poets/${poet}/${poem.title}`} color="inherit">
                  <ListItemButton>
                    <ListItemIcon>
                      <Subject />
                    </ListItemIcon>
                    <ListItemText primary={poem.title} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
        </List>
      </Box>
    </Container>
  );
};

type Poem = {
  title: string;
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  if (!context || !context.params) {
    return {
      props: { error: "Oops, something went wrong." },
      poems: { title: "Error" },
    };
  }

  const poet = context.params.poet;

  const response = await axios.get<Poem[]>(
    `https://poetrydb.org/author/${poet}/title`
  );
  const poems = response.data;

  return { props: { poems } };
};

type Poet = string;
type PoetryAuthorsResponse = {
  authors: Poet[];
};

export const getStaticPaths = async () => {
  const response = await axios.get<PoetryAuthorsResponse>(
    "https://poetrydb.org/author"
  );
  const poets = response.data.authors;

  const paths = poets.map((poet) => ({ params: { poet } }));

  return { paths, fallback: false };
};

export default PoetPage;
