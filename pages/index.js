import Head from "next/head";
import { CrispBanner } from "../components/crisp";
import Footer from "../components/elements/Footer";
import HomePage from "../components/slides/HomePage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Builder Profile Maker</title>
        <meta name="title" content="Builder Profile Maker" />
        <meta
          name="description"
          content="Best Profile Generator, Create your perfect Builder Profile in the best possible way. Lots of features and tools included, all for free!"
        />
        <meta name="copyright" content="NEAR Builders" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://join.nearbuilders.org/" />
        <meta property="og:title" content="Builder Profile Maker" />
        <meta
          property="og:description"
          content="Best Profile Generator, Create your perfect Builder Profile in the best possible way. Lots of features and tools included, all for free!"
        />
        <meta
          property="og:image"
          content="https://join.nearbuilders.org/webimg.png"
        />
        <meta property="x:card" content="summary_large_image" />
        <meta property="x:url" content="https://join.nearbuilders.org" />
        <meta property="x:title" content="GPRM : GitHub Profile ReadMe Maker" />
        <meta
          property="x:description"
          content="Best Profile Generator, Create your perfect Builder Profile in the best possible way. Lots of features and tools included, all for free!"
        />
        <meta
          property="x:image"
          content="https://join.nearbuilders.org/webimg.png"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <>
        <CrispBanner />
        <div className="flex min-h-screen max-w-[100vw] flex-col overflow-x-hidden p-3 text-white md:p-4">
          {/* <NavBar /> */}
          <div className="flex-grow">
            <HomePage />
          </div>
          <Footer />
        </div>
      </>
    </>
  );
}
