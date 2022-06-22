import { GoPencil } from "react-icons/go"

export default {
	name: "portableTextObject",
	type: "object",
	icon: GoPencil,
	title: "Text",
	fields: [
		{
			name: "portableText",
			type: "portableText",
			title: "Text",
			description: "This field is required.",
			validation: Rule => Rule.required().error("You must write something!"),
		}
	],
	preview: {
		select: {
			blocks: "portableText"
		},
		prepare(value) {
			const block = (value.blocks || []).find(block => block._type === "block")
			if (block) {
				return {
					title: block
						? block.children
							.filter(child => child._type === "span")
							.map(span => span.text)
							.join("")
						: "",
					subtitle: "Text",
				}
			}
			return {
				title: "Text",
			}
		},
	},
}