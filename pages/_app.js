import "../styles/globals.css";
import "../styles/animation.css";
import "../styles/scrollbar.css";
import "../styles/markdown.css";
import "../styles/toastvg.css";
import "react-toastify/dist/ReactToastify.css";
import { ProfileMakerProvider } from "../contexts/profile-maker";
import { WalletProvider } from "../contexts/wallet";
import { ToastContainer } from "react-toastify";

function App({ Component, pageProps }) {
  return (
    <WalletProvider>
      <ProfileMakerProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </ProfileMakerProvider>
    </WalletProvider>
  );
}

export default App;
