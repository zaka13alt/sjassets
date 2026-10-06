"use strict";

const form = document.getElementById("e-form");
const address = document.getElementById("e-address");
const searchEngine = document.getElementById("e-search-engine");
const error = document.getElementById("e-error");
const errorCode = document.getElementById("e-error-code");


function logDebug(msg) {
	console.log(`log ${msg}`);
}


if (form) {
	form.onsubmit = function(e) {
		e.preventDefault();
		return false;
	};
}

const { __99416Controller } = __99416LoadController();

const __99416 = new __99416Controller({
    prefix: "/s/",
    files: {
        wasm: "/172ab3.wasm",
        all: "/s.js",
        sync: "/sync.js",
    },
});

__99416.init();


let connection;
try {
	connection = new __68256.__68256Connection("/w.js", "service-worker");
} catch (e) {
	connection = new __68256.__68256Connection("/w.js");
}

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	
	try {
		await registerSW();
	} catch (err) {
		console.warn("error:", err);
	}


	let url = address.value.trim();
	try {
		if (typeof search === "function") {
			url = search(address.value, searchEngine.value);
		} else {
			if (!url.startsWith("http://") && !url.startsWith("https://")) {
				if (url.includes(".") && !url.includes(" ")) {
					url = "https://" + url;
				} else {
					url = "https://google.com/search?q=" + encodeURIComponent(url);
				}
			}
		}
	} catch (searchError) {
		console.error("Input resolution crash, falling back to string parsing:", searchError);
		if (!url.startsWith("http://") && !url.startsWith("https://")) {
			url = "https://" + url;
		}
	}

	
	let eww = "wss://wisp.mercurywork.shop/";
	try {
		await connection.setTransport("/l1bc.mjs", [
			{ websocket: eww },
		]);
	} catch (transportError) {
		console.error("Network transport layer connection failed:", transportError);
	}

	
	try {
		const oldFrame = document.getElementById("e-frame");
		if (oldFrame) oldFrame.remove();

		const frame = __99416.createFrame();
		frame.frame.id = "e-frame";
		frame.frame.style = "position:fixed;top:0;left:0;width:100%;height:100%;border:none;z-index:99999;background:white;";
		
		document.body.appendChild(frame.frame);
		frame.go(url);
		logDebug("loaded");
	} catch (frameError) {
		if (error && errorCode) {
			error.textContent = "failed";
			errorCode.textContent = frameError.toString();
		}
		console.error("Viewport layer failed to construct frame:", frameError);
	}
});

logDebug("Production script initialized successfully.");
