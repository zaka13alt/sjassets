importScripts("s.js");

const { __99416ServiceWorker } = __99416LoadWorker();
const __99416 = new __99416ServiceWorker();

async function handleRequest(event) {
	await __99416.loadConfig();
	if (__99416.route(event)) {
		return __99416.fetch(event);
	}
	return fetch(event.request);
}

self.addEventListener("fetch", (event) => {
	event.respondWith(handleRequest(event));
});
