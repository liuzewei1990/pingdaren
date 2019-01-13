
export function picListTransformData(picList) {
    picList = picList.map(item => {
        item.picList = item.picList.map(pic => {
            return {
                msrc: pic,
                src: pic,
                // w: 800,
                // h: 400
            }
        })
        return item;
    })
    return picList;
}