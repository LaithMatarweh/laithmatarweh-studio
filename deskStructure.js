import S from "@sanity/desk-tool/structure-builder"
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list"
import { GoBook, GoArchive, GoPackage, GoGear, GoTag, GoInfo } from "react-icons/go"

const hiddenDocumentTypes = listItem =>
	![
		"entry",
		"entryType",
		"page",
		"siteInformation",
	].includes(listItem.getId())

export default() =>
	S.list()
		.title("Content")
		.items([
			// S.listItem()
			// 	.title("Pages")
			// 	.icon(GoBook)
			// 	.schemaType("page")
			// 	.child(
			// 		S.documentTypeList("page")
			// 			.title("Pages")
			// 			.defaultOrdering([{ field: "pageTitle", direction: "asc", }])
			// 	),
			orderableDocumentListDeskItem({
				type: "page",
				title: "Pages",
				icon: GoBook,
			}),
			S.divider(),
			S.listItem()
				.title("Entries (By Type)")
				.icon(GoArchive)
				.child(
					S.documentTypeList("entryType")
						.title("Entries (By Type)")
						// .defaultOrdering([{ field: "orderRank", direction: "asc", }])
						.defaultOrdering([{ field: "orderRank" }])
						.menuItems([
							S.menuItem()
								.title("Entry")
								.intent({ type: "create", params: { type: "entry", template: "entry", }, }),
						])
						.initialValueTemplates([])
						.child((typeId) =>
							S.documentTypeList("entry")
								.title("Entries (By Type)")
								// .defaultOrdering([{ field: "entryTitle", direction: "asc", }])
								// .defaultOrdering([{ field: "_createdAt", direction: "desc", }])
								.defaultOrdering([{ field: "orderRank" }])
								.filter("$typeId == entryType._ref")
								.params({ typeId })
								.initialValueTemplates([
									S.initialValueTemplateItem("entryWithType", { typeId })
								]),
						),
				),
			// S.listItem()
			// 	.title("Entries (All Types)")
			// 	.icon(GoPackage)
			// 	.schemaType("entry")
			// 	.child(
			// 		S.documentTypeList("entry")
			// 			.title("Entries (All Types)")
			// 			// .defaultOrdering([{ field: "entryTitle", direction: "asc", }]),
			// 			.defaultOrdering([{ field: "_createdAt", direction: "desc", }])
			// 	),
			orderableDocumentListDeskItem({
				type: "entry",
				title: "Entries (All Types)",
				icon: GoPackage,
			}),
			S.divider(),
			S.listItem()
				.title("Settings")
				.icon(GoGear)
				.child(
					S.list()
						.title("Settings")
						.items([
							// S.listItem()
							// 		.title("Entry Types")
							// 		.icon(GoTag)
							// 		.schemaType("entryType")
							// 		.child(
							// 			S.documentTypeList("entryType")
							// 				.title("Entry Types")
							// 				.defaultOrdering([{ field: "typePlural", direction: "asc", }]),
							// 		),
							orderableDocumentListDeskItem({
								type: "entryType",
								title: "Entry Types",
								icon: GoTag,
							}),
							S.listItem()
								.title("Site Information")
								.icon(GoInfo)
								.child(
									S.editor()
										.id("siteInformation")
										.schemaType("siteInformation")
										.documentId("siteInformation"),
								),
						])
				),
			...S.documentTypeListItems().filter(hiddenDocumentTypes)
		])