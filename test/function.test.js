const {
	isEven,
	calculateTotalPrice,
	processPurchase,
	sendNotification,
	generatePassword,
} = require("./../src/function.js");

describe("isEven function", () => {
	test("should throw an error if input is not a number", () => {
		try {
			const result = isEven(4);
		} catch (e) {
			expect(e).not.toBeNull();
			expect(e.message).toBe("Input must be a number");
		}
	});

	test("should return true for even numbers", () => {
		expect(isEven(4)).toBe(true);
	});

	test("should return false for odd numbers", () => {
		expect(isEven(5)).toBe(false);
	});
});

describe("calculateTotalPrice function", () => {
	test("should throw an error if input is not an array", () => {
		try {
			const result = calculateTotalPrice(4);
		} catch (e) {
			expect(e).not.toBeNull();
			expect(e.message).toBe("Prices must be an array");
		}
	});

	test("should throw an error if input is not an array", () => {
		try {
			const result = calculateTotalPrice([4], "25");
		} catch (e) {
			expect(e).not.toBeNull();
			expect(e.message).toBe("Tax rate must be a number");
		}
	});

    test("should throw an error if element array is not a number", () => {
		try {
			const result = calculateTotalPrice(["4"], 25);
		} catch (e) {
			expect(e).not.toBeNull();
			expect(e.message).toBe("Each price must be a non-negative number");
		}
	});

    test("should throw an error if element array is not a negative number", () => {
		try {
			const result = calculateTotalPrice([-4], 25);
		} catch (e) {
			expect(e).not.toBeNull();
			expect(e.message).toBe("Each price must be a non-negative number");
		}
	});

    test("should throw an error if element array is not a negative number", () => {
        expect(calculateTotalPrice([4], 25)).toEqual(104);
	});
});

describe("sendNotification function", () => {
	test("should log the correct message", () => {
		const consoleSpy = jest.spyOn(console, "log");
		const message = "Test message";
		sendNotification(message);
		expect(consoleSpy).toHaveBeenCalledWith(
			`Notification envoyée : ${message}`,
		);
		consoleSpy.mockRestore();
	});
});
