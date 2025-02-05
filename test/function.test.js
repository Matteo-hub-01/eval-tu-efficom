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

	test("should return true for zero", () => {
        expect(isEven(0)).toBe(true);
    });

    test("should return false for negative odd numbers", () => {
        expect(isEven(-3)).toBe(false);
    });

    test("should return true for negative even numbers", () => {
        expect(isEven(-4)).toBe(true);
    });

    test("should return false for NaN", () => {
        expect(isEven(Number.NaN)).toBe(false);
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

	test("should return total price", () => {
		expect(calculateTotalPrice([4], 25)).toEqual(104);
	});

	test("should return not total price", () => {
		expect(calculateTotalPrice([4], 25)).not.toEqual(100);
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

describe("process Purchase function", () => {
	test("should throw an error if input is not an array", () => {
		try {
			const result = processPurchase(4);
		} catch (e) {
			expect(e).not.toBeNull();
			expect(e.message).toBe("Prices must be an array");
		}
	});

	test("should throw an error if input is not an array", () => {
		try {
			const result = processPurchase([4], "25");
		} catch (e) {
			expect(e).not.toBeNull();
			expect(e.message).toBe("Tax rate must be a number");
		}
	});

	test("should throw an error if element array is not a number", () => {
		try {
			const result = processPurchase(["4"], 25);
		} catch (e) {
			expect(e).not.toBeNull();
			expect(e.message).toBe("Each price must be a non-negative number");
		}
	});

	test("should throw an error if element array is not a negative number", () => {
		try {
			const result = processPurchase([-4], 25);
		} catch (e) {
			expect(e).not.toBeNull();
			expect(e.message).toBe("Each price must be a non-negative number");
		}
	});

	test("should return total price", () => {
		expect(processPurchase([4], 25)).toEqual(104);
	});

	test("should return not total price", () => {
		expect(processPurchase([4], 25)).not.toEqual(100);
	});

	test("should log the correct message", () => {
		const taxrate = 25;
		const prices = [4];

		const consoleSpy = jest.spyOn(console, "log");
		const totalPrice = processPurchase(prices, taxrate);

		expect(consoleSpy).toHaveBeenCalledWith(
			`Notification envoyée : Votre total est de ${totalPrice.toFixed(2)} €`,
		);
		consoleSpy.mockRestore();
	});
});

describe("generatePassword function", () => {
	test("should throw an error if length is not a number", () => {
		expect(() => generatePassword("10")).toThrow("Length must be a number");
	});

	test("should throw an error if length is less than 6", () => {
		expect(() => generatePassword(5)).toThrow(
			"Length must be a number greater than or equal to 6",
		);
	});

	test("should return a password with the correct length", () => {
		const password = generatePassword(10);
		expect(password).toHaveLength(10);
	});

	test("should return a predefined password", () => {
		jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
		const password = generatePassword(10, {
			uppercase: false,
			numbers: false,
			specialChars: false,
		});
		expect(password).toBe("dddddddddd");
	});

	test("should return a predefined uppercase password ", () => {
		jest.spyOn(global.Math, "random").mockReturnValue(0.55555555);
		const password = generatePassword(10, {
			uppercase: true,
			numbers: false,
			specialChars: false,
		});
		expect(password).toBe("CCCCCCCCCC");
	});

	test("should return a predefined numbers password ", () => {
		jest.spyOn(global.Math, "random").mockReturnValue(0.88888888);
		const password = generatePassword(10, {
			uppercase: false,
			numbers: true,
			specialChars: false,
		});
		expect(password).toBe("5555555555");
	});

	test("should return a predefined specialChars password ", () => {
		jest.spyOn(global.Math, "random").mockReturnValue(0.99999999);
		const password = generatePassword(10, {
			uppercase: false,
			numbers: false,
			specialChars: true,
		});
		expect(password).toBe("??????????");
	});

	test("should return a predefined password with all options enabled", () => {
		const randomValues = [
			0.99999999, 0.99999999, 0.99999999, 0.99999999, 0.3333333, 0.3333333,
			0.3333333, 0.3333333, 0.66666666, 0.66666666, 0.11, 0.11, 0.11,
		];
		jest
			.spyOn(global.Math, "random")
			.mockImplementation(() => randomValues.shift());
		const password = generatePassword(13, {
			uppercase: true,
			numbers: true,
			specialChars: true,
		});
		expect(password).toBe("????CCCC55jjj");
	});
});
