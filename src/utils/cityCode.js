

/** 根据地区编码得到地区名称
 * @param CityData 地区编码json数据，
 * @param code 地区编码
 */
export function cityCode(CityData, code) {
    for (var index = 0; index < CityData.length; index++) {
        let item = CityData[index];
        if (item.code == code) {
            return item.name;
        } else {
            if (item.children) {
                if (cityCode(item.children, code)) {
                    return cityCode(item.children, code)
                } else {
                    cityCode(item.children, code)
                }
            }
        }
    };
}


