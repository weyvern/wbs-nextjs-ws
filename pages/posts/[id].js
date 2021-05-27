import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import Layout from '../../components/layout';

export const getStaticPaths = async () => {
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
    fallback: 'blocking'
  };
};

export const getStaticProps = async ({ params }) => {
  const { data: blogData } = await axios.get('https://wbs-nextjs-api.herokuapp.com/recipes');
  const postData = blogData.find(post => post.name === params.id);
  return {
    props: {
      postData
    },
    revalidate: 10
  };
};

const Post = ({ postData: { name, imgurl, description, ingredients, instructions } }) => {
  return (
    <Layout>
      <Head>
        <title>{name}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='row'>
        <h1>{name}</h1>
        <p>{description}</p>
        <img src={imgurl} alt={name} style={{ objectFit: 'cover', height: '25rem' }} />
        <h3 className='mt-5'>Ingredients</h3>
        <ul>
          {ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
        <h3 className='mt-5'>Instructions</h3>
        <p>{instructions}</p>
        <Link href='/'>
          <a className='btn btn-primary'>Back to home</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Post;
