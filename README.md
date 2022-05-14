# [ChessWager](https://chesswager.io/)

### Bet on live professional chess games and get paid instantly

##### Chesswager is a hybrid dApp that uses smart contracts to securely facilitate betting on the top games being played on [LichessTV](https://lichess.org/tv).

<!-- https://shields.io/ -->
[![License](https://img.shields.io/github/license/geektechniquestudios/ChessWager)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)
[![Build](https://img.shields.io/github/checks-status/geektechniquestudios/ChessWager/main)](#)

<br>

ChessWager is live. You can visit https://chesswager.io/ and play right now. You can't bet with real currency yet, but you can play on the Avalanche testnet.

 <details>
  <summary>
   <h3>How it works</h3>
  </summary>
  <br>

  ### Data Flow

  ![](readme-assets/data-flow.png)

  The client relies on a firestore serverless infrastructure. When a page loads, the client subscribes to the Lichess tv API and loads real-time data about chats, bets, and users from the firestore database. 

  A few distinct programs run in an isolated cloud environment to interact with the smart contract. One of those programs, our "contract listener", listens for user payments. Once 2 users agree to a wager, their smart wallets will prompt each user with the appropriate amount. When a user sends a transaction to the contract, the contract listener writes an update to the firestore database. These changes are reflected immediately in the UI visually informing users their payment was recieved. When a bet is matched, the conditions of the bet are compared in the smart contract. If the values don't perfectly match, the transaction is rejected. 

  Another isolated backend program subscribes to the Lichess API. At the end of each game, that program interacts with with the smart contract, telling it to complete the bet transactions and pay the winners or refund users in the event of a draw.
 
 <!-- -->

  ### Primary Tech used in this project:
   ###### Build & Package Management
   ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=flat&logo=yarn&logoColor=white&labelColor=525252)
   ![Vite](https://badges.aleen42.com/src/vitejs.svg)
<!--  google cloud build   -->

   ###### Frontend
   ![TypeScript](https://badges.aleen42.com/src/typescript.svg)
   ![React](https://badges.aleen42.com/src/react.svg)
   ![TailwindCSS](https://badges.aleen42.com/src/tailwindcss.svg)

   ###### Backend
   ![TypeScript](https://badges.aleen42.com/src/typescript.svg)
   ![NodeJS](https://badges.aleen42.com/src/node.svg)
   ![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=flat&logo=solidity&logoColor=white&labelColor=525252)
   ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=flat&logo=firebase&labelColor=525252)


   ###### Testing
   ![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=flat&logo=cypress&logoColor=058a5e&labelColor=52525b)
   ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=flat&logo=jest&logoColor=white&labelColor=52525b)
   Hardhat,
   Waffle
<!--    ![Hardhat](https://img.shields.io/badge/-jest-%23C21325?style=flat&logo=jest&logoColor=white&labelColor=52525b) -->
 
 
   ###### Cloud
   ![Docker](https://badges.aleen42.com/src/docker.svg)
   ![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=flat&logo=kubernetes&logoColor=white&labelColor=525252)
   ![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=flat&logo=google-cloud&logoColor=white&prefix=test&labelColor=525252) 
   GKE, 
   Cloud build
   
 
  </details>
  
 <details>
  <summary>
   <h3>Roadmap</h3>
  </summary>
 <br>

- Phase 1: Proof of concept
  - Build a smart contract that pays users based on the result of a live chess game
  - Create a minimal frontend with the basic layout required to pair users on a bet
  - Design a global chat room, authentication, and betting lobby
- Phase 2: Minimum Viable Product
  - To Do:
    - rate limiting
    - admin accounts
    - chat reply in global chat
    - killswitch in case of emergency
    - layout responsiveness
    - onboarding "how to"
    - contact
    - faqs
    - end-to-end testing
    - user onboarding/ getting started / how to / help
  - Complete:
    - UI/UX design and implementation
    - User search
    - Security
    - Messaging
    - Friending
    - Blocking
    - Profiles
    - Build pipeline
- Phase: 3: Launch Prep
  - Develop clear WRITTEN code of ethics and customer service standards
  - Shift to agile, goal - weekly launch
  - Technical guides for contributing, bug reports
  - Aggressive feature testing and bug hunting
  - Security audit
  - UI/UX polish, animations
  - Legal statement and TOS
  - Establish LLC 
- Phase 4: Primary Launch
  - Advertising
  - 24/7 monitoring of chat and services
  - Gather analytics; refactor and plan ahead based on data
  - Pay down tech debt as much as possible
  - Optimize backend
  - Actively design defense against fraud and hacking
  - Build user engagement systems, like achievements and badges
- Phase 5: Mobile Platform and PWA
  - React Native
  - Will use the same backend
- Phase 6: Feature Growth And Product Expansion
  - Cover live tournaments
  - Adapt tech to other api based games, including irl sports
  - Real-time arbitered betting on arbitrary events
  - NFTs maybe, keeping emphasis on usefulness

</details>


 <details>
  <summary>
   <h3>Branch Structure</h3>
  </summary>
 <br>
 
This repository's branch structure is designed similarly to the standard [gitflow](https://github.com/nvie/gitflow) model with the addition of a "test" branch between develop and release. The develop, test, and main branches each have their own backend environment.

![](readme-assets/git-model.png)


  - *Develop* could have any environmental changes at any time.
  - *Test* will only have user testing and controlled tests running on its environment during the build process.
  - *Main* operates on the production environment.
  
</details>

