import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import WorkIndex from '../components/WorkIndex';
import Stack from '../components/Stack';
import About from '../components/About';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Derrick Macharia | Software Developer — Nairobi, Kenya</title>
        <meta name="description" content="I build software that solves real problems. Full stack developer based in Nairobi." />
      </Helmet>
      <Hero />
      <WorkIndex />
      <Stack />
      <About />
      <Contact />
    </>
  );
};

export default Home;
