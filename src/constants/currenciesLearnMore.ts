import SystemArc from 'assets/currenciesLearnMore/architecture.png';
import BenefitImg from 'assets/currenciesLearnMore/benefit.png';
import MissionImg from 'assets/currenciesLearnMore/mission-statement.png';
import Tag from 'assets/currenciesLearnMore/tag-icon.png';
import UseCaseImg from 'assets/currenciesLearnMore/use-cases.png';
import VisionImg from 'assets/currenciesLearnMore/vision-statement.png';
import {LearnMore} from 'types';

export const VISION_STATEMENT: LearnMore = {
  detail:
    'To enable individuals, communities and businesses worldwide to establish their own digital currencies, fostering financial sovereignty, innovation and economic development',
  logo: VisionImg,
  title: 'Vision Statement',
};

export const MISSION_STATEMENT: LearnMore = {
  detail:
    'Our mission is to equip developers with the tools to build innovative applications and services using decentralized digital currencies. We advocate our financial inclusion, privacy and security while eliminating barriers and intermediaries, cultivating a fair and interconnected digital economy.',
  logo: MissionImg,
  title: 'Mission Statement',
};

export const SYSTEM_ARCHITECTURE: LearnMore = {
  detail: `The system operates as a decentralized network of networks, allowing individuals to create and distribute their own digital currency known as "coins." Each currency server in the network maintains a separate ledger. The minting and distribution of new coins are determined by the server owner. Coins within the network serve various purposes. They enable secure messaging between devices and can also be transferred as a form of value between users. The network architecture permits devices to store data locally, removing the need for a centralized database and facilitating the development of distributed applications. \n
    To enable messaging and value transfer, a standardized protocol is employed. Although currency servers are not directly connected, clients can connect to multiple currencies, effectively linking them through client devices.\n
    Notably, messaging and value transfers take place only within the same currency server. Each server maintains its independent ledger, ensuring that each users transaction history remains within a single server as the definitive record of truth.`,
  logo: SystemArc,
  title: 'System Architecture',
};

export const BENEFITS: LearnMore = {
  detail: '',
  logo: BenefitImg,
  obj: {
    1: [
      'Financial control:',
      'It allows users to create their own digital currencies, promoting financialindependence.',
    ],
    2: [
      'Inclusivity:',
      'The system enables anyone, including those without traditional banking access, to participate in the digital economy.',
    ],
    3: [
      'Innovation:',
      'The open architecture supports the development of new applications and services using decentralized digital currencies.',
    ],
    4: [
      'Privacy and security:',
      "Decentralization and local data storage provide enhanced protection for users' personal information.",
    ],
    5: [
      'Faster transactions:',
      'The platform streamlines messaging and value transfers, making transactions quicker and more efficient.',
    ],
    6: [
      'Decentralized management:',
      'The system reduces double spending risks and allows autonomous currency management for each server.',
    ],
    7: [
      'Interoperability:',
      'It connects to other networks, enabling integration with various blockchains and third- party APIs.',
    ],
    8: [
      'Versatility:',
      'The platform supports a wide range of use cases, making it adaptable for different applications and industries.',
    ],
  },
  title: 'Benefits',
};

export const USE_CASES: LearnMore = {
  detail: '',
  logo: UseCaseImg,
  obj: {
    1: [
      'Community Currencies:',
      'Create local digital currencies to support transactions, reward community contributions, and boost local businesses.',
    ],
    2: [
      'Loyalty and Reward Programs:',
      'Implement customized loyalty programs using digital currencies to increase customer engagement and retention.',
    ],
    3: [
      'Decentralized Marketplace:',
      'Enable direct trading of goods and services using digital currencies, reducing intermediaries and lowering transaction costs.',
    ],
    4: [
      'Secure Messaging:',
      'Develop messaging platforms that prioritize privacy, allowing users to have control over their personal information with locally stored data.',
    ],
    5: [
      'Social Networks:',
      'Empower users to earn, send, and receive digital currency by engaging with content, sharing resources, and supporting others on social networks.',
    ],
    6: [
      'Collaborative Education Platforms:',
      'Utilize digital currencies to incentivize participation and contributions on knowledge-sharing and educational platforms.',
    ],
    7: [
      'In-Game Economies:',
      'Establish dedicated digital currencies for in-game economies, allowing players to earn, trade, and purchase virtual assets.',
    ],
    8: [
      'Cross-Network Interoperability:',
      'Connect currency servers and devices to other networks, expanding integration opportunities with blockchains and third-party APIs.',
    ],
    9: [
      'Computing Resource Marketplace:',
      'Create a marketplace for selling computing resources, such as storage and spare computing power, for various causes like distributed storage and machine learning tasks',
    ],
    99: [
      'Custom Services',
      'Interact with custom services through remote function calls and compensate providers using digital currency.',
    ],
  },
  title: 'Use Cases',
};

export const SYSTEM_ARCHITECTURE_CODE: LearnMore = {
  detail: `All messages are signed using the Ed25519 public-key signature system to ensure authenticity and integrity. Since each currency server maintains its ledger, there is no need for ledger syncronization across servers. This decentralized approach allows each server to autonomously mint and manage its currency, reducing the risk of double spending.`,
  logo: Tag,
  obj: {
    amount: 5,
    id: 'dc348eac-fc89-4b4e-96de-4a988e0b94e1',
    payload: {
      message: 'Hey',
      recipient: `995bd2a4db610062f404510617e83126fa37e2836805975f334108b55523634c`,
      sender: `eb01f474a637e402b44407f3c1044a0c4b59261515d50be9abd4ee34fcb9075b`,
      signature: `4b86d923cfc7603f39e1d0c36afcec2e454c624b1dc4dd03bf6764e4662162644d0a78c864d16bb7e4608a76db6df0e842a550c52d4811f81d8049f273da8a01`,
      transaction_fee: 1,
    },
  },
  title: 'EXAMPLE PROTOCOL REQUESTS:',
};
