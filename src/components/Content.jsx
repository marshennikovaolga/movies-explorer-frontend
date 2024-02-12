import Header from "./Header/Header"
import Footer from "./Footer/Footer"

export default function Content({ loggedIn, children }) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            {children}
            <Footer/>
        </>
    );
}