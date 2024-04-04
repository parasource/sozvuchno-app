import { IconFileTypeBmp, IconFileTypeCss, IconFileTypeCsv, IconFileTypeDoc, IconFileTypeDocx, IconFileTypeHtml, IconFileTypeJpg, IconFileTypeJsx, IconFileTypePdf, IconFileTypePhp, IconFileTypePng, IconFileTypePpt, IconFileTypeSql, IconFileTypeSvg, IconFileTypeTs, IconFileTypeTsx, IconFileTypeTxt, IconFileTypeVue, IconFileTypeXls, IconFileTypeXml, IconFileTypeZip, IconFileTypeJs, IconFileTypeRs, IconFile } from "@tabler/icons-react"

export const fileTypesIcons = [
	{name: "file-type-js", component: <IconFileTypeJs/>},
	{name: "file-type-rs", component: <IconFileTypeRs/>},
	{name: "file-type-ts", component: <IconFileTypeTs/>},
	{name: "file-type-bmp", component: <IconFileTypeBmp/>},
	{name: "file-type-css", component: <IconFileTypeCss/>},
	{name: "file-type-csv", component: <IconFileTypeCsv/>},
	{name: "file-type-doc", component: <IconFileTypeDoc/>},
	{name: "file-type-jpg", component: <IconFileTypeJpg/>},
	{name: "file-type-jsx", component: <IconFileTypeJsx/>},
	{name: "file-type-pdf", component: <IconFileTypePdf/>},
	{name: "file-type-php", component: <IconFileTypePhp/>},
	{name: "file-type-png", component: <IconFileTypePng/>},
	{name: "file-type-ppt", component: <IconFileTypePpt/>},
	{name: "file-type-sql", component: <IconFileTypeSql/>},
	{name: "file-type-svg", component: <IconFileTypeSvg/>},
	{name: "file-type-tsx", component: <IconFileTypeTsx/>},
	{name: "file-type-txt", component: <IconFileTypeTxt/>},
	{name: "file-type-vue", component: <IconFileTypeVue/>},
	{name: "file-type-xls", component: <IconFileTypeXls/>},
	{name: "file-type-xml", component: <IconFileTypeXml/>},
	{name: "file-type-zip", component: <IconFileTypeZip/>},
	{name: "file-type-docx", component: <IconFileTypeDocx/>},
	{name: "file-type-html", component: <IconFileTypeHtml/>}
]

export const getFileTypeIcon = (name) => {
	let iconName = 'file-type-' + name
	let index = fileTypesIcons.map(e => e.name).indexOf(iconName)
	if(index !== -1){
		return fileTypesIcons[index].component
	}else{
		return <IconFile/>
	}
}