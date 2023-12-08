import { Router } from "express";

import conn from "../../../config/db.js";

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateToken from "../../../middleware/authenticateToken.js";

dotenv.config();

const housing = Router();

const tokenSecret = process.env.TOKEN_SECRET;
const saltRounds = parseInt(process.env.SALT_ROUNDS);

async function getHousingData(req, res) {
  try {
    const housing = await conn.awaitQuery(
      "SELECT * FROM towns INNER JOIN buildings ON towns.id = buildings.townId INNER JOIN floors ON buildings.id = floors.buildingId INNER JOIN rooms ON floors.id = rooms.floorId INNER JOIN beds ON rooms.id = beds.roomId;"
    );
    return res.status(200).json(housing);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

// ------------------------------------------------------------------------------

// async function getTownsBuildings(req, res) {
//   try {
//     const townsBuildings = await conn.awaitQuery(
//       "SELECT * FROM towns INNER JOIN buildings ON towns.id = buildings.townId"
//     );

//     const towns = await conn.awaitQuery("SELECT * FROM towns");

//     const townIds = new Set(townsBuildings.map((building) => building.townId));
//     let housing = [];

//     townIds.forEach((townId) => {
//       let currentTown = towns.find((ele) => ele.id == townId);
//       let town = {
//         id: townId,
//         name: currentTown.name,
//         buildings: [],
//       };
//       townsBuildings.forEach((building) => {
//         if (townId == building.townId) {
//           town.buildings.push({ id: building.id, name: building.name });
//         }
//       });
//       housing.push(town);
//     });

//     return res.status(200).json(housing);
//   } catch (err) {
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// }

// ------------------------------------------------------------------------------

async function getTownsBuildingsFloors(req, res) {
  try {
    const townsFloors = await conn.awaitQuery(
      "SELECT * FROM towns INNER JOIN buildings ON towns.id = buildings.townId INNER JOIN floors ON buildings.id = floors.buildingId"
    );

    const towns = await conn.awaitQuery("SELECT * FROM towns");
    const buildings = await conn.awaitQuery("SELECT * FROM buildings");

    // creates a set with unique IDs for buildings and towns
    const townIds = new Set(townsFloors.map((floor) => floor.townId));
    const buildingIds = new Set(townsFloors.map((floor) => floor.buildingId));

    let housing = [];

    // starts to build the data structure to carry towns, buildings, and floors
    townIds.forEach((townId) => {
      let currentTown = towns.find((ele) => ele.id == townId);
      //town data structure
      let town = {
        id: townId,
        name: currentTown.name,
        buildings: [],
      };
      buildingIds.forEach((buildingId) => {
        // finds the data for the current building
        let currentBuilding = buildings.find((ele) => ele.id == buildingId);

        if (currentBuilding && currentBuilding.townId == townId) {
          // building data structure
          let building = {
            id: buildingId,
            name: currentBuilding.name,
            floors: [],
          };
          townsFloors.forEach((floor) => {
            if (floor.buildingId == buildingId) {
              building.floors.push({ id: floor.id, number: floor.number });
            }
          });
          town.buildings.push(building);
        }
      });
      housing.push(town);
    });
    return res.status(200).json(housing);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

// ------------------------------------------------------------------------------

async function getFloorRoomsBeds(req, res) {
  try {
    const { floorId } = req.params;
    const roomsBeds = await conn.awaitQuery(
      "SELECT * FROM rooms INNER JOIN beds ON rooms.id = beds.roomId WHERE floorId = ? ",
      [floorId]
    );

    const rooms = await conn.awaitQuery("SELECT * FROM rooms");

    const roomIds = new Set(roomsBeds.map((bed) => bed.roomId));
    let housing = [];

    roomIds.forEach((roomId) => {
      let currentRoom = rooms.find((ele) => ele.id == roomId);
      let room = {
        id: roomId,
        number: currentRoom.number,
        beds: [],
      };
      roomsBeds.forEach((bed) => {
        if (roomId == bed.roomId) {
          room.beds.push({
            id: bed.id,
            number: bed.number,
            isOccupied: bed.isOccupied,
            occupant: bed.occupant,
          });
        }
      });
      housing.push(room);
    });

    return res.status(200).json(housing);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

// ------------------------------------------------------------------------------

housing.get("/", getHousingData);
// housing.get("/get-towns-buildings", getTownsBuildings);
housing.get("/towns-buildings-floors", getTownsBuildingsFloors);
housing.get("/floor-rooms-beds/:floorId", getFloorRoomsBeds);

export default housing;
