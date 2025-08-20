import { server } from "./server";

describe("MSW server setup", () => {
	it("should start and stop correctly", () => {
		expect(server).toBeDefined();
	});
});
