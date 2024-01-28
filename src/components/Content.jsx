import Header from "./Header/Header"
import Footer from "./Footer/Footer"

export default function Content({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}