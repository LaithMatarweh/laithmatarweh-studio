export default {
	name: "siteInformation",
	type: "document",
	title: "Site Information",
	__experimental_actions: [/*"create",*/ "update", /*"delete",*/ "publish"],
	fields: [
		{
			name: "siteTitle",
			type: "string",
			title: "Title",
			description: "The title of this website. This field is required.",
			validation: Rule => Rule.required(),
		},
		{
			name: "siteDescription",
			type: "text",
			title: "Description",
			description: "A brief description of this website. This field is required.",
			validation: Rule => Rule.required(),
		},
		{
			name: "siteAuthor",
			type: "string",
			title: "Author",
			description: "The person to whom this website's content is attributed. This field is required.",
			validation: Rule => Rule.required(),
		},
		{
			name: "siteInstagramLink",
			type: "url",
			title: "Instagram Link",
		},
		{
			name: "siteFooterInformation",
			type: "array",
			title: "Footer Information",
			of: [
				{ type: "keyValueObject", },
			],
		},
		{
			name: "siteLogo",
			type: "image",
			title: "Logo",
			description: "The logo to be used in this website. This field is required. SVG format is required.",
			options: {
				storeOriginalFilename: false,
				accept: ".svg",
			},
			fields: [
				{
					name: "siteLogoTransformationQuery",
					type: "string",
					title: "Transformation Query",
				},
			],
		},
		{
			name: "siteKeywords",
			type: "array",
			title: "Keywords",
			description: "A list of tags that best describe this website and its content. This field is required, and can be helpful for SEO. Type a tag and press enter to add it to the list of tags.",
			of: [{ type: "string", }],
			options: { layout: "tags", },
			validation: Rule => Rule.required(),
		},
		{
			name: "siteUrl",
			type: "url",
			title: "URL",
			description: "The scheme, subdomain, second-level domain, and top-level domain of this website. This field is required.",
			validation: Rule => Rule.required(),
		},
		{
			name: "siteBaseUrl",
			type: "string",
			title: "Base URL",
			description: "The subdirectory of this website. The base URL Must begin with a forward slash, and mustn't end with a trailing one. This field is optional.",
		},
		{
			name: "siteAnalyticsSnippet",
			type: "text",
			title: "Analytics Snippet",
			description: "The code snippet supplied by your analytics provider. This field is optional.",
			rows: 5,
		},
		// ...
	],
}