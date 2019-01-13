
export function formSubmit(url, method, params) {
      let form = document.createElement("form");

      form.method = method || "post";
      form.action = url;
      form.target = '_blank';
      // alert(form);
      params = params || {};
      // alert(JSON.stringify(params))
      for (const key in params) {
            // if (params.hasOwnProperty(key)) {
            const value = params[key];
            var newElement = document.createElement("input");
            newElement.setAttribute("type", "text");
            newElement.setAttribute("name", key);
            newElement.setAttribute("value", value);
            form.appendChild(newElement);
            // }
      }
      // alert(2);
      document.body.appendChild(form);
      // alert(form.innerHTML)
      // setTimeout(() => {
      form.submit();
      // }, 1000)
}


