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

// 게임 화면 그리기
const render = Render.create({
  element: document.body,  // 어디에 그릴 것인지
  engine: engine,  // 게임 엔진
  // 게임의 화면 크기
  options: {  
    width: 1000,  
    height: 600,
    wireframes: false,
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

<<<<<<< HEAD


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
const ex = Bodies.circle(100, 500, 20, {  // x좌표 : 700, y좌표 : 300, radius(반지름) : 30
  isStatic: true,  // 움직이지 않도록 고정
  // isSensor: true, // 충돌 감지만 가능하도록 설정
  render: {  // 그리기
    fillStyle: 'transparent',  // 투명 스타일로 지정
    strokeStyle: 'white',  // 선 색상
    lineWidth: 3,  // 선 두께
  }
});

scoreElement.textContent = `Score: ${gamescore}`;
timerElement.textContent = `Timer: ${timer}`; 
World.add(world, [centerGravity,ex]); //[centerGravity, 계속 추가 가능]
=======
const circle = Bodies.circle(200, 300, 100, {
  isStatic: true,
  isSensor: true,
  render: {
    fillStyle: 'rgba(255, 255, 255, 0.2)', // 투명도 조절
    strokeStyle: 'transparent', // 테두리 색상
  }
});


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
World.add(world, [centerGravity,ex1,ex2,ex3, circle]); //[centerGravity, 계속 추가 가능]

>>>>>>> parent of db82035 (5/14 14:54)
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
<<<<<<< HEAD
  // let index = Math.floor(Math.random() * 2);  // 0~2까지 랜덤으로 행성 생성
  let index = 1;
  let planet = PLANETS[index];  // index에는 0~1까지 들어감
=======
  let index = Math.floor(Math.random() * 4); // 행성 인덱스
  let planet = PLANETS[index];
>>>>>>> parent of db82035 (5/14 14:54)

  shootingPlanet = Bodies.circle(200, 300, planet.radius, {
    index: index,
    isStatic: true,  // 행성 고정
    render: {
      sprite: { texture: `./${planet.name}.png` }  // 행성 이미지 경로
    }
  });
  World.add(world, shootingPlanet);
};

<<<<<<< HEAD
  World.add(world, shootingPlanet);
};


const createRocket = () => {
=======

const createRocket = () => {
  
>>>>>>> parent of db82035 (5/14 14:54)
  // 기존 행성이 있으면 제거합니다.
  if (shootingPlanet) {
    World.remove(world, shootingPlanet);
  }

<<<<<<< HEAD
  let index = Math.floor(Math.random() * 1);  // 0~1까지 랜덤으로 행성 생성
=======
  let index = 1;  // 0~1까지 랜덤으로 행성 생성
>>>>>>> parent of db82035 (5/14 14:54)
  let planet = PLANETS[index];  // index에는 0~1까지 들어감

  shootingPlanet = Bodies.circle(200, 300, planet.radius, {
    index: index,
    isStatic: true,  // 행성 고정
    render: {
      sprite: { texture: `./rocket.png` }  // 행성 이미지 경로
    }
  });
<<<<<<< HEAD

  World.add(world, shootingPlanet);
};

window.addEventListener('keydown', (event) => {
  if ((event.key === 'r' || event.key === 'R') && !isDragging && !isShooting) {
    createRocket();  // 'r' 키를 눌렀을 때 행성 새로 생성
  }
});
=======
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

>>>>>>> parent of db82035 (5/14 14:54)
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
<<<<<<< HEAD
    const newPosition = { x: event.clientX, y: event.clientY };

    Body.setPosition(shootingPlanet, {
      x: newPosition.x,
      y: newPosition.y
    });
  }
});

=======
    // 마우스의 새로운 위치
    const newPosition = { x: event.clientX, y: event.clientY };

    // 원의 중심 좌표
    const circleCenterX = circle.position.x;
    const circleCenterY = circle.position.y;

    // 원의 반지름
    const circleRadius = 100;

    // 행성의 새로운 위치와 원의 중심 사이의 거리
    const distanceToCircleCenter = Math.sqrt(
      (newPosition.x - circleCenterX) ** 2 +
      (newPosition.y - circleCenterY) ** 2
    );

    // 행성의 새로운 위치가 원의 경계를 벗어나지 않는지 확인
    if (distanceToCircleCenter <= circleRadius) {
      // 행성의 위치를 새로운 위치로 업데이트
      Body.setPosition(shootingPlanet, newPosition);
    } else {
      // 행성의 위치를 원의 경계에 맞게 조정하여 원 안에 머무르도록 함
      const angle = Math.atan2(newPosition.y - circleCenterY, newPosition.x - circleCenterX);
      const x = circleCenterX + circleRadius * Math.cos(angle);
      const y = circleCenterY + circleRadius * Math.sin(angle);
      Body.setPosition(shootingPlanet, { x, y });
    }
  }
});

