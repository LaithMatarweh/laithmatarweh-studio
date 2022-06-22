import { GoQuote } from "react-icons/go"

export default {
	name: "subtitleObject",
	type: "object",
	icon: GoQuote,
	title: "Subtitle",
	fields: [
		{
			name: "subtitle",
			type: "text",
			title: "Subtitle",
			rows: 5,
			validation: Rule => Rule.required().error("You must write something!"),
		},
	],
	preview: {
		select: {
			subtitle: "subtitle",
		},
		prepare(selection) {
			const { subtitle = "Unspecified" } = selection
			return {
				title: subtitle,
				subtitle: "Subtitle",
			}
		},
	},
}