import { Users } from "./Users.js";
import { checkChat } from "./Validation.js";
export const Chat = {
    init: function () {
    },
    send: function (msg) {
        if (!checkChat(msg))
            return false;

	    let evt =  new CustomEvent("chat", {
		detail: {
		    uuid: "me",
		    msg: msg
		}
	    })
        dispatchEvent(evt);
    },
    receive: function (sender, msg) {
        console.info(`${sender} -> "${msg}"`);
    },
    log: function () {
    },
    chat: new CustomEvent("chat", {
        detail: {
            uuid: "me",
            msg: ""
        }
    }),
};
window.addEventListener("chat", function (event) {
    let uuid = event.detail.uuid;
    let msg = event.detail.msg;
    if (uuid != "me") {
        Chat.receive(uuid, msg);
    }
	let time = Date.now()
	console.debug("ADFSDFSDF")
	if(document.querySelector(`[uuid = "${uuid}"]`) != null){
		let all_uuid = document.querySelectorAll(`[uuid = "${uuid}"]`)
		let last = all_uuid[all_uuid.length -1 ]
	console.debug("miau miau ADFSDFSDF", last, time)
		if(Math.abs(parseInt(last.getAttribute('time')) - time) < 200) return
	}
	console.debug("ADFSDFSDF 666")
    let cont = document.createElement("p");
    let label = document.createElement("label");
    label.setAttribute("uuid", uuid);
    label.setAttribute("time", time);
    label.classList.add("badge");
    label.classList.add("badge-success");
    label.textContent = Users[uuid].nickname;
    cont.classList.add("text-left");
    cont.classList.add("my-0");
    cont.textContent = msg;
    let labels = document.querySelectorAll(".chat-msg label");
    if (labels.length == 0 || labels[labels.length - 1].getAttribute("uuid") != uuid)
        document.querySelector(".chat-msg").appendChild(label);
    document.querySelector(".chat-msg").appendChild(cont);
    document.querySelector(".chat-msg").scrollTo(0, document.querySelector(".chat-msg").scrollHeight);
});
window.addEventListener("renameUser", function (event) {
    const uuid = event.detail.uuid;
    const oldname = event.detail.oldName;
    if (uuid == "me") {
        document.querySelector("span#nickname").textContent = Users["me"].nickname;
    }
    if(Users[uuid].nickname == oldname) return false
    let label = document.createElement("label");
    label.classList.add("badge");
    label.classList.add("badge-info");
    label.classList.add("w-100");
    label.classList.add("my-0");
    label.classList.add("text-wrap");
    label.textContent = `\t "${oldname}" ahora se llama "${Users[uuid].nickname}"`;
    document.querySelector(".chat-msg").appendChild(label);
});
document.querySelectorAll(".chat-header").forEach(function (header) {
    header.addEventListener("click", function (event) {
        let displaying = document.querySelector(".chat-body").style.display;
        if (displaying == "none") {
            document.querySelectorAll(".chat-body").forEach(function (panel) {
                panel.style.display = "";
                document.querySelector(".chat-msg").scrollTo(0, document.querySelector(".chat-msg").scrollHeight);
            });
        }
        else {
            document.querySelectorAll(".chat-body").forEach(function (panel) {
                panel.style.display = "none";
            });
        }
    });
});
document.querySelector(".chat-input button").addEventListener("click", function (event) {
    let selection = document.querySelector(".chat-input textarea");
    Chat.send(selection.value);
    selection.value = "";
    event.preventDefault();
});
document.querySelector(".chat-input textarea").addEventListener("keyup", function (event) {
    let selection = document.querySelector(".chat-input textarea");
    if (event.code == "Enter" && event.ctrlKey) {
        Chat.send(selection.value);
        selection.value = "";
    }
});
window.Chat = Chat;
