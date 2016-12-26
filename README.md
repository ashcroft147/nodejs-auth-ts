# nodejs-auth-ts
authentication server written by Typescript

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

## express config
$ npm install express@4.14.0 debug@2.2.0 --save
debug 모듈은 개발시에 terminal에 output을 nice 하게 한다.

typescript에서 jquery와 같은 3rd party package를 사용하게 되면, typescript컴파일러는
module의 정보를 알지 못한다. 그래서 compiler에게 module의 structure 