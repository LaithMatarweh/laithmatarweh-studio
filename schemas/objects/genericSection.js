import { GoNote } from "react-icons/go"

export default {
	name: "genericSection",
	type: "object",
	icon: GoNote,
	title: "Section",
	fields: [
		{
			name: "sectionHeading",
			type: "string",
			title: "Heading",
			description: "The title of this Section. This field is required and must be unique.",
			validation: Rule => Rule.required().error("All non-Main-Sections must have a Section Heading!"),
		},
		{
			name: "sectionContent",
			type: "contentArray",
			title: "Content",
			description: "A list of this Section's contents. This list must contain a minimum of one item.",
			validation: Rule => Rule.required().error("All non-Main-Sections must contain a minimum of one content item!"),
		},
	],
	preview: {
		select: {
			title: "sectionHeading",
			sectionContent: "sectionContent",
		},
		prepare(selection) {
			const { title = "Untitled", sectionContent = 0, } = selection
			return {
				title: title,
				subtitle: "Section" + " (" + (sectionContent.length ? sectionContent.length : sectionContent) + " item" + (sectionContent.length !== 1 ? "s)" : ")"),
			}
		},
	},
}