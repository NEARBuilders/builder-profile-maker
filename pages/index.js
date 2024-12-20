import Head from "next/head";
import { CrispBanner } from "../components/crisp";
import Footer from "../components/elements/Footer";
import HomePage from "../components/slides/HomePage";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const transactionHashes = searchParams.get("transactionHashes");

    if (transactionHashes) {
      toast.success("Your profile is saved successfully!");
      router.push("/");
    }
  }, [searchParams, router]);

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
        <div className="flex min-h-screen max-w-[100vw] flex-col items-center overflow-x-hidden p-3 text-white md:p-4">
          {/* <NavBar /> */}
          <div className="max-w-screen-2xl flex-grow">
            <HomePage />
          </div>
          <Footer />
        </div>
      </>
    </>
  );
}
