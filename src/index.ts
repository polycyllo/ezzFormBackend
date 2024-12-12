import server from "./server";

server.listen(4000, "0.0.0.0", () => {
    console.log("Server running on http://0.0.0.0:4000");
});
