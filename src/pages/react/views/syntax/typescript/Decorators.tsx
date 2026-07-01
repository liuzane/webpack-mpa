// 基础模块
import React, { Component } from 'react';

// 公共组件
import HighlightCode from '@-react/components/Highlight';

const code: string = `
interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
}

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

function first() {
  console.log('first(): factory evaluated');
  return function (target: any, propertyKey: string) {
    console.log('first(): called, target:', target, ', propertyKey:' + propertyKey);
  };
}
 
function second() {
  console.log('second(): factory evaluated');
  return function (target: any, propertyKey: string) {
    console.log('second(): called, target:', target, ', propertyKey:' + propertyKey);
  };
}

function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const oldValue: any = descriptor.value;

  descriptor.value = function<T>(...arg: T[]): T {
    console.log(\`Log calling \${propertyKey} with:\`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('enumerable() called, target:', target, ', propertyKey:' + propertyKey + ', descriptor:', descriptor);
    descriptor.enumerable = value;
  };
}


@sealed
class Decorators extends Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  @first()
  @second()

  myName: string;
  
  @enumerable(false)
  getMyName(): string {
    return this.myName;
  }

  @log
  setMyName(myName: string): void {
    this.myName = myName;
  }
  
  onChange(event: any): void {
    this.setMyName(event.target.value);
  }

  render () {
    return (
      <div>
        <h3>Decorators</h3>
        <label id="name-label" htmlFor="name-input">Name:</label>
        <input 
          id="name-input" 
          aria-labelledby="name-label"
          type="text" 
          onChange={ this.onChange.bind(this) }
        />
        <p>Code: </p>
        <HighlightCode code={ code } />
      </div>
    );
  }
}
`;


interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
}

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

function first() {
  // console.log('first(): factory evaluated');
  return function (target: any, propertyKey: string) {
    // console.log('first(): called, target:', target, ', propertyKey:' + propertyKey);
  };
}
 
function second() {
  // console.log('second(): factory evaluated');
  return function (target: any, propertyKey: string) {
    // console.log('second(): called, target:', target, ', propertyKey:' + propertyKey);
  };
}

function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const oldValue: any = descriptor.value;

  descriptor.value = function<T>(...arg: T[]): T {
    // console.log(`Log calling ${propertyKey} with:`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // console.log('enumerable() called, target:', target, ', propertyKey:' + propertyKey + ', descriptor:', descriptor);
    descriptor.enumerable = value;
  };
}


@sealed
class Decorators extends Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  @first()
  @second()

  myName: string;
  
  @enumerable(false)
  getMyName(): string {
    return this.myName;
  }

  @log
  setMyName(myName: string): void {
    this.myName = myName;
  }
  
  onChange(event: any): void {
    this.setMyName(event.target.value);
  }

  render () {
    return (
      <div>
        <h3>Decorators</h3>
        <label id="name-label" htmlFor="name-input">Name:</label>
        <input 
          id="name-input" 
          aria-labelledby="name-label"
          type="text" 
          onChange={ this.onChange.bind(this) }
        />
        <HighlightCode language="typescript" code={ code } />
      </div>
    );
  }
}

export default Decorators;