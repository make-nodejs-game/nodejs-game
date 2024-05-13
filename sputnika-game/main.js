import { Engine, Render, Runner, World, Bodies, Body, Events, Composite } from "matter-js";
import { PLANETS } from "./planets";


// 기본 환경 구성
const engine = Engine.create();  // 물리 엔진 정의
const world = engine.world;  // 환경 조성

let gamescore = 0; //게임스코어
let timer = 60; // 초기 제한시간

let fust = false;
let sacund = false;
let serd = false;

engine.gravity.scale = 0;  // 중력의 크기

//투명도 조절
var image = new Image();
image.src = './space.png';

image.onload = function() {
  context.globalAlpha = 0.5; // 투명도 조절
  context.drawImage(image, x, y, width, height);
};

// 게임 화면 그리기
const render = Render.create({
  element: document.body,  // 어디에 그릴 것인지
  engine: engine,  // 게임 엔진
  // 게임의 화면 크기
  options: {  
    width: 1000,  
    height: 600,
    wireframes: false,
    background: './space.png',
  }
});

Render.run(render);  // 렌더 실행
Runner.run(engine);  // 엔진 실행

const scoreElement = document.createElement('div');
scoreElement.style.position = 'absolute';
scoreElement.style.top = '10px';
scoreElement.style.left = '700px';
scoreElement.style.color = 'white';
scoreElement.style.fontSize = '20px';
scoreElement.style.fontWeight = 'bold';
document.body.appendChild(scoreElement);

const timerElement = document.createElement('div');
timerElement.style.position = 'absolute';
timerElement.style.top = '10px';
timerElement.style.left = '900px';
timerElement.style.color = 'white';
timerElement.style.fontSize = '20px';
timerElement.style.fontWeight = 'bold';
document.body.appendChild(timerElement);

// 중력이 모이는 가운에 원 만들기
const centerGravity = Bodies.circle(700, 300, 30, {  // x좌표 : 700, y좌표 : 300, radius(반지름) : 30
  isStatic: true,  // 움직이지 않도록 고정
  // isSensor: true, // 충돌 감지만 가능하도록 설정
  render: {  // 그리기
    fillStyle: 'transparent',  // 투명 스타일로 지정
    strokeStyle: 'white',  // 선 색상
    lineWidth: 3,  // 선 두께
  }
});

// 남은 로켓의 개수를 표시 기능
const ex1 = Bodies.circle(50, 30, 20, {  // x좌표 : 100, y좌표 : 500, radius(반지름) : 20
  isStatic: true,  // 움직이지 않도록 고정
  // isSensor: true, // 충돌 감지만 가능하도록 설정
  angle: Math.PI / 4,  // 45도 회전
  render: {  // 그리기
    sprite: {
      texture: 'rocket.png'  // 로켓 이미지 경로
    }
  }
});
const ex2 = Bodies.circle(100, 30, 20, {  // x좌표 : 150, y좌표 : 500, radius(반지름) : 20
  isStatic: true,  // 움직이지 않도록 고정
  // isSensor: true, // 충돌 감지만 가능하도록 설정
  angle: Math.PI / 4,  // 45도 회전
  render: {  // 그리기
    sprite: {
      texture: 'rocket.png'  // 로켓 이미지 경로
    }
  }
});
const ex3 = Bodies.circle(150, 30, 20, {  // x좌표 : 200, y좌표 : 500, radius(반지름) : 20
  isStatic: true,  // 움직이지 않도록 고정
  // isSensor: true, // 충돌 감지만 가능하도록 설정
  angle: Math.PI / 4,  // 45도 회전
  render: {  // 그리기
    sprite: {
      texture: 'rocket.png'  // 로켓 이미지 경로
    }
  }
});
scoreElement.textContent = `Score: ${gamescore}`;
timerElement.textContent = `Timer: ${timer}`;
World.add(world, [centerGravity,ex1,ex2,ex3]); //[centerGravity, 계속 추가 가능]

