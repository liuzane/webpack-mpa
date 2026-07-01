// 基础模块
import React, { Component } from 'react';

// 公共组件
import HighlightCode from '@-react/components/Highlight';

const code: string = `
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let output = identity<string>('myString');

let myIdentity: GenericIdentityFn<number> = identity;

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, 'a');
// getProperty(x, "m");

class Generics extends Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  render () {
    return (
      <div>
        <h3>Generics</h3>
      </div>
    );
  }
}
`;

interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let output = identity<string>('myString');

let myIdentity: GenericIdentityFn<number> = identity;

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, 'a');
// getProperty(x, "m");

class Generics extends Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  render () {
    return (
      <div>
        <h3>Generics</h3>
        <HighlightCode language="typescript" code={ code } />
      </div>
    );
  }
}

export default Generics;