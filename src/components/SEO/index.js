import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

export const Dynamic = function Dynamic({ title, meta, lang }) {
  return <Helmet title={title} htmlAttributes={{ lang }} meta={meta} />;
};

const lang = import.meta.env.VITE_REACT_APP_DEFAULT_LANGUAGE;

Dynamic.defaultProps = {
  title: 'Zdravniki - Sledilnik',
  meta: [],
  lang,
};

Dynamic.propTypes = {
  title: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, content: PropTypes.string })),
  lang: PropTypes.oneOf(['sl', 'en', 'it']),
};
