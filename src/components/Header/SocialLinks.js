import * as Icons from '@/components/Shared/Icons';
import * as Styled from './styles';

const SocialLinks = function SocialLinks() {
  return (
    <div>
      <Styled.IconButton
        href="https://www.facebook.com/SledilnikOrg"
        target="_blank"
        rel="noopener"
        aria-label="Facebook"
      >
        <Icons.Icon name="Facebook" />
      </Styled.IconButton>
      <Styled.IconButton
        href="https://twitter.com/sledilnik"
        target="_blank"
        rel="noopener"
        aria-label="Twitter"
      >
        <Icons.Icon name="Twitter" />
      </Styled.IconButton>
    </div>
  );
};

export default SocialLinks;
