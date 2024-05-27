import {SFC} from 'types';
import ContentBlock from './ContentBlock';
import logo from 'assets/logo.svg';
import profile from 'assets/profile.svg';
import dashLine from 'assets/dash-line.svg';
import link from 'assets/link-box.svg';
import star from 'assets/star.svg';
import git from 'assets/git.svg';
import email from 'assets/email.svg';

export const contentData = [
  {
    contact: 'examplebuckymail@tnb.com',
    heading: 'How do I become a GitHub contributor?',
    images: [profile, dashLine, link, dashLine, logo, git],
    text: 'To become a GitHub contributor, message Bucky to link your thenewboston.com account to your GitHub account.',
  },
  {
    contact: 'examplebuckymail@tnb.com',
    heading: 'How do I become a manual contributor?',
    images: [profile, dashLine, star, dashLine, logo, email],
    text: 'To become a manual contributor, message Bucky.',
  },
  {
    contact: null,
    heading: 'How does Ia determine the value of a contribution?',
    images: [],
    text: 'Ia is trained on verified contributions, each assigned a "true value" score based on the time taken to complete the tasks. This time is converted to a score using a standard rate of 1,000 TNB/hour. Over time as more verified contributions are added to the training data, Ia will become better at accurately assessing the value of each contribution.',
  },
];

const QA: SFC = () => {
  return (
    <>
      {contentData.map((data, index) => (
        <ContentBlock key={index} data={data} />
      ))}
    </>
  );
};
export default QA;
