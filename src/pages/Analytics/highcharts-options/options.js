/** @import * as Types from "../types" */

/** @type {Types.HighchartsOptions["time"]} */
export const time = {
  timezone: 'Europe/Ljubljana',
};

/** @type {Types.HighchartsOptions["lang"]} */
export const lang = {
  accessibility: {
    chartContainerLabel: 'Title: {title}.',
  },
  downloadPDF: 'Prenesi PDF',
  downloadPNG: 'Prenesi PNG',
  downloadJPEG: 'Prenesi JPEG',
  downloadSVG: 'Prenesi SVG',
  printChart: 'Natisni graf',
  resetZoom: 'Ponastavi povečavo',
  viewFullscreen: 'Celozaslonski pogled',
  exitFullscreen: 'Zapri celozaslonski pogled',
  decimalPoint: ',',
  thousandsSep: '.',
  numericSymbols: [' tis.', ' mio.', ' mlrd.', ' t'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'],
  months: [
    'Januar',
    'Februar',
    'Marec',
    'April',
    'Maj',
    'Junij',
    'Julij',
    'Avgust',
    'September',
    'Oktober',
    'November',
    'December',
  ],
  weekdays: ['Nedelja', 'Ponedeljek', 'Torek', 'Sreda', 'Četrtek', 'Petek', 'Sobota'],
  shortWeekdays: ['Ned', 'Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob'],
};

/** @type {Types.HighchartsOptions} */
export const baseOptions = {
  lang,
  time,
  exporting: {
    enabled: false, // it's not working. Fetch error
    menuItemDefinitions: {},
    buttons: {
      contextButton: {
        menuItems: [
          // on mobile full screen does not work, at least not on iOS
          'viewFullscreen',
          'printChart',
          'separator',
          'downloadPNG',
          'downloadJPEG',
          'downloadPDF',
          'downloadSVG',
        ],
      },
    },
    type: ['image/png', 'image/jpeg', 'application/pdf', 'image/svg+xml'],
  },
  chart: {
    className: 'font-sans',
    style: {
      fontFamily: 'inherit',
    },
  },
  credits: { enabled: false },
  legend: { enabled: false },
};

/** @type {React.CSSProperties}  */
export const srOnly = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: '0',
};

/** @type {React.CSSProperties}  */
export const notSrOnly = {
  position: 'absolute',
  width: 'auto',
  height: 'auto',
  padding: '0',
  margin: '0',
  overflow: 'visible',
  clip: 'auto',
  whiteSpace: 'normal',
};

/** @type {Types.HighchartsOptions["chart"]["events"]} */
export const chartEvents = {
  beforePrint() {
    this.update({
      legend: {
        enabled: true,
      },
      title: {
        style: {
          ...notSrOnly,
        },
      },
      subtitle: {
        style: {
          ...notSrOnly,
        },
      },
      caption: {
        style: {
          ...notSrOnly,
        },
      },
    });
  },
  afterPrint() {
    this.update({
      legend: {
        enabled: true,
      },
      title: {
        style: {
          ...srOnly,
        },
      },
      subtitle: {
        style: {
          ...srOnly,
        },
      },
      caption: {
        style: {
          ...srOnly,
        },
      },
    });
  },
  fullscreenOpen() {
    this.update({
      legend: {
        enabled: true,
      },
      title: {
        style: {
          ...notSrOnly,
        },
      },
      subtitle: {
        style: {
          ...notSrOnly,
        },
      },
      caption: {
        style: {
          ...notSrOnly,
        },
      },
    });
  },
  fullscreenClose() {
    this.update({
      legend: {
        enabled: true,
      },
      title: {
        style: {
          ...srOnly,
        },
      },
      subtitle: {
        style: {
          ...srOnly,
        },
      },
      caption: {
        style: {
          ...srOnly,
        },
      },
    });
  },
};

/** @type {Types.HighchartsOptions} */
export const commonOptions = {
  exporting: {
    chartOptions: {
      legend: { enabled: true },
    },
  },
  legend: {
    enabled: true,
    useHTML: true,
  },
  chart: {
    events: { ...chartEvents },
  },
  title: {
    useHTML: true,
    style: {
      ...srOnly,
    },
  },
  subtitle: {
    useHTML: true,
    style: {
      ...srOnly,
    },
  },
  caption: {
    useHTML: true,
    style: {
      ...srOnly,
    },
  },
};

/**
 * @constant
 * @typedef {Object} Dimensions - Dimensions for responsive design.
 * @property {Object} breakpoints - Breakpoints for responsive design.
 * @property {670} breakpoints.sm - Breakpoint for small devices.
 * @property {Object} height - Height for different devices.
 * @property {600} height.sm - Height for small devices.
 * @property {"56.25%"} height.md - Height for medium devices.
 */

/** @type {Dimensions} */
export const dimensions = {
  breakpoints: {
    sm: 670,
  },
  height: {
    sm: 600,
    md: `${(9 / 16) * 100}%`,
  },
};
