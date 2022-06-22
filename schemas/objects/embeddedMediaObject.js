import { GoDeviceCameraVideo, GoLinkExternal, GoLocation } from "react-icons/go";

export default {
	name: "embeddedMediaObject",
	type: "object",
	icon: GoLinkExternal,
	title: "Embedded Media",
	fields: [
		{
			name: "embeddedMedia",
			type: "embeddedMedia",
		},
	],
	preview: {
		select: {
			snippet: "embeddedMedia",
		},
		prepare(selection) {
			const { snippet, } = selection
			if (snippet?.includes("youtu.be") || snippet?.includes("youtube")) {
				return {
					title: "YouTube Embed",
					subtitle: "Embedded Media",
					media: GoDeviceCameraVideo,
				}
			}
			if (snippet?.includes("vimeo")) {
				return {
					title: "Vimeo Embed",
					subtitle: "Embedded Media",
					media: GoDeviceCameraVideo,
				}
			}
			if (snippet?.includes("google") && snippet?.includes("maps")) {
				return {
					title: "Google Maps Embed",
					subtitle: "Embedded Media",
					media: GoLocation,
				}
			}
			return {
				title: "Embedded Media",
			}
		},
	},
}