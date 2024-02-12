// import Header from "./Header/Header"
// import Footer from "./Footer/Footer"

// export default function Content({ loggedIn, children }) {
//     return (
//         <>
//             <Header loggedIn={loggedIn} />
//             {children}
//             <Footer/>
//         </>
//     );
// }

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Content({ loggedIn, children, hasFooter = true }) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            {children}
            {hasFooter && <Footer />}
        </>
    );
}