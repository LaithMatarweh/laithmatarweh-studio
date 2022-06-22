export default {
	name: "embeddedMedia",
	type: "text",
	title: "Embedded Media",
	description: "The code snippet for this Embedded Media. This field is optional.",
	rows: 5,
	validation: Rule => Rule.custom(snippet => {
		if (snippet && (!snippet.includes("<iframe") || !snippet.includes("></iframe>"))) {
			return "Not a valid snippet for embedded media."
		}
		return true
	}),
}