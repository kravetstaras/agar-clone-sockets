const init = () => {
  console.log(orbs);
  draw();
};

const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.setTransform(1, 0, 0, 1, 0, 0);

  const camX = -player.locX + canvas.width / 2;
  const camY = -player.locY + canvas.height / 2;
  context.translate(camX, camY);

  let randomX = Math.floor(500 * Math.random() + 10);
  let randomY = Math.floor(500 * Math.random() + 10);

  context.beginPath();
  context.fillStyle = 'rgb(255,0,0)';
  context.arc(randomX, randomY, 10, 0, Math.PI * 2);
  context.arc(200, 200, 10, 0, Math.PI * 2);
  context.fill();
  context.lineWidth = 3;
  context.strokeStyle = 'rgb(0,255,0)';
  context.stroke();

  orbs.forEach(orb => {
    context.beginPath();
    context.fillStyle = orb.color;
    context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2);
    context.fill();
  });

  requestAnimationFrame(draw);
};

canvas.addEventListener('mousemove', event => {
  const mousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
  const angleDeg =
    (Math.atan2(
      mousePosition.y - canvas.height / 2,
      mousePosition.x - canvas.width / 2,
    ) *
      180) /
    Math.PI;
  if (angleDeg >= 0 && angleDeg < 90) {
    xVector = 1 - angleDeg / 90;
    yVector = -(angleDeg / 90);
    console.log('Mouse is in the lower right quardrant');
  } else if (angleDeg >= 90 && angleDeg <= 180) {
    xVector = -(angleDeg - 90) / 90;
    yVector = -(1 - (angleDeg - 90) / 90);
    console.log('Mouse is in the lower left quardrant');
  } else if (angleDeg >= -180 && angleDeg < -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 + (angleDeg + 90) / 90;
    console.log('Mouse is in the top left quardrant');
  } else if (angleDeg < 0 && angleDeg >= -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 - (angleDeg + 90) / 90;
    console.log('Mouse is in the top right quardrant');
  }

  player.xVector = xVector ? xVector : 0.1;
  player.yVector = yVector ? yVector : 0.1;
});