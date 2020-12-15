import { Server } from "./Server.js";
import { Chat } from "./Chat.js";
import { Scene } from "./Scene.js";
import { Streaming } from "./Streaming.js";
import { changeText } from "./Scene/changeText.js" 

Server.init();
Chat.init();
Scene.init();
Streaming.init();

document.querySelector("#info").click()
