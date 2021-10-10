import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Box, Container, Divider, Typography } from "@mui/material";

const PoemPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const { poet, poem } = router.query;
  return (
    <Container maxWidth="sm">
      <Head>
        <title>{poem} by {poet}</title>
      </Head>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {poem}
          <br />
          by
          <br />
          {poet}
        </Typography>
        <Divider sx={{ my: 4 }} />
        <pre>
          {props.poemText.map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </pre>
      </Box>
    </Container>
  );
};

type PoemText = {
  title: string;
  author: string;
  lines: string[];
  linecount: string;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (!context || !context.params) {
    return { props: { error: "Something went wrong...", poemText: ["None"] } };
  }

  const { poet, poem } = context.params;

  const response = await axios.get<PoemText[]>(
    `https://poetrydb.org/author,title/${poet};${poem}`
  );
  const poemText = response.data[0].lines;

  return { props: { poemText } };
};

export default PoemPage;
