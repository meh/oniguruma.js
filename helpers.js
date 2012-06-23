/*
 *           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                   Version 2, December 2004
 *
 *           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.
 *********************************************************************/

Emscripten = (function () {
	function sizeof (type) {
		switch (type) {
			case "char":
			case "uchar":
			case "byte":
				return 1;

			case "short":
			case "ushort":
			case "word":
				return 2;

			case "int":
			case "uint":
			case "dword":
				return 4;

			case "long":
			case "ulong":
			case "qword":
			case "size_t":
			case "ssize_t":
				return 8;

			case "float":
				return 4;

			case "double":
				return 8;
		}
	}

	function isFloat (type) {
		return type == "float" || type == "double";
	}

	function typefor (name) {
		switch (sizeof(name)) {
			case 1: return "i8";
			case 2: return "i16";
			case 4: return isFloat(name) ? "float" : "i32";
			case 8: return isFloat(name) ? "double" : "i64";
		}
	}

	function Struct () {
		if (arguments.length % 2 != 0) {
			throw new Error("odd number of arguments, you have to pass a set of name, type pairs")
		}

		var names = [], types = [];

		for (var i = 0; i < arguments.length; i += 2) {
			names.push(arguments[i]);
			types.push(arguments[i + 1]);
		}

		function offsetof (name) {
			var result = 0;

			for (var i = 0; i < names.length; i++) {
				if (names[i] == name) {
					break;
				}

				result += sizeof(types[i]);
			}

			return result;
		}

		return function (pointer) {
			var length = 0;
			for (var i = 0; i < types.length; i++) {
				length += sizeof(types[i]);
			}

			Object.defineProperty(this, "sizeof", {
				value: length,
				writable: false,
				enumerable: false
			});

			this.offsetof = offsetof;

			if (!pointer) {
				pointer = allocate(length, i8, ALLOC_NORMAL);
			}

			Object.defineProperty(this, "ptr", {
				value: pointer,
				writable: false,
				enumerable: false
			});

			for (var i = 0; i < names.length; i++) {
				Object.defineProperty(this, names[i], {
					get: function () {
						return getValue(pointer + offsetof(names[i]), typefor(types[i]));
					},

					set: function (value) {
						setValue(pointer + offsetof(names[i]), typefor(types[i]));
					}
				});
			}
		}
	}

	return {
		sizeof: sizeof,
		Struct: Struct,
	}
})();
