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

async function getTownsBuildingsFloors(req, res) {
  try {
    let townsFloors = await conn.awaitQuery(
      "SELECT * FROM towns INNER JOIN buildings ON towns.id = buildings.townId INNER JOIN floors ON buildings.id = floors.buildingId"
    );

    let rooms = await conn.awaitQuery("SELECT * FROM rooms");

    let beds = await conn.awaitQuery("SELECT * FROM beds");

    townsFloors = townsFloors.map((floor) => {
      let currentFloorInfo = { ...floor, floorOccupied: false };

      rooms.forEach((room) => {
        if (room.floorId == floor.id) {
          beds.forEach((bed) => {
            if (bed.roomId == room.id) {
              if (bed.isOccupied == 1) {
                currentFloorInfo = { ...currentFloorInfo, floorOccupied: true };
              }
            }
          });
        }
      });
      return { ...currentFloorInfo };
    });

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
          let occupied = false;
          let building = {
            id: buildingId,
            name: currentBuilding.name,
            buildingOccupied: false,
            floors: [],
          };
          townsFloors.forEach((floor) => {
            if (floor.buildingId == buildingId) {
              building.floors.push({
                id: floor.id,
                number: floor.number,
                floorOccupied: floor.floorOccupied,
              });
              if (floor.floorOccupied == true) {
                occupied = true;
              }
            }
          });
          building.buildingOccupied = occupied;
          town.buildings.push(building);
        }
      });
      housing.push(town);
    });

    // housing = housing.map(town => {
    //   town.buildings.forEach(building => {
    //     let buildingOccupied = false
    //     building.floor
    //   })
    // })

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

    const rooms = await conn.awaitQuery(
      "SELECT * FROM rooms Where floorId = ?",
      [floorId]
    );

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

    rooms.forEach((room) => {
      if (!housing.find((ele) => ele.id == room.id)) {
        housing.push({ ...room, beds: [] });
      }
    });

    housing = housing.sort((a, b) => a.number - b.number);

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
