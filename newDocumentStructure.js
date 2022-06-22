import S from "@sanity/base/structure-builder"

const hiddenDocumentTypes = listItem =>
	![
		"entryType",
		"siteInformation",
	].includes(listItem.getId())

export default [
	...S.defaultInitialValueTemplateItems().filter(hiddenDocumentTypes)
]