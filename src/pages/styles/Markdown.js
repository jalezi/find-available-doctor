import { styled } from '@mui/material/styles';
import MarkdownBase from 'markdown-to-jsx';
import iconExpand from '@/assets/expand-dd.svg';
import iconClose from '@/assets/close-dd.svg';
import iconCheck from '@/assets/check.svg';
import iconCopy from '@/assets/icon-copy.svg';

export const IconWrapper = styled('span')(() => ({
  width: '28px',
  cursor: 'pointer',
  padding: '5px',
  position: 'absolute',
  top: '-3px',
  right: '30px',
  zIndex: 10,
}));

// Names of CustomContainer and StaticPageWrapper matches classes from 'style.scss'
export const CustomContainer = styled('main')(({ theme }) => ({
  margin: '24px auto 0 auto',
  maxWidth: '730px',
  background: theme.palette.common.white,
  '@media only screen and (min-width: 768px)': {
    margin: '48px auto 65px auto',
    boxShadow: theme.MD.elementBoxShadow,
  },
}));

export const StaticPageWrapper = styled('div')(({ theme }) => ({
  fontSize: '14px',
  padding: '32px 17px 27px 17px',

  '@media only screen and (min-width: 768px)': {
    margin: '32px 32px 27px 32px',
  },

  h1: { marginBottom: '32px', fontSize: '28px' },

  'h2, h3, h4': {
    marginBottom: '24px',
  },

  h2: { fontSize: '21px' },
  h3: { fontSize: '18px' },

  'p:not(:last-of-type)': {
    marginBottom: '28px',
  },

  'ul, ol': { paddingInlineStart: '40px', fontSize: '14px', marginBottom: '1rem' },

  'h1 + p > em': {
    display: 'block',
    fontSize: '16px',
    fontStyle: 'italic',
    color: theme.MD.linkColor,
    fontWeight: 400,
    lineHeight: 1.7,
    marginBottom: '48px',
    a: { fontSize: '16px' },
  },

  'p, a, span, strong': {
    fontSize: '14px',
    color: theme.MD.textColor,
    lineHeight: 1.7,
  },

  '* + h1, * + h2, * + h3': {
    marginTop: '48px',
  },

  a: {
    color: theme.MD.linkColor,
    fontWeight: 600,
    transition: 'all 0.35s ease-in-out',
    boxShadow: theme.MD.linkBoxShadow,
    textDecoration: 'none',

    '&:hover': {
      color: theme.MD.linkColor,
      fontWeight: 600,
      boxShadow: theme.MD.linkBoxShadowHover,
      textDecoration: 'none',
    },
    strong: { fontWeight: 600 },
  },

  'span[data-term]': {
    position: 'relative',
    display: 'inline-flex',
    justifyContent: 'center',
    outline: 'none',
    cursor: 'help',
    fontWeight: 600,
    transition: 'all 0.35s ease-in-out',
    color: 'rgba(0, 0, 0, 0.8)',

    '&:before ': {
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '-2px',
      borderBottom: `2px ${theme.customColors.brand} dotted`,
      zIndex: 1,
    },

    '&:hover::after': {
      content: 'attr(data-definition)',
      position: 'absolute',
      top: '90%',
      width: '100px',
      backgroundColor: theme.MD.dataTermBcgColor,
      color: 'white',
      border: '1px solid',
      padding: '3px 6px',
      margin: '10px',
      fontSize: '10px',
      fontWeight: 200,
      lineHeight: 1.4,
      zIndex: 2,
    },
  },

  '@media (pointer: coarse), (hover: none)': {
    'span[data-term]': {
      position: 'relative',
      display: 'inline-flex',
      justifyContent: 'center',
      outline: 'none',
    },
    'span[data-term]:focus::after': {
      content: 'attr(title)',
      position: 'absolute',
      top: '90%',
      width: '100px',
      backgroundColor: theme.MD.dataTermBcgColor,
      color: 'white',
      border: '1px solid',
      padding: '3px 6px',
      margin: '10px',
      fontSize: '10px',
      fontWeight: 200,
      lineHeight: 1.4,
      zIndex: 1,
    },
  },

  'tr + tr': {
    marginTop: '27px',
  },
  table: {
    width: '100%',
    tableLayout: 'fixed',
    textAlign: 'left',
    marginBottom: '1rem',
    td: {
      padding: '15px 0',
      width: '50%',
      borderTop: `1px solid ${theme.MD.tableTdBorder}`,
    },
  },

  '@keyframes show-dd': {
    from: {
      transform: 'translateY(-8px)',
      opacity: 0.1,
    },
    to: {
      transform: 'translateY(0px)',
      opacity: 1,
    },
  },
}));

export const Collapsable = styled('div')(() => ({
  position: 'relative',
  fontSize: 'inherit',
  '.icon': {
    width: '28px',
    cursor: 'pointer',
    padding: '5px',
    position: 'absolute',
    top: '-3px',
    right: '30px',
    zIndex: 10,
    '&.copy': {
      content: `url(${iconCopy})`,
    },
    '&.check': {
      content: `url(${iconCheck})`,
    },
  },
}));

// !todo remove Markdown after everything is merged and use in MarkdownBase in  FAQ and About page
export const Markdown = styled(MarkdownBase)(() => ({}));

export const Details = styled('details')(() => ({
  fontSize: 'inherit',
  marginBottom: '24px',
  '> *:not(summary)': {
    position: 'relative',
    display: 'none',
    width: '90%',
  },

  '&[open]': {
    '> *:not(summary)': {
      display: 'block',
      animation: 'show-dd 0.5s ease-out',
    },
    'summary::after': {
      content: `url(${iconClose})`,
    },
  },
}));

export const Summary = styled('summary')(({ theme }) => ({
  cursor: 'pointer',
  userSelect: 'none',
  fontSize: 'inherit',
  fontWeight: 'bold',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 1.71,
  color: theme.MD.summaryColor,
  position: 'relative',
  paddingRight: '18%',
  '+ *:nth-of-type(1)': {
    marginTop: '2px',
    paddingTop: '12px',
  },
  '@media only screen and (min-width: 768px)': {
    paddingRight: '10%',
  },
  '::marker, ::-webkit-details-marker': {
    display: 'none',
    content: '""',
  },
  '::after': {
    content: `url(${iconExpand})`,
    display: 'block',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  '$:focus': {
    outline: 'none',
  },
}));
