import FastClick from 'fastclick'
console.log("引入fastclick支持！")
if (process.env.NODE_ENV == "production") {
    FastClick.attach(document.body);
}
