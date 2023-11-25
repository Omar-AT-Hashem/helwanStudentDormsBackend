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

async function getTownsBuildings(req, res) {
    try {
      const townsBuildings = await conn.awaitQuery(
        "SELECT * FROM towns INNER JOIN buildings ON towns.id = buildings.townId"
      );

      const towns = await conn.awaitQuery(
        "SELECT * FROM towns"
      )

      const townIds = new Set(townsBuildings.map(building => building.townId))
      let housing = []
      
      townIds.forEach(townId => {
        let currentTown = towns.find(ele => ele.id == townId) 
        let town = {
            id: townId,
            name: currentTown.name,
            buildings: []
        }
        townsBuildings.forEach(building => {
            if(townId == building.townId){
                
                town.buildings.push({id: building.id, name: building.name})
            }
        })
        housing.push(town)
      })
      

      return res.status(200).json(housing);
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

housing.get("/", getHousingData);
housing.get("/get-towns-buildings", getTownsBuildings);

export default housing;
