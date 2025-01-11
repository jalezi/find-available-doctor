/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/** @import * as Types from "../../types" */

import React, { forwardRef, useEffect, useState } from 'react';

import HighchartsReact from 'highcharts-react-official';

/**
 * HighchartReactComponent
 *
 * @type {React.ForwardRefExoticComponent<
 *   Types.HighchartsReactProps
 *   React.RefAttributes<Types.HighchartsReactRefObject
 *  >
 * >}
 */
const HighchartsReactComponent = forwardRef((props, ref) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      setInit(true);
    }
  }, [init]);

  return <HighchartsReact ref={ref} {...props} />;
});

HighchartsReactComponent.displayName = 'HighchartReactComponent';

export default HighchartsReactComponent;
