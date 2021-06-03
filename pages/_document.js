import Document, { Html, Head, Main, NextScript } from "next/document";

class LocationSearchBar extends Document {
  render() {
    return (
      <Html lang="es">
        <Head />
        <body>
          <Main />
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAhZ9FqoCGTc8jAO8tOkL1ZOnx3Im5M5aA&libraries=places"></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default LocationSearchBar;
