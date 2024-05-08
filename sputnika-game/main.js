import { Engine, Render, Runner, World, Bodies, Body, Events, Composite } from "matter-js";
import { PLANETS } from "./planets";


// 기본 환경 구성
const engine = Engine.create();  // 물리 엔진 정의
const world = engine.world;  // 환경 조성

engine.gravity.scale = 0.  // 중력의 크기

// 1. 게임 화면 그리기
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

// 2. 중력이 모이는 가운에 원 만들기
const centerGravity = Bodies.circle(700, 300, 30, {  // x좌표 : 700, y좌표 : 300, radius(반지름) : 30
  isStatic: true,  // 움직이지 않도록 고정
  render: {  // 그리기
    fillStyle: 'transparent',  // 투명 스타일로 지정
    strokeStyle: 'white',  // 선 색상
    lineWidth: 3,  // 선 두께
  }
});

World.add(world, [centerGravity]);


// 3. 행성 생성하기

let shootingPlanet;  // 플레이어가 쏠 행성
let isDragging = false;  // 행성 드래그
let isShooting = false;  // 행성 쏘기

const createPlanet = () => {
  const index = Math.floor(Math.random() * 2);  // 랜덤으로 행성 생성
  const planet = PLANETS[index];  // index에는 0~1까지 들어감

  shootingPlanet = Bodies.circle(200, 300, planet.radius, {
    index: index,
    isStatic: true,  // 행성 고정
    render: {
      sprite: { texture: `./${planet.name}.png` }  // 행성 이미지 경로
    }
  });

  World.add(world, shootingPlanet);
};

// 4. 행성 드래그 이벤트

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
  }, 2000);  // 몇 초 뒤에 행성이 다시 생성되는지 시간 설정
});


// 5. 만유인력의 법칙

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
    if (collision.bodyA.index === collision.bodyB.index) {
      const index = collision.bodyA.index;

      if (index === PLANETS.length - 1) {
        return;
      }

      World.remove(world, [collision.bodyA, collision.bodyB]);

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
  });
});

createPlanet();