import Layout from '../../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

export default function Post({ postData: { name, imgurl, description } }) {
  return (
    <Layout>
      <Head>
        <title>{name}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>{name}</h1>
      <p>{description}</p>
      <img src={imgurl} alt={name} />
      <h2>
        <Link href='/'>
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { data: blogData } = await axios.get('https://wbs-nextjs-api.herokuapp.com/recipes');
  const paths = blogData.map(({ name }) => {
    return {
      params: {
        id: name
      }
    };
  });
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { data: blogData } = await axios.get('https://wbs-nextjs-api.herokuapp.com/recipes');
  const postData = blogData.find(post => post.name === params.id);
  return {
    props: {
      postData
    }
  };
}
