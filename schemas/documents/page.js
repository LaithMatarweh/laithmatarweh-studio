import { GoFile } from "react-icons/go"
import { GoHome } from "react-icons/go"
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
	name: "page",
	type: "document",
	icon: GoFile,
	title: "Page",
	fields: [
		{
			name: "pageTitle",
			type: "string",
			title: "Title",
			description: "The title of this Page. This field is required.",
			validation: Rule => Rule.required(),
		},
		{
			name: "pageSlug",
			type: "slug",
			title: "Slug",
			description: "The unique URL identifier (also known as 'slug') that will link to this Page. Click on 'Generate' to create one based on the Title you've supplied in the field above. A value of `/` (forward slash) indicates that this Page is the website's homepage. This field is required.",
			options: {
				source: "pageTitle",
				isUnique: isUniqueAcrossTypesAndPages,
				maxLength: 96,
			},
			validation: Rule => Rule.required(),
		},
		{
			name: "pageKeywords",
			type: "array",
			title: "Keywords",
			description: "A list of tags that best describe this Page and its content. This field is optional, but can be helpful for SEO. Any keywords supplied for this Page will be joined together with the ones specified in `Content → Settings → Site Information`. Type a tag and press enter to add it to the list of tags.",
			of: [{ type: "string", }],
			options: { layout: "tags", },
		},
		{
			name: "homepageFeed",
			type: "array",
			title: "Homepage Feed",
			description: "A list of featured Entries to be displayed on the website's homepage. A minimum of one featured Entry is required.",
			of: [
				{
					type: "reference",
					title: "Reference to Entry",
					to: { type: "entry", },
					options: { disableNew: true, },
				},
			],
			validation: Rule => Rule.custom((blocks = [], context) => {
				const isHomepage = context.document?.pageSlug?.current === "/"
				if (isHomepage && blocks.length === 0) {
					return "A minimum of one featured Entry is required."
				}
				return true
			}),
			hidden: ({ document }) => document?.pageSlug?.current !== "/",
		},
		{
			name: "pageMainImage",
			type: "image",
			title: "Main Image",
			description: "The main image of this Page. Click on the pencil icon to caption this image and to adjust its hotpost and crop areas. This field is optional.",
			options: {
				hotspot: true,
				storeOriginalFilename: false,
				accept: "image/*",
			},
			fields: [
				{
					name: "caption",
					type: "portableText",
					title: "Caption",
					description: "The caption of this Page's Main Image. This field is optional.",
				},
			],
			hidden: ({ document }) => document?.pageSlug?.current === "/",
		},
		{
			name: "pageMainEmbeddedMedia",
			type: "embeddedMedia",
			title: "Main Embedded Media",
			description: "The code snippet for the main embedded media of this Page. This field is optional.",
			hidden: ({ document }) => document?.pageSlug?.current === "/",
		},
		{
			name: "pageMainDescription",
			type: "portableText",
			description: "The main description of this Page. This field is optional.",
			title: "Main Description",
			hidden: ({ document }) => document?.pageSlug?.current === "/",
		},
		{
			name: "pageContent",
			type: "contentArray",
			title: "Content",
			description: "A list of this Page's contents. This list must contain a minimum of one item.",
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
			validation: Rule => Rule.custom((blocks = [], context) => {
				const isHomepage = context.document?.pageSlug?.current === "/"
				if (!isHomepage && blocks.length === 0) {
					return "A minimum of one item is required."
				}
				return true
			}),
			hidden: ({ document }) => document?.pageSlug?.current === "/",
		},
		orderRankField({ type: "page" }),
	],
	// orderings: [
	// 	{
	// 		title: "title (ascending)",
	// 		name: "titleAsc",
	// 		by: [ { field: "pageTitle", direction: "asc" }, ],
	// 	},
	// 	{
	// 		title: "title (descending)",
	// 		name: "titleDesc",
	// 		by: [ { field: "pageTitle", direction: "desc" }, ],
	// 	},
	// ],
	orderings: [orderRankOrdering],
	preview: {
		select: {
			title: "pageTitle",
			slug: "pageSlug.current",
			media: "pageMainImage",
		},
		prepare(selection) {
			const { title = "Untitled", slug, media } = selection
			if (slug === "/") {
				return {
					title: title,
					media: GoHome,
				}
			}
			return {
				title: title,
				media: media,
			}
		},
	},
}