const TreeFolder = (listFolder) => {
    var data = []
    for (const key in listFolder) {
        if (listFolder[key].type == "directory") {
            data.push({
                nameFolder: listFolder[key].name,
                typeFolder: listFolder[key].type,
                key: listFolder[key].path,
                extensionFolder: listFolder[key].extension,
                pathFolder: listFolder[key].relativePath,
                children: TreeFolder(listFolder[key].children)
            })
        }
    }
    return data
}
const ListItem = (listItem) => {
    var data = []
    for (const key in listItem) {
            data.push({
                nameFolder: listItem[key].name,
                typeFolder: listItem[key].type,
                key: listItem[key].name,
                extensionFolder: listItem[key].extension,
                pathFolder: listItem[key].relativePath,
                children: ListItem(listItem[key].children)
            })
    }
    return data
}

const loadImg = (item, rootFolder) => {
    return `http://localhost:8081/images/${rootFolder+"/"+item}`
}

export {TreeFolder, ListItem, loadImg}