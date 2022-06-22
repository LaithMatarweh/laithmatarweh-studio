import { GoTag } from "react-icons/go"
import sanityClient from "part:@sanity/base/client"
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"

const client = sanityClient.withConfig({ apiVersion: "2022-05-11" })

function isUniqueAcrossTypesAndPages(slug, options) {
	const { document } = options
	const id = document._id.replace(/^drafts\./, "")
	const params = {
		draft: `drafts.${id}`,
		published: id,
		slug,
		reserved: ["assets"],
	}
	const query = `!defined(*[!(_id in [$draft, $published]) && (typeSlug.current == $slug || pageSlug.current == $slug || $slug in $reserved)][0]._id)`
	return client.fetch(query, params)
}

export default {
	name: "entryType",
	type: "document",
	icon: GoTag,
	title: "Entry Type",
	fields: [
		{
			name: "typeSingular",
			type: "string",
			title: "Singular Name",
			description: "The singular name of this Entry Type. This field is required.",
			validation: Rule => Rule.required(),
		},
		{
			name: "typePlural",
			type: "string",
			title: "Plural Name",
			description: "The plural name of this Entry Type. This field is required.",
			validation: Rule => Rule.required(),
		},
		{
			name: "typeSlug",
			type: "slug",
			title: "Slug",
			description: "The unique URL identifier (also known as 'slug') that will link to this Entry Type's feed. Click on 'Generate' to create one based on the Plural Name you've supplied in the field above. This field is required.",
			options: {
				source: "typePlural",
				isUnique: isUniqueAcrossTypesAndPages,
				maxLength: 96,
			},
			validation: Rule => Rule.required(),
		},
		{
			name: "typeKeywords",
			type: "array",
			title: "Keywords",
			description: "A list of tags that best describe this Entry Type and its content. This field is optional, but can be helpful for SEO. Any keywords supplied for this Entry Type will be joined together with the ones specified in `Content → Settings → Site Information`. Type a tag and press enter to add it to the list of tags.",
			of: [{ type: "string", }],
			options: { layout: "tags", },
		},
		{
			name: "feedDisplayAspectRatio",
			type: "number",
			title: "Aspect Ratio of Cards",
			description: "The aspect ratio (w / h) that this Entry Type's feed cards should be displayed in. This field is required.",
			validation: Rule => Rule.required(),
		},
		{
			name: "feedDisplaySize",
			type: "number",
			title: "Number of Cards",
			description: "The quantity of feed cards that should be displayed at one time in this Entry Type's feed. This field is required and must contain a whole number.",
			validation: Rule => Rule.required().integer(),
		},
		{
			name: "feedDisplayRows",
			type: "number",
			title: "Number of Rows",
			description: "The quantity of rows that this Entry Type's feed cards should be split across. This field is required and must contain a whole number.",
			validation: Rule => Rule.required().integer(),
		},
		orderRankField({ type: "entryType" }),
	],
	// orderings: [
	// 	{
	// 		title: "title (ascending)",
	// 		name: "titleAsc",
	// 		by: [ { field: "typePlural", direction: "asc" }, ],
	// 	},
	// 	{
	// 		title: "title (descending)",
	// 		name: "titleDesc",
	// 		by: [ { field: "typePlural", direction: "desc" }, ],
	// 	},
	// ],
	orderings: [orderRankOrdering],
	preview: {
		select: {
			title: "typePlural",
		},
		prepare(selection) {
			const { title = "Untitled", } = selection
			return {
				title: title,
			}
		},
	},
}