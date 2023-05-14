import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html className="">
            <Head>
                {/* <!-- Primary Meta Tags --> */}
                <title>Signed RSVP</title>
                <meta name="title" content="Signed RSVP" />
                <meta name="description" content="You lost the game." />
                <meta name="keywords" content="signed, rsvp, signed rsvp" />
                <link
                    rel="icon"
                    type="image/png"
                    href="https://signed.rsvp/ticket-favicon.png"
                />
                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://signed.rsvp" />
                <meta property="og:title" content="Signed RSVP" />
                <meta property="og:description" content="You lost the game." />
                <meta
                    property="og:image"
                    content="https://signed.rsvp/images/opengraph.png"
                />
                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://metatags.io/" />
                <meta property="twitter:title" content="Signed RSVP" />
                <meta
                    property="twitter:description"
                    content="You lost the game."
                />
                <meta
                    property="twitter:image"
                    content="https://signed.rsvp/images/opengraph.png"
                />{' '}
                {/* <!-- Primary Meta Tags --> */}
                <title>Signed RSVP</title>
                <meta name="title" content="Signed RSVP" />
                <meta name="description" content="You lost the game." />
                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://signed.rsvp" />
                <meta property="og:title" content="Signed RSVP" />
                <meta property="og:description" content="You lost the game." />
                <meta
                    property="og:image"
                    content="https://signed.rsvp/images/opengraph.png"
                />
                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://signed.rsvp" />
                <meta property="twitter:title" content="Signed RSVP" />
                <meta
                    property="twitter:description"
                    content="You lost the game."
                />
                <meta
                    property="twitter:image"
                    content="https://signed.rsvp/images/opengraph.png"
                />
                <body className="">
                    <Main />
                    <NextScript />
                </body>
            </Head>
        </Html>
    );
}
