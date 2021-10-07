import "../../style/footer.css"
import {
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaReddit,
  FaPhone,
} from "react-icons/fa"

const MainFooter = () => {
  return (
    <div id="main-footer">
      <a href="https://www.google.com/">
        <div>
          <FaFacebook />
        </div>
      </a>
      <a href="https://www.google.com/">
        <div>
          <FaYoutube />
        </div>
      </a>
      <a href="https://www.google.com/">
        <div>
          <FaTwitter />
        </div>
      </a>
      <a href="https://www.google.com/">
        <div>
          <FaInstagram />
        </div>
      </a>
      <a href="https://www.google.com/">
        <div>
          <FaReddit />
        </div>
      </a>
      <a href="https://www.google.com/">
        <div>
          <FaPhone />
        </div>
      </a>
    </div>
  )
}

export default MainFooter
