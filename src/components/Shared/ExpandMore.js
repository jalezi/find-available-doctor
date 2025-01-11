import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

const ExpandMoreButton = styled(({ _expand, ...other }) => <IconButton {...other} />)(
  ({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }),
);

const ExpandMore = function ExpandMore({ expand, ...other }) {
  return (
    <ExpandMoreButton expand={expand} {...other}>
      <ExpandMoreIcon />
    </ExpandMoreButton>
  );
};

ExpandMore.propTypes = {
  expand: PropTypes.bool.isRequired,
};

export default ExpandMore;
