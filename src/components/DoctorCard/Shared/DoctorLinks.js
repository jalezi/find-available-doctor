import PropTypes from 'prop-types';

import { Typography } from '@mui/material';
import * as Icons from '@/components/Shared/Icons';

import * as Styled from '../styles';
import * as Links from './Links';

const DoctorLinks = function DoctorLinks({ links, iconName }) {
  const phoneLinks = links.map((link, index, arr) => {
    const text = link.host?.replace('www.', '') || link.pathname;
    const isWebsite = link.protocol.startsWith('http');
    const key = isWebsite ? `website-${link.href}` : `tel-${link.href}`;
    const isLastLink = index === arr.length - 1;

    return (
      <Links.ConditionalLink key={key} to={link.href} self={!isWebsite} variant="body1">
        {text}
        {!isLastLink && (
          <Typography component="span" variant="body1">
            ,{' '}
          </Typography>
        )}
      </Links.ConditionalLink>
    );
  });

  return (
    <Styled.PageInfo.LinkWrapper direction="row" alignItems="center" spacing={1}>
      <Typography component="div" variant="body1">
        <Icons.Icon name={iconName} />
      </Typography>
      {phoneLinks}
    </Styled.PageInfo.LinkWrapper>
  );
};

DoctorLinks.defaultProps = {
  links: [],
};

DoctorLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(URL)])),
  iconName: PropTypes.oneOf(Object.values(Icons.ICON_KEYS)).isRequired,
};

export default DoctorLinks;