//타이머
const countdown = setInterval(() => {
  timer--;  // 타이머 시간 감소
  timerElement.textContent = `Timer: ${timer}`;  // 화면에 타이머 표시

  // 타이머가 0이 되면 타이머 종료
  if (timer === 0) {
    alert("게임오버");
    clearInterval(countdown);
  }
}, 1000);

// 행성 생성하기

let shootingPlanet;  // 플레이어가 쏠 행성
let isDragging = false;  // 행성 드래그
let isShooting = false;  // 행성 쏘기

const createPlanet = () => {
  let index = Math.floor(Math.random() * 4);  // 0~2까지 랜덤으로 행성 생성
  // let index = 7;
  let planet = PLANETS[index];  // index에는 0~1까지 들어감

  shootingPlanet = Bodies.circle(200, 300, planet.radius, {
    index: index,
    isStatic: true,  // 행성 고정
    render: {
      sprite: { texture: `./${planet.name}.png` }  // 행성 이미지 경로
    }
  });
  World.add(world, shootingPlanet);
};


const createRocket = () => {
  
  // 기존 행성이 있으면 제거합니다.
  if (shootingPlanet) {
    World.remove(world, shootingPlanet);
  }

  let index = 1;  // 0~1까지 랜덤으로 행성 생성
  let planet = PLANETS[index];  // index에는 0~1까지 들어감

  shootingPlanet = Bodies.circle(200, 300, planet.radius, {
    index: index,
    isStatic: true,  // 행성 고정
    render: {
      sprite: { texture: `./rocket.png` }  // 행성 이미지 경로
    }
  });
  World.add(world, shootingPlanet);
};

let rKeyPressCount = 0; // "r" 키 입력 횟수 카운터
let RKeyPressCount = 0; // "R" 키 입력 횟수 카운터

let rockets = [ex1, ex2, ex3]; // 로켓들을 배열에 저장

window.addEventListener('keydown', (event) => {
  if ((event.key === 'r' || event.key === 'R') && !isDragging && !isShooting) {
    if (event.key === 'r') {
      rKeyPressCount++; // "r" 키 입력이면 카운터 증가
    } else {
      RKeyPressCount++; // "R" 키 입력이면 카운터 증가
    }

    if (rKeyPressCount + RKeyPressCount <= 3) { // 카운터가 3 이하인 경우에만 로켓 생성
      createRocket();  // 'r' 키를 눌렀을 때 행성 새로 생성

      // "r" 및 "R" 키 입력이 1번 입력될 때마다 ex3, ex2, ex1 순서대로 제거
      if (rKeyPressCount + RKeyPressCount === 1) {
          World.remove(world, ex3);
        } else if (rKeyPressCount + RKeyPressCount === 2){
          World.remove(world, ex2);
        } else if (rKeyPressCount + RKeyPressCount === 3){
          World.remove(world, ex1);
        }
      }
    }
  }
);

// 행성 드래그 이벤트

// 행성 간의 거리 측정
window.addEventListener('mousedown', (event) => {
  // 마우스 좌표
  const mousePosition = {
    x: event.clientX,
    y: event.clientY
  };

  // 행성의 중심과 마우스 좌표의 거리 계산 -> 유클리드 거리
  const distanceToPlanet = Math.sqrt(
    (mousePosition.x - shootingPlanet.position.x) ** 2 +
    (mousePosition.y - shootingPlanet.position.y) ** 2
  );

  // 행성의 중심과 마우스 좌표의 거리가 쏘는 행성의 반지름보다 작으면
  // isDragging = true가 되어 행성을 드래그 할 수 있다.
  if (distanceToPlanet < shootingPlanet.circleRadius) {
    isDragging = true;
    // console.log('click') -> 디버깅 용
  }
});

// isDragging = true 일 경우만 행성이 마우스 포인트를 따라간다.
window.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const newPosition = { x: event.clientX, y: event.clientY };

    Body.setPosition(shootingPlanet, {
      x: newPosition.x,
      y: newPosition.y
    });
  }
});

