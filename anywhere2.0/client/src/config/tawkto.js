function TawkTo() {
  var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();
  (function () {
    var s1 = document.createElement("script"),
      s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = process.env.REACT_APP_TAWK_TO_KEY
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
  })();
}
export default TawkTo;
