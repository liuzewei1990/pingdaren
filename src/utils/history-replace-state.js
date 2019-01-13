export default function historyReplaceState(query, type = "replace") {
    if (query instanceof Array) return;
    if (query instanceof Object) {
        let page_url = location.href;
        let queryStr = "?";

        for (const key in query) {
            const element = query[key];
            if (element) queryStr += `${key}=${element}&`;
        }
        queryStr = queryStr.substring(0, queryStr.length - 1)
        page_url = page_url.split('?')[0];
        page_url = page_url + queryStr;
        if (type == "replace") history.replaceState(query, '', page_url);
        else history.pushState(query, '', page_url);
    }
}
// 示例： historyReplaceState({ categoryId: item.id });