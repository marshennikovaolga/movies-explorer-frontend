import Main from "./Main/Main"
import Footer from "./Footer/Footer"

export default function ProtectedPage({ ...props }) {
  return (
    <>
      <Main {...props} />
      <Footer />
    </>
  )
}