import { GoFileMedia } from "react-icons/go"

export default {
	name: "imageObject",
	type: "object",
	icon: GoFileMedia,
	title: "Image",
	fields: [
		{
			name: "image",
			type: "image",
			title: "Image",
			description: "This field is required.",
			options: {
				storeOriginalFilename: false,
				accept: "image/*",
			},
			validation: Rule => Rule.required().error("You must upload or select an image."),
		},
		{
			name: "caption",
			type: "portableText",
			title: "Caption",
			description: "This field is optional.",
		},
	],
	preview: {
		select: {
			image: "image",
			caption: "caption",
		},
		prepare(selection) {
			const { image, caption, } = selection
			const block = (caption || []).find(block => block._type === "block")
			if (block) {
				return {
					title: block
						? block.children
							.filter(child => child._type === "span")
							.map(span => span.text)
							.join("")
						: "",
					subtitle: "Image",
					media: image,
				}
			}
			return {
				title: "Image",
				media: image,
			}
		},
	},
}