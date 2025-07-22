import {ModalContent} from 'components/Modal';
import {SFC} from 'types';

import * as S from './Styles';

export interface TermsModalProps {
  close(): void;
}

const TermsModal: SFC<TermsModalProps> = ({className, close}) => {
  return (
    <S.Modal className={className} close={close} header="Terms and Conditions">
      <ModalContent>
        <S.ScrollableContent>
          <S.Title>Terms and Conditions</S.Title>
          <S.LastUpdated>Last Updated: January 2025</S.LastUpdated>

          <S.Section>
            <S.SectionTitle>1. Acceptance of Terms</S.SectionTitle>
            <S.Paragraph>
              By creating an account and using this platform, you acknowledge that you have read, understood, and agree
              to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use this
              platform.
            </S.Paragraph>
          </S.Section>

          <S.Section>
            <S.SectionTitle>2. Platform Description</S.SectionTitle>
            <S.Paragraph>
              This platform allows users to create custom digital currencies, mint coins, trade them on an exchange, and
              send them to other users. This is an experimental platform for educational and entertainment purposes.
            </S.Paragraph>
          </S.Section>

          <S.Section>
            <S.SectionTitle>3. No Real Monetary Value</S.SectionTitle>
            <S.Paragraph>
              <S.Bold>
                IMPORTANT: All currencies, coins, and transactions on this platform have NO REAL MONETARY VALUE.
              </S.Bold>{' '}
              They are purely virtual and exist only within this platform. They cannot be exchanged for real money,
              goods, or services outside of this platform.
            </S.Paragraph>
          </S.Section>

          <S.Section>
            <S.SectionTitle>4. User Responsibilities</S.SectionTitle>
            <S.Paragraph>You are responsible for:</S.Paragraph>
            <S.List>
              <S.ListItem>Maintaining the security of your account credentials</S.ListItem>
              <S.ListItem>All activities that occur under your account</S.ListItem>
              <S.ListItem>Complying with all applicable laws and regulations</S.ListItem>
              <S.ListItem>Not using the platform for any illegal or unauthorized purpose</S.ListItem>
            </S.List>
          </S.Section>

          <S.Section>
            <S.SectionTitle>5. Disclaimer of Warranties</S.SectionTitle>
            <S.Paragraph>
              THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
              INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT.
            </S.Paragraph>
            <S.Paragraph>We do not warrant that:</S.Paragraph>
            <S.List>
              <S.ListItem>The platform will be uninterrupted or error-free</S.ListItem>
              <S.ListItem>Any defects or bugs will be corrected</S.ListItem>
              <S.ListItem>The platform will meet your requirements or expectations</S.ListItem>
              <S.ListItem>Your data will be preserved without loss</S.ListItem>
            </S.List>
          </S.Section>

          <S.Section>
            <S.SectionTitle>6. Limitation of Liability</S.SectionTitle>
            <S.Paragraph>
              <S.Bold>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR
                INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
              </S.Bold>
            </S.Paragraph>
            <S.List>
              <S.ListItem>Your use or inability to use the platform</S.ListItem>
              <S.ListItem>Any bugs, viruses, or errors in the platform</S.ListItem>
              <S.ListItem>Any loss or corruption of your data or virtual currencies</S.ListItem>
              <S.ListItem>Any unauthorized access to your account</S.ListItem>
              <S.ListItem>Any interruption or cessation of the platform</S.ListItem>
              <S.ListItem>Any action taken in connection with your use of the platform</S.ListItem>
            </S.List>
          </S.Section>

          <S.Section>
            <S.SectionTitle>7. Data Deletion and Platform Changes</S.SectionTitle>
            <S.Paragraph>We reserve the right to:</S.Paragraph>
            <S.List>
              <S.ListItem>Delete any user account, currency, or data at any time for any reason</S.ListItem>
              <S.ListItem>Modify or discontinue the platform at any time without notice</S.ListItem>
              <S.ListItem>Change these terms at any time</S.ListItem>
              <S.ListItem>Reset or modify any virtual currencies or balances</S.ListItem>
              <S.ListItem>Remove or modify any feature of the platform</S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>
                You acknowledge that all data, currencies, and transactions may be deleted or lost at any time without
                notice or compensation.
              </S.Bold>
            </S.Paragraph>
          </S.Section>

          <S.Section>
            <S.SectionTitle>8. Indemnification</S.SectionTitle>
            <S.Paragraph>
              You agree to indemnify, defend, and hold harmless the platform operator and its affiliates from and
              against any claims, liabilities, damages, losses, and expenses arising from your use of the platform or
              violation of these terms.
            </S.Paragraph>
          </S.Section>

          <S.Section>
            <S.SectionTitle>9. No Investment or Financial Advice</S.SectionTitle>
            <S.Paragraph>
              Nothing on this platform constitutes investment, financial, legal, or tax advice. The platform is for
              educational and entertainment purposes only. Virtual currencies on this platform are not investments and
              have no real value.
            </S.Paragraph>
          </S.Section>

          <S.Section>
            <S.SectionTitle>10. User-Generated Content</S.SectionTitle>
            <S.Paragraph>
              <S.Bold>
                IMPORTANT: All currency names, descriptions, and other user-generated content are created by users and
                do not reflect the views, opinions, or endorsements of the platform operator.
              </S.Bold>
            </S.Paragraph>
            <S.Paragraph>
              We do not verify, endorse, or guarantee the accuracy, truthfulness, or reliability of any user-generated
              content, including but not limited to:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Currency or coin names, symbols, and descriptions</S.ListItem>
              <S.ListItem>Claims about currency features, purposes, or backing</S.ListItem>
              <S.ListItem>Posts, comments, and profile information</S.ListItem>
              <S.ListItem>Any other content created by users</S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>
                You acknowledge that the platform operator is not responsible or liable for any user-generated content,
                including any false, misleading, or inaccurate descriptions of currencies or coins.
              </S.Bold>{' '}
              Users may create fictional descriptions for their currencies that have no basis in reality. Always
              exercise your own judgment when viewing user-generated content.
            </S.Paragraph>
          </S.Section>

          <S.Section>
            <S.SectionTitle>11. Termination</S.SectionTitle>
            <S.Paragraph>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach these Terms.
            </S.Paragraph>
          </S.Section>

          <S.Section>
            <S.SectionTitle>12. Nature of Platform Currencies</S.SectionTitle>
            <S.Paragraph>
              <S.Bold>
                Virtual currencies on this platform are digital entertainment tokens created for recreational use within
                this closed ecosystem.
              </S.Bold>{' '}
              They have no real monetary value and cannot function as currency, investments, or stores of value.
            </S.Paragraph>
            <S.Paragraph>TNB and all other platform currencies:</S.Paragraph>
            <S.List>
              <S.ListItem>Are created and controlled entirely at the platform operator's discretion</S.ListItem>
              <S.ListItem>Are not backed by any assets, commodities, or external value sources</S.ListItem>
              <S.ListItem>Do not represent any ownership stake or profit-sharing arrangement</S.ListItem>
              <S.ListItem>Cannot be redeemed for real money, goods, or services</S.ListItem>
              <S.ListItem>May be created, modified, or deleted at any time without notice</S.ListItem>
            </S.List>
            <S.Paragraph>
              Users participate in the platform solely for entertainment. Any trading or exchange of virtual currencies
              is part of the platform's gameplay mechanics and does not constitute real financial activity or
              investment.
            </S.Paragraph>
          </S.Section>

          <S.Section>
            <S.SectionTitle>13. Contact</S.SectionTitle>
            <S.Paragraph>
              If you have any questions about these Terms, please contact us through the platform's support channels.
            </S.Paragraph>
          </S.Section>
        </S.ScrollableContent>
      </ModalContent>
    </S.Modal>
  );
};

export default TermsModal;