// 행성마다 힘의 크기
const forceMultiplier = [0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.007, 0.008, 0.009, 0.01];

>>>>>>> parent of db82035 (5/14 14:54)
// 마우스를 떼면 isDragging = false로 한다.
window.addEventListener('mouseup', (event) => {
  if (isDragging) {
    isShooting = true;  // 드래깅했을 때 슈팅을 true로 한다.
  } else {
<<<<<<< HEAD
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
=======
    return;  // 드래그 중이 아니라면 코드 실행 중지
  }

  // 원의 중심 좌표
  const circleCenterX = circle.position.x;
  const circleCenterY = circle.position.y;

  // 행성의 현재 위치
  const shootingPlanetX = shootingPlanet.position.x;
  const shootingPlanetY = shootingPlanet.position.y;

  // 행성과 원 중심 사이의 거리 계산
  const distanceX = shootingPlanetX - circleCenterX;
  const distanceY = shootingPlanetY - circleCenterY;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // 행성을 발사할 위치 (원의 중심 방향)
  const shootingPosition = {
    x: shootingPlanetX - (distanceX / distance) * shootingPlanet.circleRadius,
    y: shootingPlanetY - (distanceY / distance) * shootingPlanet.circleRadius
  };

  // 행성의 고정 해제
  Body.setStatic(shootingPlanet, false);

  // 행성을 원의 중심 방향으로 발사하기 위한 힘의 방향 계산
  const forceDirection = {
    x: circleCenterX - shootingPosition.x,
    y: circleCenterY - shootingPosition.y
  };

  // 힘을 작용시키는 applyForce 함수
  // 행성의 인덱스에 따라 다른 힘의 크기를 적용합니다.
  const index = shootingPlanet.index;
  const forceMultiplierForPlanet = forceMultiplier[index];
  Body.applyForce(shootingPlanet, shootingPosition, {
    x: forceDirection.x * forceMultiplierForPlanet,  
    y: forceDirection.y * forceMultiplierForPlanet  
>>>>>>> parent of db82035 (5/14 14:54)
  });

  isDragging = false;
  isShooting = false;

  setTimeout(() => {
    createPlanet();
  }, 2500);  // 몇 초 뒤에 행성이 다시 생성되는지 시간 설정
});

<<<<<<< HEAD
=======



>>>>>>> parent of db82035 (5/14 14:54)
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

<<<<<<< HEAD
    // 충돌한 두 물체 중 하나의 텍스처가 'rocket.png'인 경우 && (!centerGravity)
    if (textureA === './rocket.png' || textureB === './rocket.png') {
      World.remove(world, [collision.bodyA, collision.bodyB]);  // 충돌한 두 물체 제거
=======
    // 충돌한 두 물체 중 하나의 텍스처가 'rocket.png'이고 다른 하나가 centerGravity가 아닌 경우
    if (
      (textureA === './rocket.png' && collision.bodyB !== centerGravity) ||
      (textureB === './rocket.png' && collision.bodyA !== centerGravity) ||
      (textureA === './rocket.png' && collision.bodyB !== ex1) &&
      (textureA === './rocket.png' && collision.bodyB !== ex2) &&
      (textureA === './rocket.png' && collision.bodyB !== ex3) 
      
    ) {
      if (collision.bodyA !== circle && collision.bodyB !== circle) {
        World.remove(world, [collision.bodyA, collision.bodyB]);  // 충돌한 두 물체 제거
      } // 충돌한 두 물체 제거
>>>>>>> parent of db82035 (5/14 14:54)
    } else {
      // 충돌한 두 물체의 인덱스가 같은 경우에만 다음 행성을 생성하여 추가합니다.
      if (collision.bodyA.index === collision.bodyB.index) {
        const index = collision.bodyA.index;
<<<<<<< HEAD
        //행성이 합쳐질때 인덱스에 다라 점수를 추가
=======

        //행성이 합쳐질때 인덱스에 띠라 점수를 추가
>>>>>>> parent of db82035 (5/14 14:54)
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

<<<<<<< HEAD
createPlanet();
=======
createPlanet();
>>>>>>> parent of db82035 (5/14 14:54)
