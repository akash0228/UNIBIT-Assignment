import express from "express";
import { login, registerUser } from "../controller/user-controller.js";
import { generateTicket, getTickets } from "../controller/ticket-controller.js";

const route=express.Router();

route.post('/register',registerUser);
route.post('/login',login);
route.post('/generateTicket',generateTicket);
route.get('/getTicket/:id',getTickets);


export default route;