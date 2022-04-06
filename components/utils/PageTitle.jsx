import Head from 'next/head';

const PageTitle = () => {
  return (
    <>
      <Head>
        <title>My CV Creator</title>
        <meta name="description" content="My app with nextjs" />
        <link rel="icon" href="/favicon.ico" />
        <link id="app-theme" rel="stylesheet" type="text/css"></link>
      </Head>
    </>
  );
};
export default PageTitle;
