
# nodejs-auth-ts
authentication server written by Typescript

---
## project setup
typescript코드를 javascript 코드로 compile하여 express서버 코드를 작성하기위하여,
ts compile에 필요한 설정을 지정하는 tsconfig.json을 작성한다.

$ npm init -y  // package.json 설정
$ npm install typescript --save -dev // ts compiler 설치

$ node_modules/.bin/tsc 
위 명령어를 사용해 ts파일이 js파일로 transpile 이 되는지 확인한다. 
js파일이 만들어지면 typescript 컴파일러가 정상적으로 설치된 것이다. 

하지만, 이렇게 매번 명령어를 통해서 compile 하는것은 불편하므로, 
webpack을 사용해서 자동화를 해보도록 하자.

먼저, webpack을 설치한다. 

$ npm install -g webpack --save -dev

---
## express config
$ npm install express@4.14.0 debug@2.2.0 --save
debug 모듈은 개발시에 terminal에 output을 nice 하게 한다.

typescript에서 jquery와 같은 3rd party package를 사용하게 되면, typescript컴파일러는
module의 정보를 알지 못한다. 그래서 ts compiler에게 module 사용에 대한 정보를 제공해 주어야 한다.
(TypeScript는 MS에서 개발한 JavaScript 슈퍼셋 언어다. 이 TypeScript를 사용하면 정적 검사를 활용할 수 있어 개발에 많은 편의를 제공한다. 물론 기존에 있던 JavaScript 라이브러리에 대해서도 정적 검사를 수행하려면 해당 라이브러리도 정의 파일, 다시 말해 타입 검사를 위한 인터페이스를 제공해야 한다. 그래서 나온 프로젝트가 DefinitelyTyped인데 TypeScript의 타입 정의를 제공하는 리포지터리 서비스다. 사용하는 라이브러리의 인터페이스가 이 리포지터리에 등록되어 있다면 손쉽게 내려받아 그 정의를 사용할 수 있다.) 

<Typescript2.0 이전>
에는 tsd라는 Typescript의 정의 관리 도구를 사용했다.

tsd install 
$ npm install tsd -g

install 3rd party package
$ tsd install jquery --save
$ tsd query angular -ir
$ tsd query angularjs/
$ tsd query jquery.*

#install all definitions from tsd.json
$ tsd install

tsd.json에는 메타정보가 관리되고, 라이브러리의 인터페이스 정의는 typings에 저장된다. 
typings 하위폴더에 각 라이브러리에 대한 인터페이스 정의 파일이 존재한다. 

ts파일에서 각각의 라이브러리를 사용하기 위해서는
/// <reference path="jquery/jquery.d.ts" />
/// <reference path="../bower_components/angular/angular.d.ts" />
같은 선언을 해주어야 사용할 수 있었다.

<Typescript2.0 이후>
typescript사용을 위한 정적타입에 대한 정의는 npm으로 관리가 가능해졌다. 
@types/module_name 으로 모듈에 대한 인터페이스(type definition) 정의를 설치하면 된다. 

typescript type definition 모듈이 있는 리스트 ?
[npm @types](https://www.npmjs.com/~types)

$ npm install @types/node@6.0.46 @types/express@4.0.33 @types/debug@0.0.29 --save-dev
ts파일에서 각각의 라이브러리를 사용하기 위해서는 import를 사용하면 된다.
import * as path from 'path';

---
## TDD with Typescript
Mocha 랑 Chai를 사용해서 Typescript를 사용하여 Test Code를 짜보고자 한다. 
~~~
$ npm install mocha@3.1.2 chai@3.5.0 chai-http@3.0.0 --save-dev
$ npm install @types/mocha@2.2.32 @types/chai@3.4.34 @types/chai-http@0.0.29 --save-dev
~~~
만약에 test코드를 .ts파일로 작성한다면, Mocha에서 .ts를 인식할 수 있어야 하는데, 이를 해결하기 위한 몇가지 방법이 있다.
그 중에서 간단하게 ts-node 모듈을 설치하면, <U>.ts파일의 transpiling 없이 .ts를 해석할 수 있게 해준다.</U>
ts-node는 runtime에 .ts를 해석하고 transpiling을 해준다.
~~~
$ npm install ts-node@1.6.1 --save-dev
~~~

package.json에 ts-node를 사용하여 mocha를 실행하기 위한 test script를 정의한다.
~~~
"scripts": {
  "start": "node dist/index.js",
  "test": "mocha --reporter spec --compilers ts:ts-node/register test/**/*.test.ts"
},
~~~

test 코드 작성 후 npm test를 실행하면 test가 실행되는 것을 확인 할 수 있다.