import T from "@sanity/base/initial-value-template-builder"

export default [
	T.template({
		id: "entryWithType",
		title: "Entry With Type",
		schemaType: "entry",
		parameters: [{name: "typeId", type: "string"}],
		value: params => ({
			entryType: {_type: "reference", _ref: params.typeId}
		})
	}),
	...T.defaults()  
]