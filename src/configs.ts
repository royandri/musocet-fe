require("dotenv").config({ path: __dirname + "/../.env" }); //instatiate environment variables


const DEV: string = "development";
const STG: string = "staging";
const PROD: string = "production";

export const SOCKET_HOST: string = process.env.REACT_APP_SOCKET_HOST || "";
