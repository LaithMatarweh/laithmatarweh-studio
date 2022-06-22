import { GoKey } from "react-icons/go"

export default {
	name: "keyValueObject",
	type: "object",
	icon: GoKey,
	title: "Key–Value Pair",
	fields: [
		{
			name: "key",
			type: "string",
			title: "Key",
			description: "The key of this Pair. This field is required.",
			validation: Rule => Rule.required().error("You must supply this pair with a key."),
		},
		{
			name: "value",
			type: "array",
			title: "Value",
			description: "A list of the values of this Pair. This list must contain a minimum of one item.",
			validation: Rule => Rule.required().error("You must supply this pair with a minimum of one value."),
			of: [
				{
					type: "string",
					validation: Rule => Rule.required().error("Values can't be empty."),
				},
			],
		},
	],
	preview: {
		select: {
			key: "key",
			value: "value",
		},
		prepare(selection) {
			const { key = "Unspecified Key", value = [ "Unspecified Value", ] } = selection
			return {
				title: key + ": " + value.join(", "),
				subtitle: "Key–Value Pair",
			}
		},
	},
}