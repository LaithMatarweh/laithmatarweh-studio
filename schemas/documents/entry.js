import { GoFile } from "react-icons/go"
import sanityClient from "part:@sanity/base/client"
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"

const client = sanityClient.withConfig({ apiVersion: "2022-05-11" })

function isUniqueAcrossType(entrySlug, options) {
	const { document } = options
	const id = document._id.replace(/^drafts\./, "")
	const params = {
	  draft: `drafts.${id}`,
	  published: id,
	  entryType: document.entryType._ref,
	  entrySlug,
	}
	const query = `!defined(*[!(_id in [$draft, $published]) && entrySlug.current == $entrySlug && entryType._ref == $entryType][0]._id)`
	return client.fetch(query, params)
}

export default {
	name: "entry",
	type: "document",
	icon: GoFile,
	title: "Entry",
	fields: [
		{
			name: "entryTitle",
			type: "string",
			title: "Title",
			description: "The title of this Entry. You can leave this field empty if you would like not to generate a dedicated page for it (by leaving the Slug field below empty). Otherwise, a title will be required.",
			validation: Rule => Rule.custom((title, context) => {
				const hasTitle = title && title !== null
				const hasSlug = context.document.entrySlug && context.document.entrySlug !== null
				if (!hasTitle && hasSlug) { return "The Slug field below is not empty, which indicates that you have chosen to generate a dedicated page for this Entry. A title is required in this case!" }
				return true
			}),
		},
		{
			name: "entryType",
			type: "reference",
			title: "Type",
			description: "The Entry Type that this entry will be filed and appear under. This field is required. You can configure and create further types from `Content → Settings → Entry Types`",
			to: { type: "entryType", },
			options: { disableNew: true, },
			validation: Rule => Rule.required().error("A type is required!"),
		},
		{
			name: "entrySlug",
			type: "slug",
			title: "Slug",
			description: "The unique URL identifier (also known as 'slug') that will link to this Entry's dedicated page. Leave this field empty if you would like not to generate a dedicated page for this Entry. Otherwise, click on 'Generate' to create one based on the Title you've supplied in the field above. Please note that you can only do so once you've defined a Type for this Entry.",
			options: {
				source: "entryTitle",
				isUnique: isUniqueAcrossType,
				maxLength: 96,
			},
			readOnly: ({ document }) => !document?.entryType?._ref,
			validation: Rule => Rule.custom((entrySlug, context) => {
				const hasSlug = entrySlug && entrySlug !== null
				const hasType = context.document.entryType && context.document.entryType !== null
				if (!hasType) {
					return "Type not defined. You must define a Type for this Entry before you can generate a Slug."
				}
				return true
			}),
		},
		{
			name: "entryMainImage",
			type: "image",
			title: "Main Image",
			description: "The image that will be used when displaying this Entry in a feed. Click on the pencil icon to caption this image and to adjust its hotpost and crop areas. This field is optional if the Slug field above is empty, and required if it's not.",
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
					description: "The caption of this Entry's Main Image. This field is optional.",
				},
			],
			validation: Rule => Rule.custom((value, context) => {
				const hasSlug = context.document.entrySlug && context.document.entrySlug !== null
				const hasType = context.document.entryType && context.document.entryType !== null
				if (!hasSlug && hasType && !value?.asset?._ref) {
					return "The Slug field above is empty, which indicates that you have chosen not to generate a dedicated page for this Entry. An image is required in this case!"
				}
				return true
			}),
		},
		{
			name: "entryMainDescription",
			type: "portableText",
			description: "The main description of this Entry. This field is optional.",
			title: "Main Description",
			hidden: ({ document }) => !document?.entrySlug?.current || !document?.entryType?._ref,
		},
		{
			name: "entryKeywords",
			type: "array",
			title: "Keywords",
			description: "A list of tags that best describe this Entry and its content. This field is optional, but can be helpful for SEO. Any keywords supplied for this Entry will be joined together with the ones specified for its Entry Type in `Content → Settings → Entry Types` and with the ones specified in `Content → Settings → Site Information`. Type a tag and press enter to add it to the list of tags.",
			of: [{ type: "string", }],
			options: { layout: "tags", },
			hidden: ({ document }) => !document?.entrySlug?.current || !document?.entryType?._ref,
		},
		{
			name: "entryMetadata",
			type: "array",
			title: "Metadata",
			description: "A list of information that pertains to this Entry (e.g. subtitle, year, location, etc.). This list is optional.",
			of: [
				{ type: "subtitleObject", },
				{ type: "keyValueObject", },
			],
			hidden: ({ document }) => !document?.entrySlug?.current || !document?.entryType?._ref,
			validation: Rule => Rule.custom(blocks => {
				const subtitle = (blocks || []).filter(
					block =>
						block._type === "subtitleObject"
				)
				if (subtitle.length > 1) {
					return "You can't have more than one subtitle."
				}
				return true
			}),
		},
		{
			name: "entryContent",
			type: "array",
			title: "Sections",
			description: "A list of this Entry's Sections. This list must contain one Main Section.",
			of: [
				{ type: "mainSection", },
				{ type: "genericSection", },
				{ type: "fileSection", },
			],
			initialValue: [
				{
					_type: "mainSection",
					sectionHeading: "",
				},
			],
			hidden: ({ document }) => !document?.entrySlug?.current || !document?.entryType?._ref,
			validation: Rule => Rule.custom((blocks = [], context) => {
				let errors = []
				let headings = []
				const hasSlug = context.document.entrySlug && context.document.entrySlug !== null
				const hasType = context.document.entryType && context.document.entryType !== null
				const mainSection = (blocks || []).filter(
					block =>
					block._type === "mainSection"
				)
				for (var i = 0; i < blocks.length; i++) {
					if (blocks[i].sectionHeading) {
						headings.push(blocks[i].sectionHeading.toLowerCase().trim().replace(/\s+/g, "-").slice(0, 96))
					}
				}
				const hasDuplicates = (array) => {
					return (new Set(array)).size !== array.length
				}
				if (hasSlug && hasType && mainSection.length > 1) {
					errors.push("You can't have more than one Main Section.")
				}
				if (hasSlug && hasType && mainSection.length === 0) {
					errors.push("You must have one Main Section.")
				}
				if (hasDuplicates(headings)) {
					errors.push("You can't have identical Section Headings.")
				}
				if (errors.length > 0) {
					return errors.join(" Also: ")
				}
				return true
			}),
		},
		orderRankField({ type: "entryType" }),
	],
	// orderings: [
	// 	{
	// 		title: "title (ascending)",
	// 		name: "titleAsc",
	// 		by: [ { field: "entryTitle", direction: "asc" }, ],
	// 	},
	// 	{
	// 		title: "title (descending)",
	// 		name: "titleDesc",
	// 		by: [ { field: "entryTitle", direction: "desc" }, ],
	// 	},
	// ],
	orderings: [orderRankOrdering],
	preview: {
		select: {
			title: "entryTitle",
			type: "entryType.typeSingular",
			media: "entryMainImage",
		},
		prepare(selection) {
			const { title = "Untitled", type = "Unspecified", media } = selection
			return {
				title: title,
				subtitle: type,
				media: media,
			}
		},
	},
}