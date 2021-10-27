export type Poet = string;

export type PoetsResponse = {
  authors: Poet[];
};

export type Poem = {
  title: string;
  author: string;
  lines: string;
  lineCount: string;
}

export type AuthorPoemsResponse = Poem[];
