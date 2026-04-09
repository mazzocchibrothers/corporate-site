import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const props = await Document.getInitialProps(ctx);
    return { ...props, locale: ctx.locale };
  }

  render() {
    const locale = (this.props as any).locale || 'en';
    return (
      <Html lang={locale}>
        <Head>
          {/* Favicons */}
          <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#4B4DF7" />

          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
