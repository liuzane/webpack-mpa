// 基础模块
import React from 'react';

// 第三方模块
import Loadable from 'react-loadable';
import NProgress from 'nprogress';


// Loading
const loading = props => {
  if (props.error) {
    return (
      <div>
        <pre>{props.error.message}</pre>
        <button onClick={ props.retry }>Retry</button>
      </div>
    );
  } else if (props.timedOut) {
    return (
      <div>
        <p>Taking a long time...</p>
        <button onClick={ props.retry }>Retry</button>
      </div>
    );
  } else if (props.pastDelay) {
    NProgress.start();
    return (<div>Loading...</div>);
  } else {
    return null;
  }
};

const render = (loaded, props) => {
  NProgress.done();
  return (<loaded.default { ...props } />);
};


// 异步加载
const AsyncLoad = loader => Loadable({
  loader,
  loading,
  render,
  timedOut: 60000,
});

export default AsyncLoad;