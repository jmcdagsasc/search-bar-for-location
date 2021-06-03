import Document, { Html, Head, Main, NextScript } from "next/document";

class LocationSearchBar extends Document {
  render() {
    return (
      <Html lang="es">
        <Head />
        <body>
          <Main />
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBoJv-emQICUjpZR21vTYeELuaQus6i050&libraries=places"></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default LocationSearchBar;
