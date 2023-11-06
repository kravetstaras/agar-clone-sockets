const checkForOrbCollisions = (pData, pConfig, orbs, settings) => {
  for (let i = 0; i < orbs.length; i++) {
    const orb = orbs[i];
    if (
      pData.locX + pData.radius + orb.radius > orb.locX &&
      pData.locX < orb.locX + pData.radius + orb.radius &&
      pData.locY + pData.radius + orb.radius > orb.locY &&
      pData.locY < orb.locY + pData.radius + orb.radius
    ) {
      distance = Math.sqrt(
        (pData.locX - orb.locX) * (pData.locX - orb.locX) +
          (pData.locY - orb.locY) * (pData.locY - orb.locY),
      );
      if (distance < pData.radius + orb.radius) {
        pData.score += 1;
        pData.orbsAbsorbed += 1;
        if (pConfig.zoom > 1) {
          pConfig.zoom -= 0.001;
        }
        pData.radius += 0.05;
        if (pConfig.speed < -0.005) {
          pConfig.speed += 0.005;
        } else if (pConfig.speed > 0.005) {
          pConfig.speed -= 0.005;
        }
        return i;
        break;
      }
    }
  }
  return null;
};

const checkForPlayerCollisions = (
  pData,
  pConfig,
  players,
  playersForUsers,
  playerId,
) => {
  //PLAYER COLLISIONS
  for (let i = 0; i < players.length; i++) {
    const p = players[i];
    if (p.socketId && p.socketId != playerId) {
      //Added p.socketId test in case player has been removed from players
      let pLocx = p.playerData.locX;
      let pLocy = p.playerData.locY;
      let pR = p.playerData.radius;
      // AABB Test - Axis-aligned bounding boxes
      if (
        pData.locX + pData.radius + pR > pLocx &&
        pData.locX < pLocx + pData.radius + pR &&
        pData.locY + pData.radius + pR > pLocy &&
        pData.locY < pLocy + pData.radius + pR
      ) {
        // console.log("Hit square test!");
        // Pythagoras test
        distance = Math.sqrt(
          (pData.locX - pLocx) * (pData.locX - pLocx) +
            (pData.locY - pLocy) * (pData.locY - pLocy),
        );
        if (distance < pData.radius + pR) {
          //COLLISION!!
          if (pData.radius > pR) {
            // ENEMY DEATH
            pData.score += p.playerData.score + 10;
            pData.playersAbsorbed += 1;
            p.alive = false;
            pData.radius += p.playerData.radius * 0.25;
            const collisionData = {
              absorbed: p.playerData.name,
              absorbedBy: pData.name,
            };

            if (pConfig.zoom > 1) {
              pConfig.zoom -= pR * 0.25 * 0.001;
            }
            players.splice(i, 1, {}); //remove player from server players array
            playersForUsers.splice(i, 1, {}); //remove player from players array used by clients
            return collisionData; //essentially a return statement (because I could't get it work without a promise?)
            break;
          }

          //This code could check to see if it the player who tocked was hit.
          //It is commented out since the above code should run on the other player's tock
          //In other words, we only need to consider it a "death" on the attacking players turn
          // else if(pData.radius < pR){ }
        }
      }
    }
  }
  return null;
};

module.exports = { checkForOrbCollisions, checkForPlayerCollisions };
