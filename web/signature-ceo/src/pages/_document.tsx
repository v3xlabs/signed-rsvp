import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html className="">
            <Head>
                {/* <!-- Primary Meta Tags --> */}
                <title>Signature CEO</title>
                <meta name="title" content="Signature CEO" />
                <meta
                    name="description"
                    content="You lost the game."
                />
                <meta name="keywords" content="signed, rsvp, Signature CEO" />
                <link rel="icon" type="image/svg+xml" href="/logo.svg" />
                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://signature.ceo" />
                <meta property="og:title" content="Signature CEO" />
                <meta
                    property="og:description"
                    content="You lost the game."
                />
                <meta
                    property="og:image"
                    content="https://signature.ceo/images/opengraph.png"
                />
                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://metatags.io/" />
                <meta property="twitter:title" content="Signature CEO" />
                <meta
                    property="twitter:description"
                    content="You lost the game."
                />
                <meta
                    property="twitter:image"
                    content="https://signature.ceo/images/opengraph.png"
                />{' '}
                {/* <!-- Primary Meta Tags --> */}
                <title>Signature CEO</title>
                <meta name="title" content="Signature CEO" />
                <meta
                    name="description"
                    content="You lost the game."
                />
                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://signature.ceo" />
                <meta property="og:title" content="Signature CEO" />
                <meta
                    property="og:description"
                    content="You lost the game."
                />
                <meta
                    property="og:image"
                    content="https://signature.ceo/images/opengraph.png"
                />
                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://signature.ceo" />
                <meta property="twitter:title" content="Signature CEO" />
                <meta
                    property="twitter:description"
                    content="You lost the game."
                />
                <meta
                    property="twitter:image"
                    content="https://signature.ceo/images/opengraph.png"
                />
                <body className="">
                    <Main />
                    <NextScript />
                </body>
            </Head>
        </Html>
    );
}