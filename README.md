# [ChessWager](https://chesswager.io/)

### Bet on live professional chess games and get paid instantly

##### Chesswager is a hybrid dApp that uses smart contracts to securely facilitate betting on the top games being played on [LichessTV](https://lichess.org/tv).
<!-- [![Lines of Code](https://img.shields.io/tokei/lines/github/geektechniquestudios/ChessWager)](#) -->

[![License](https://img.shields.io/github/license/geektechniquestudios/ChessWager)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)
[![Build](https://img.shields.io/github/checks-status/geektechniquestudios/ChessWager/main)](#)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)



<br><br>

ChessWager is live. You can visit https://chesswager.io/ and play right now. You can't bet with real currency yet, but you can play on the Avalanche testnet.

 <details>
  <summary>
   How it works
  </summary>
 <br>


- Primary Tech used in this project:
  - Frontend: React, Typescript, Unstated, Tailwind, Web3, Ethersjs
  - Backend: Firebase, Solidity, TS-Node, Ethersjs
  - Testing: Cypress, Hardhat, Waffle
  - CI/CD: Docker, Google Cloud Build, Kubernetes, Google Kubernetes Engine
  - Package Management: Vite, Yarn

-Diagram here-

  </details>
  
 <details>
  <summary>
   Roadmap
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
   Branch Structure
  </summary>
 <br>
This repository's branch structure is designed similarly to the standard [gitflow](https://github.com/nvie/gitflow) model with the addition of a "test" branch between develop and release. The develop, test, and main branches each have their own backend environment.

![](readme-assets/git-model.png)


  - *Develop* could have any backend changes at any time.
  - *Test* will only have user testing and controlled tests running on its environment during the build process.
  - *Main* of course operates on the production environment.
  
</details>

  

