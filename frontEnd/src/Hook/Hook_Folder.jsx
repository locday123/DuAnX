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

export {TreeFolder}