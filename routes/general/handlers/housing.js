import { Router } from "express";

import conn from "../../../config/db.js";

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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

    let housing = [];

    // starts to build the data structure to carry towns, buildings, and floors
    towns.forEach((town) => {
      //town data structure
      let townToBeAdded = {
        id: town.id,
        name: town.name,
        buildings: [],
      };
      buildings.forEach((building) => {
        // finds the data for the current building

        if (building.townId == town.id) {
          // building data structure
          let occupied = false;
          let buildingToBeAdded = {
            id: building.id,
            name: building.name,
            type: building.type,
            buildingOccupied: false,
            floors: [],
          };
          townsFloors.forEach((floor) => {
            if (floor.buildingId == building.id) {
              buildingToBeAdded.floors.push({
                id: floor.id,
                number: floor.number,
                floorOccupied: floor.floorOccupied,
              });
              if (floor.floorOccupied == true) {
                occupied = true;
              }
            }
          });
          buildingToBeAdded.buildingOccupied = occupied;
          townToBeAdded.buildings.push(buildingToBeAdded);
        }
      });
      housing.push(townToBeAdded);
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
        type: currentRoom.type,
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

async function traceStudentHousing(req, res) {
  try {
    const { studentId } = req.params;
    const bed = await conn.awaitQuery("SELECT * FROM beds WHERE occupant = ?", [
      studentId,
    ]);

    if (bed.length > 0) {
      const room = await conn.awaitQuery("SELECT * FROM rooms WHERE id = ?", [
        bed[0].roomId,
      ]);

      const floor = await conn.awaitQuery("SELECT * FROM floors WHERE id = ?", [
        room[0].floorId,
      ]);

      const building = await conn.awaitQuery(
        "SELECT * FROM buildings WHERE id = ?",
        [floor[0].buildingId]
      );

      const town = await conn.awaitQuery("SELECT * FROM towns WHERE id = ?", [
        building[0].townId,
      ]);
      return res.status(200).json({
        town: town[0],
        building: building[0],
        floor: floor[0],
        room: room[0],
        bed: bed[0],
        message: "found",
      });
    }
    return res.status(200).json({ message: "not found" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

// ------------------------------------------------------------------------------

housing.get("/", getHousingData);
housing.get("/towns-buildings-floors", getTownsBuildingsFloors);
housing.get("/floor-rooms-beds/:floorId", getFloorRoomsBeds);
housing.get("/trace-student/:studentId", traceStudentHousing);

export default housing;
