import { GoFileSymlinkFile } from "react-icons/go"

export default {
	name: "fileSection",
	type: "object",
	icon: GoFileSymlinkFile,
	title: "File",
	fields: [
		{
			name: "sectionHeading",
			type: "string",
			title: "Section Heading",
			description: "The title of this Section. This field is required and must be unique.",
			validation: Rule => Rule.required().error("All non-Main-Sections must have a Section Heading!"),
		},
		{
			name: "sectionFile",
			type: "file",
			title: "File",
			description: "The file that comprises this Section. This field is required.",
            options: { storeOriginalFilename: false, },
			validation: Rule => Rule.required().error("You must upload or select a file."),
		},
	],
	preview: {
		select: {
			title: "sectionHeading",
		},
		prepare(selection) {
			const { title = "Untitled", } = selection
			return {
				title: title,
				subtitle: "File",
			}
		},
	},
}