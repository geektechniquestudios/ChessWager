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
      <a href="https://www.facebook.com/profile.php?id=100073643917469">
        <div>
          <FaFacebook />
        </div>
      </a>
      <a href="https://www.youtube.com/channel/UCJhScjp1G8lmF6IXRDM_paQ">
        <div>
          <FaYoutube />
        </div>
      </a>
      <a href="https://twitter.com/ChessWager">
        <div>
          <FaTwitter />
        </div>
      </a>
      <a href="https://www.instagram.com/chesswager/">
        <div>
          <FaInstagram />
        </div>
      </a>
      <a href="https://www.reddit.com/r/ChessWager/">
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
