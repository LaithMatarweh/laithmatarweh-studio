// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator"

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type"

// Document types
import entry from "./documents/entry"
import entryType from "./documents/entryType"
import page from "./documents/page"
import siteInformation from "./documents/siteInformation"

// Object types
import contentArray from "./objects/contentArray"
import embeddedMedia from "./objects/embeddedMedia"
import embeddedMediaObject from "./objects/embeddedMediaObject"
import fileSection from "./objects/fileSection"
import genericSection from "./objects/genericSection"
import imageObject from "./objects/imageObject"
import keyValueObject from "./objects/keyValueObject"
import mainSection from "./objects/mainSection"
import portableText from "./objects/portableText"
import portableTextObject from "./objects/portableTextObject"
import subtitleObject from "./objects/subtitleObject"

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
	// We name our schema
	name: "default",
	// Then proceed to concatenate our document type
	// to the ones provided by any plugins that are installed
	types: schemaTypes.concat([
		// Document types
		entry,
		entryType,
		page,
		siteInformation,
		// Object types
		contentArray,
		embeddedMedia,
		embeddedMediaObject,
		fileSection,
		genericSection,
		imageObject,
		keyValueObject,
		mainSection,
		portableText,
		portableTextObject,
		subtitleObject,
	]),
})
