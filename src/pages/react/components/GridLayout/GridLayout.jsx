// 基础模块
import React from 'react';

// 第三方组件
import GridLayout, { WidthProvider } from 'react-grid-layout';

const GridLayoutWidthProvider = WidthProvider(GridLayout);

export const defaultProps = {
  cols: 24,
  rowHeight: 50, // itemHeight: Math.round(rowHeight * h + Math.max(0, h - 1) * margin[1])
  margin: [ 16, 16 ],
  containerPadding: [ 0, 0 ],
};

export default ({
  layout,
  cols = defaultProps.cols,
  rowHeight = defaultProps.rowHeight,
  margin = defaultProps.margin,
  containerPadding = defaultProps.containerPadding,
  children,
  ...restProps
}) => (
  <GridLayoutWidthProvider
    layout={layout}
    cols={cols}
    rowHeight={rowHeight}
    margin={margin}
    containerPadding={containerPadding}
    {...restProps}
  >
    {children}
  </GridLayoutWidthProvider>
);
