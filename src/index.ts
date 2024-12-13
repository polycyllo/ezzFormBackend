import server from "./server";

const PORT = process.env.PORT || (4000 as any);
server.listen(PORT, "0.0.0.0", () => {
    console.log(`aquiiiiiiiii Server running on http://0.0.0.0:${PORT}`);
});
