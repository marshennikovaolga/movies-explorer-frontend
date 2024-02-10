import Header from "./Header/Header"
import Footer from "./Footer/Footer"

export default function Content({ children, loggedIn, logOut }) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            {children}
            <Footer logOut={logOut} />
        </>
    );
}