// 마우스를 떼면 isDragging = false로 한다.
window.addEventListener('mouseup', (event) => {
  if (isDragging) {
    isShooting = true;  // 드래깅했을 때 슈팅을 true로 한다.
  } else {
    return;  // 밑에 코드가 실행되지 않음
  }

  // 마우스를 놓는 위치
  const releasePosition = {
    x: event.clientX,
    y: event.clientY
  };

  // 힘이 작용하는 방향
  const forceDirection = {
    x: 200 - releasePosition.x,
    y: 300 - releasePosition.y
  };

  Body.setStatic(shootingPlanet, false);  // 고정 해제

  // 힘을 작용시키는 applyForce 함수
  Body.applyForce(shootingPlanet, shootingPlanet.position, {
    x: forceDirection.x * 0.0005,  // 뒤에 수치는 힘의 크기 설정
    y: forceDirection.y * 0.0005  // 뒤에 수치는 힘의 크기 설정
  });

  isDragging = false;
  isShooting = false;

  setTimeout(() => {
    createPlanet();
  }, 2500);  // 몇 초 뒤에 행성이 다시 생성되는지 시간 설정
});


// 만유인력의 법칙
Events.on(engine, 'beforeUpdate', (event) => {
  const bodies = Composite.allBodies(world);

  bodies.forEach(body => {
    const dx = centerGravity.position.x - body.position.x;
    const dy = centerGravity.position.y - body.position.y;

    const distanceSquared = dx * dx + dy * dy;
    const forceMagnitude = 0.3 * body.mass / distanceSquared;

    Body.applyForce(body, body.position, {x: forceMagnitude * dx, y: forceMagnitude * dy});
  })
});

Events.on(engine, 'collisionStart', (event) => {
  event.pairs.forEach((collision) => {
    const textureA = collision.bodyA.render.sprite.texture;  // bodyA의 텍스처
    const textureB = collision.bodyB.render.sprite.texture;  // bodyB의 텍스처

    // 충돌한 두 물체 중 하나의 텍스처가 'rocket.png'이고 다른 하나가 centerGravity가 아닌 경우
    if (
      (textureA === './rocket.png' && collision.bodyB !== centerGravity) ||
      (textureB === './rocket.png' && collision.bodyA !== centerGravity) ||
      (textureA === './rocket.png' && collision.bodyB !== ex1) &&
      (textureA === './rocket.png' && collision.bodyB !== ex2) &&
      (textureA === './rocket.png' && collision.bodyB !== ex3)
      
    ) {
      World.remove(world, [collision.bodyA, collision.bodyB]);  // 충돌한 두 물체 제거
    } else {
      // 충돌한 두 물체의 인덱스가 같은 경우에만 다음 행성을 생성하여 추가합니다.
      if (collision.bodyA.index === collision.bodyB.index) {
        const index = collision.bodyA.index;

        //행성이 합쳐질때 인덱스에 띠라 점수를 추가
        switch (collision.bodyA.index){
          case 0:
            gamescore += 1
            break
          case 1:
            gamescore += 3
            break
          case 2:
            gamescore += 6
            break
          case 3:
            gamescore += 10   
            break 
          case 4:
            gamescore += 15
            break
          case 5:
            gamescore += 21
            break
          case 6:
            gamescore += 28
            break
          case 7:
            gamescore += 36  
            break 
          case 8:
            gamescore += 45  
            break
        }
        scoreElement.textContent = `Score: ${gamescore}`;// 업데이트 스코어


        if (index === PLANETS.length - 1) {
          return;
        }
        World.remove(world, [collision.bodyA, collision.bodyB]);
        if (fust==false){
          if (gamescore>=100){
            fust=true;
            timer+=30
          }
          
        }
        if (sacund==false){
          if (sacund>=200){
            fust=true;
            timer+=20
          }
        }
        if (serd==false){
          if (serd>=300){
            fust=true;
            timer+=10
          }
        }

        const newPlanet = PLANETS[index + 1];

        const newBody = Bodies.circle(
          collision.collision.supports[0].x,
          collision.collision.supports[0].y,
          newPlanet.radius,
          {
            index: index + 1,
            render: {
              sprite: { texture: `./${newPlanet.name}.png` }
            }
          }
        );

        World.add(world, newBody);
      }
    }
  });
});

print('추가된 단어2')
createPlanet();
