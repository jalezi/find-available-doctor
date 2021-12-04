import * as Icons from 'components/Shared/Icons';
import * as Styled from './styles';

const SocialLinks = function () {
  return (
    <div>
      <Styled.IconButton
        href="https://www.facebook.com/COVID19Sledilnik"
        target="_blank"
        rel="noopener"
      >
        <Icons.Icon name="Facebook" />
      </Styled.IconButton>
      <Styled.IconButton href="https://twitter.com/sledilnik" target="_blank" rel="noopener">
        <Icons.Icon name="Twitter" />
      </Styled.IconButton>
    </div>
  );
};

export default SocialLinks;
