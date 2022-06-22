import { GoStar } from "react-icons/go"

export default {
	name: "mainSection",
	type: "object",
	icon: GoStar,
	title: "Main Section",
	fields: [
		{
			name: "sectionHeading",
			type: "string",
			title: "Heading",
			description: "The title of this Section. This field is optional.",
		},
		{
			name: "sectionContent",
			type: "contentArray",
			title: "Content",
			description: "A list of this Section's contents. This list is optional.",
			// initialValue: [
			// 	{
			// 		_type: "mainDescriptionPlaceholder",
			// 		placeholder: "Main Description",
			// 	},
			// 	{
			// 		_type: "mainImagePlaceholder",
			// 		placeholder: "Main Image",
			// 	},
			// ],
		},
	],
	preview: {
		select: {
			title: "sectionHeading",
			sectionContent: "sectionContent",
		},
		prepare(selection) {
			const { title, sectionContent = 0, } = selection
			if (title) {
				return {
					title: title,
					subtitle: "Main Section" + " (" + (sectionContent.length ? sectionContent.length : sectionContent) + " item" + (sectionContent.length !== 1 ? "s)" : ")"),
				}
			}
			return {
				title: "Main Section",
				subtitle: (sectionContent.length ? sectionContent.length : sectionContent) + " item" + (sectionContent.length !== 1 ? "s" : ""),
			}
		},
	},
}