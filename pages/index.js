import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

export const getStaticProps = async () => {
  const { data: blogData } = await axios.get('https://wbs-nextjs-api.herokuapp.com/recipes');
  return { props: { blogData }, revalidate: 10 };
};

const Home = ({ blogData }) => {
  return (
    <div className='container mt-5'>
      <Head>
        <title>Food blog 🤷</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <ul className='row list-unstyled'>
          {blogData.map(({ id, description, name, imgurl }) => (
            <li key={id} className='col-md-4 mb-5'>
              <div className='card'>
                <img
                  className='card-img-top'
                  src={imgurl}
                  alt={name}
                  style={{ objectFit: 'cover', height: '10rem' }}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{name}</h5>
                  <p className='card-text'>{description}</p>
                  <Link href={`/posts/${name}`}>
                    <a className='btn btn-primary'>More</a>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
