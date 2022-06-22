import { GoPrimitiveDot, GoPrimitiveSquare } from "react-icons/go";

export default {
	name: "contentArray",
	type: "array",
	title: "Content",
	of: [
		{
			name: "portableTextObject",
			type: "portableTextObject",
		},
		{
			name: "imageObject",
			type: "imageObject",
		},
		{
			name: "embeddedMediaObject",
			type: "embeddedMediaObject",
		},
		{
			name: "keyValueObject",
			type: "keyValueObject",
		},
		{
			name: "mainImagePlaceholder",
			type: "object",
			icon: GoPrimitiveDot,
			title: "Main Image (Placeholder)",
			fields: [
				{
					name: "placeholder",
					type: "string",
					title: "Placeholder",
					description: "This is a Main Image placeholder. There are no parameters for edit here.",
					initialValue: "Main Image",
					readOnly: true,
				},
			],
			preview: {
				prepare() {
					return {
						title: "Main Image",
						subtitle: "Placeholder",
					}
				},
			},
		},
		{
			name: "mainDescriptionPlaceholder",
			type: "object",
			icon: GoPrimitiveSquare,
			title: "Main Description (Placeholder)",
			fields: [
				{
					name: "placeholder",
					type: "string",
					title: "Placeholder",
					description: "This is a Main Description placeholder. There are no parameters for edit here.",
					initialValue: "Main Description",
					readOnly: true,
				},
			],
			preview: {
				prepare() {
					return {
						title: "Main Description",
						subtitle: "Placeholder",
					}
				},
			},
		},
	],
}