import {SFC} from 'types';

import * as S from './Styles';

export interface PrivacyPolicyModalProps {
  close(): void;
}

const PrivacyPolicyModal: SFC<PrivacyPolicyModalProps> = ({className, close}) => {
  return (
    <S.Modal className={className} close={close} header="Privacy Policy">
      <S.ScrollableContent>
        <S.Title>Privacy Policy</S.Title>
        <S.LastUpdated>Last Updated: January 2025</S.LastUpdated>

        <S.Section>
          <S.SectionTitle>1. Introduction</S.SectionTitle>
          <S.Paragraph>
            This Privacy Policy describes how we collect, use, and handle your information when you use our platform. By
            using the platform, you agree to the collection and use of information in accordance with this policy.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>2. Information We Collect</S.SectionTitle>
          <S.Paragraph>We may collect the following types of information:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Account Information:</S.Bold> Username, password (encrypted), and invitation code
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Profile Information:</S.Bold> Avatar, banner, bio, and social media usernames you choose to
              provide
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Activity Data:</S.Bold> Currencies created, transactions made, posts, comments, and other platform
              activities
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Technical Data:</S.Bold> IP address, browser type, and other standard web log information
            </S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>3. How We Use Your Information</S.SectionTitle>
          <S.Paragraph>We use the collected information to:</S.Paragraph>
          <S.List>
            <S.ListItem>Provide and maintain the platform</S.ListItem>
            <S.ListItem>Allow you to create and manage virtual currencies</S.ListItem>
            <S.ListItem>Enable transactions between users</S.ListItem>
            <S.ListItem>Display your profile and activities to other users</S.ListItem>
            <S.ListItem>Communicate with you about the platform</S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>4. Information Sharing</S.SectionTitle>
          <S.Paragraph>
            <S.Bold>Public Information:</S.Bold> Your username, profile information, created currencies, public posts,
            and transaction history are visible to other users of the platform.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Private Information:</S.Bold> We do not sell, trade, or rent your personal information to third
            parties. However, we reserve the right to disclose information if required by law.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>5. Data Security</S.SectionTitle>
          <S.Paragraph>
            While we implement reasonable security measures, we cannot guarantee absolute security. You acknowledge that
            you provide information at your own risk. We are not responsible for any unauthorized access to your account
            or data.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>6. Data Retention and Deletion</S.SectionTitle>
          <S.Paragraph>
            <S.Bold>We reserve the right to delete any or all of your data at any time for any reason.</S.Bold> This
            includes but is not limited to:
          </S.Paragraph>
          <S.List>
            <S.ListItem>Account information and credentials</S.ListItem>
            <S.ListItem>Created currencies and coin balances</S.ListItem>
            <S.ListItem>Transaction history</S.ListItem>
            <S.ListItem>Posts, comments, and other content</S.ListItem>
            <S.ListItem>Any other data associated with your account</S.ListItem>
          </S.List>
          <S.Paragraph>
            Deletion may occur without notice or explanation. You should not rely on this platform for permanent data
            storage.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>7. No Warranty of Data Preservation</S.SectionTitle>
          <S.Paragraph>
            <S.Bold>
              WE PROVIDE NO WARRANTY OR GUARANTEE THAT YOUR DATA WILL BE PRESERVED, MAINTAINED, OR REMAIN ACCESSIBLE.
            </S.Bold>{' '}
            Data loss may occur due to:
          </S.Paragraph>
          <S.List>
            <S.ListItem>Technical failures or bugs</S.ListItem>
            <S.ListItem>Platform maintenance or updates</S.ListItem>
            <S.ListItem>Our discretionary decisions</S.ListItem>
            <S.ListItem>Cessation of platform operations</S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>8. Children's Privacy</S.SectionTitle>
          <S.Paragraph>
            Our platform is not intended for children under 13 years of age. We do not knowingly collect personal
            information from children under 13. If we discover that we have collected information from a child under 13,
            we will delete that information.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>9. Changes to This Privacy Policy</S.SectionTitle>
          <S.Paragraph>
            We may update our Privacy Policy from time to time without notice. Changes are effective immediately upon
            posting. Your continued use of the platform after any changes constitutes acceptance of the new Privacy
            Policy.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>10. No Rights or Recourse</S.SectionTitle>
          <S.Paragraph>
            <S.Bold>
              You acknowledge that you have no ownership rights to any data stored on the platform and no recourse if
              data is lost, deleted, or becomes inaccessible.
            </S.Bold>
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>11. User-Generated Content</S.SectionTitle>
          <S.Paragraph>
            <S.Bold>User-Created Content:</S.Bold> Users can create and share various types of content on this platform,
            including currency descriptions, posts, comments, and profile information. We do not review, verify, or
            endorse the accuracy or truthfulness of any user-generated content.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>
              Currency Descriptions and Claims: We are not responsible for any false, misleading, or inaccurate
              information in user-created currency descriptions.
            </S.Bold>{' '}
            Users may describe their currencies with fictional attributes, false claims about backing or value, or other
            inaccurate information. We do not verify these claims and you should not rely on them.
          </S.Paragraph>
          <S.Paragraph>
            All user-generated content represents solely the views of the user who created it, not those of the platform
            operator. We disclaim all liability for user-generated content.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>12. Nature of Virtual Currencies</S.SectionTitle>
          <S.Paragraph>
            <S.Bold>
              All virtual currencies on this platform, including TNB and user-created currencies, are entertainment
              tokens for use exclusively within this platform.
            </S.Bold>{' '}
            They are not financial instruments and have no monetary value.
          </S.Paragraph>
          <S.Paragraph>
            TNB, the platform's reserve currency, is created and distributed at the sole discretion of the platform
            operator. It is not backed by any assets, commodities, or external value. The platform operator may mint,
            distribute, modify, or remove TNB at any time without notice.
          </S.Paragraph>
          <S.Paragraph>
            Virtual currencies on this platform are purely for entertainment and educational purposes. They do not
            represent ownership interests, profit-sharing arrangements, or any form of investment opportunity.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>13. Contact Information</S.SectionTitle>
          <S.Paragraph>
            If you have questions about this Privacy Policy, please contact us through the platform's support channels.
          </S.Paragraph>
        </S.Section>
      </S.ScrollableContent>
    </S.Modal>
  );
};

export default PrivacyPolicyModal;
