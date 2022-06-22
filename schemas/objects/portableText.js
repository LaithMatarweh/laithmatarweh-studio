import React from "react"
import { GoLink, GoLinkExternal, GoDiffAdded, GoListUnordered, GoListOrdered, GoItalic, GoBold } from "react-icons/go"

const internalLink = props => (
	<span>
		{props.children } <sup contentEditable={false} style={{ width: "1rem", height: "1rem", paddingInline: "0.125rem", }}><GoLink /></sup>
	</span>
)

const externalLink = props => (
	<span>
		{props.children} <sup contentEditable={false} style={{ width: "1rem", height: "1rem", paddingInline: "0.125rem", }}><GoLinkExternal /></sup>
	</span>
)

export default {
	name: "portableText",
	type: "array",
	title: "Portable Text",
	of: [
		{
			type: "block",
			styles: [],
			lists: [
				{
					title: "Bullet List",
					value: "bullet",
					blockEditor: {
						icon: GoListUnordered,
					},
				},
				{
					title: "Numbered List",
					value: "number",
					blockEditor: {
						icon: GoListOrdered,
					},
				},
			],
			marks: {
				decorators: [
					{
						title: "Italic",
						value: "em",
						blockEditor: {
							icon: GoItalic,
						},
					},
					{
						title: "Bold",
						value: "strong",
						blockEditor: {
							icon: GoBold,
						},
					},
				],
				annotations: [
					{
						name: "internalLink",
						type: "object",
						title: "Internal Link",
						blockEditor: {
							icon: GoLink,
							render: internalLink,
						},
						fields: [
							{
								name: "reference",
								type: "reference",
								title: "Reference to Entry or Page",
								description: "A reference to an Entry or Page within the website.",
								to: [
									{ type: "entry", },
									{ type: "page", },
								],
								options: {
									disableNew: true,
									filter: "defined(entrySlug) || defined(pageSlug)",
								},
								validation: Rule => Rule.required(),
							},
						],
					},
					{
						name: "externalLink",
						type: "object",
						title: "External Link",
						blockEditor: {
							icon: GoLinkExternal,
							render: externalLink,
						},
						fields: [
							{
								name: "url",
								type: "url",
								title: "URL",
								description: "A URL linking to a page on another website.",
								validation: Rule => Rule.required(),
							},
						]
					},
				],
			},
		},
		{
			name: "readMore",
			type: "object",
			icon: GoDiffAdded,
			title: "Read More",
			fields: [
				{
					name: "readMore",
					type: "string",
					title: "Read More",
					description: "This is a Read More placeholder. There are no parameters for edit here.",
					readOnly: true,
				},
			],
			preview: {
				prepare() {
					return {
						title: "Read More",
						media: GoDiffAdded,
					}
				},
			},
		},
	],
	validation: Rule => Rule.custom((blocks = [], context) => {
		console.log(context)
		const readMore = (blocks || []).filter(block =>
			block._type === "readMore"
		)
		if (readMore.length > 0 && (context.parent._type === "image" || context.parent._type == "imageObject")) {
			return "You can't have a Read More placeholder in an image caption."
		}
		if (readMore.length > 1) {
			return "You can't have more than one Read More placeholder."
		}
		return true
	}),
}