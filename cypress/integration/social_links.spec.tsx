import { linkTest } from "./link_test"

const openToSocialsMenu = () => {
  cy.get('button[id="main-header-button"]').click()
  cy.get('a[id="Social"]').click()
}

linkTest(
  "https://www.instagram.com/chesswager/",
  "Instagram",
  "Instagram button",
  openToSocialsMenu,
)

linkTest(
  "https://www.facebook.com/profile.php?id=100073643917469",
  "Facebook",
  "Facebook button",
  openToSocialsMenu,
)

linkTest(
  "https://twitter.com/ChessWager",
  "Twitter",
  "Twitter button",
  openToSocialsMenu,
)

linkTest(
  "https://www.reddit.com/user/ChessWager64",
  "Reddit",
  "Reddit button",
  openToSocialsMenu,
)

linkTest(
  "https://www.youtube.com/channel/UCJhScjp1G8lmF6IXRDM_paQ",
  "Youtube",
  "Youtube button",
  openToSocialsMenu,
)

linkTest(
  "https://github.com/geektechniquestudios/ChessWager",
  "Github",
  "Github button",
  openToSocialsMenu,
)
